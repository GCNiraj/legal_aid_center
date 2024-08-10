const User = require('./../models/userModels')
const AppError = require('../utils/appError')
const multer = require('multer')
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'views/images/users')
    },
    filename: (req, file, cb)=> {
        console.log(req)
        var obj = JSON.parse(req.cookies.token)
        const ext = file.mimetype.split('/')[1]
        cb(null, `user-${obj['_id']}-${Date.now()}.${ext}`)
    }
})

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    }else {
        cb(new AppError('Not an image! Please upload only images',400), false)
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
})

exports.uploadUserPhoto = upload.single('photo')

exports.getAllUsers = async (req, res, next) => {
    try{
        const users = await User.find()
        res.status(200).json({data: users, status: 'success'})
    }catch (err) {
        res.status(500).json({error: err.message});
    }
}

exports.createUser = async (req, res) => {
    try{
        const user = await User.create(req.body);
        res.json({ data: user, status: "success"});
    }catch (err) {
        res.status(500).json({ error: err.message});
    }
}

exports.getUser = async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        res.json({ data: user, status: "success"});
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
}

exports.updateUser = async(req, res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body);
        res.json({ data: user, status: "success"});
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

exports.deleteUser = async(req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        res.json({data: user,status: "success"});
    }catch (err){
        res.status(500).json({error: err.message});
    }
}

const filterObj = (obj, ...allowedFields) => {
    const newObj = {}
    Object.keys(obj).forEach((el) => {
        if (allowedFields.includes(el)) newObj[el] = obj[el]
    })
    return newObj
}

exports.updateMe = async (req, res, next) => {
    try {
        // 1) Create error if user POSTs password data
        if (req.body.password || req.body.passwordConfirm) {
            return next(
                new AppError(
                    'This route is not for password updates. Please use /updateMyPassword',400,
                ),
            )
        }
        // 2) Filtered our unwanted fields names that are not allowed to be updated
        const filteredBody=filterObj(req.body, 'name', 'email')

        if (req.body.photo !=='undefined') {
            filteredBody.photo = req.file.filename
        }

        var obj = JSON.parse(req.cookies.token)

        const updatedUser = await User.findByIdAndUpdate(obj['_id'], filteredBody, {
            new: true,
            runValidators: true,
        })
        
        res.status(200).json({
            status: 'success',
            data: { user: updatedUser },
        })
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}


exports.addLawyer = async (req, res) => {
    try {
        // Create a user with the role of 'Lawyer'
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            role: 'Lawyer',
            isVerified: false,
            password: 'temporarypassword', // Placeholder password
            phone: '0000000000', // Placeholder phone number
            cid: 'temporaryCID', // Placeholder CID
        });

        // Generate a token for the lawyer to set their password
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes
        await user.save({ validateBeforeSave: false });

        // Construct the password reset URL
        const resetURL = `${req.protocol}://${req.get('host')}/setPassword/${resetToken}`;

        // Send the email to the lawyer
        await sendEmail({
            email: user.email,
            subject: 'Set your password',
            message: `Please click on the following link to set your password: ${resetURL}. The link is valid for 10 minutes.`
        });

        res.status(200).json({
            status: 'success',
            message: 'Lawyer added successfully. Password setup link sent to the email.'
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.setPassword = async (req, res, next) => {
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
        user.isVerified = true; // Mark the user as verified
        await user.save();

        res.status(200).json({
            status: 'success',
            message: 'Password has been set successfully'
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: 'Your App <noreply@yourapp.com>',
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    await transporter.sendMail(mailOptions);
};