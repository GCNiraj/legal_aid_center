const User = require('./../models/userModels')
const jwt = require('jsonwebtoken')
const AppError = require('./../utils/appError')
const nodemailer = require('nodemailer');
const crypto = require('crypto');


const { promisify, isNullOrUndefined } = require('util')

const signToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id)
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN *24 *60 * 60 * 1000
        ),
        httpOnly: true,
    }
    res.cookie('jwt', token, cookieOptions)

    res.status(statusCode).json({
        status: "success",
        token,
        data : {
            user
        }
    })
}
const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS  
    }
});
// exports.signup = async (req, res, next) => {
//     try{
//         const newUser = await User.create(req.body)
//         createSendToken(newUser, 201, res)
//     }catch (err) {
//         res.status(500).json({ error: err.message});
//     }
// }
const generateOTP = () => {
    return crypto.randomInt(100000, 999999).toString();
};

exports.signup = async (req, res, next) => {
    try {
        const otp = generateOTP();
        const otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes


        const newUser = await User.create({
            ...req.body,
            otp,
            otpExpires
        });

        const mailOptions = {
            from: 'info@law.com',
            to: newUser.email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}. Please use it to complete your signup process.`
        };

        await transporter.sendMail(mailOptions);

        createSendToken(newUser, 201, res);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new AppError('Please provide an email and password!', 400));
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.correctPassword(password, user.password))) {
            return next(new AppError('Incorrect email or password', 401));
        }

        // Generate OTP and expiration time
        const otp = generateOTP();
        const otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

        // Update user with OTP and expiration time
        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();

        // Send OTP via email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}. It is valid for 10 minutes.`
        };

        await transporter.sendMail(mailOptions);

        // Respond with a message to enter OTP
        res.status(200).json({
            status: 'success',
            message: 'OTP sent to your email. Please verify to complete the login process.'
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.verifyOtp = async (req, res, next) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ error: 'Invalid OTP' });
        }

        if (Date.now() > user.otpExpires) {
            return res.status(400).json({ error: 'OTP has expired' });
        }

        user.otp = undefined; // Clear OTP
        user.otpExpires = undefined; // Clear OTP expiration
        await user.save();

        createSendToken(user, 200, res);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return next(new AppError('There is no user with this email address.', 404));
        }

        // Generate a reset token
        const resetToken = crypto.randomBytes(32).toString('hex');

        // Hash the reset token and set it in the user object
        user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes
        await user.save();

        // Send email with reset token
        const resetURL = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset Request',
            text: `You requested a password reset. Please follow this link to reset your password: ${resetURL}. The link is valid for 10 minutes.`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            status: 'success',
            message: 'Password reset token sent to your email!'
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.resetPassword = async (req, res, next) => {
    try {
        const { token, newPassword, passwordConfirm } = req.body;

        // Validate inputs
        if (!token) {
            return next(new AppError('Reset token is missing', 400));
        }
        if (!newPassword) {
            return next(new AppError('New password is missing', 400));
        }
        if (!passwordConfirm) {
            return next(new AppError('Password confirmation is missing', 400));
        }
        
        // Check if passwords match
        if (newPassword !== passwordConfirm) {
            return next(new AppError('Passwords do not match', 400));
        }

        // Hash the token to match against stored hash
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        // Find the user with the matching token and ensure token is not expired
        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() } // Token is valid if expiry date is in the future
        });

        if (!user) {
            return next(new AppError('Token is invalid or has expired', 400));
        }

        // Update the user's password
        user.password = newPassword;
        user.passwordConfirm = passwordConfirm;
        user.passwordResetToken = undefined; // Clear the reset token
        user.passwordResetExpires = undefined; // Clear the reset expiry
        await user.save();

        res.status(200).json({
            status: 'success',
            message: 'Password has been reset successfully'
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




exports.logout = (req, res) => {
    res.cookie('token', '', {
        expires: new Date(Date.now() + 10 *1000),
        httpOnly: true,
    })
    res.status(200).json({status : 'success'})
}

exports.protect = async (req, res, next) => {
    try {
        // 1) Getting token and check if it's there
        let token
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
        }
        else if (req.cookies.jwt) {
            token = req.cookies.jwt
        }
        if (!token) {
            return next(
                new AppError('You are not logged in! Please log in to get access.',401),
            )
        }

        // 2) Verification token
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
        
        // 3) Check if user still exists
        const freshUser = await User.findById(decoded.id)
        if (!freshUser) {
            return next(
                new AppError('The user belonging to this token no longer exist',401),
            )
        }
        // Grant access to protected route
        req.user = freshUser
        next()
    }
    catch(err) {
        res.status(500).json({ error: err.message});
    }
}

exports.updatePassword = async(req, res, next) => {
    try {
        // 1) Get user from collection
        const user = await User.findById(req.user.id).select('+password')
        // 2) Check if Posted current password is correct
        if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
            return next(new AppError('Your current password is wrong',401))
        }
        // 3) If so, update password
        user.password = req.body.password
        user.passwordConfirm = req.body.passwordConfirm
        await user.save()

        // 4) Log user in, send JWT
        createSendToken(user, 200, res)
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError('You do not have permission to perform this action', 403),
            )
        }
        next()
    }
}