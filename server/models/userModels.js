const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!'],
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    cid: {
        type: String,
        required: [true, 'Please enter your CID No.']
    }, phone: {
        type: String,
        required: [true,'Please enter your phone number']
    },
    photo: {
        type: String,
        default: 'default.jpg',
    },
    role: {
        type: String,
        enum: ['User','Admin','Lawyer'],
        default: 'User',
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        // password won't be included when we get the users
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [false, 'Please confirm your password'],
        validate: {
            validator: function(el) {
                return el === this.password
            },
            message: 'Passwords are not the same',
        }
    },
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
    otp: {
        type: String,
        required: false
    },
    otpExpires: {
        type: Date,
        required: false
    },
    passwordResetToken: String,
    passwordResetExpires: Date
})

userSchema.pre('save', async function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next()

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12)

    // Delete passwordConfirm field
    this.passwordConfirm = undefined
    next()
})

userSchema.pre('findOneAndUpdate', async function(next){
    const update = this.getUpdate();
    if (update.password !== '' &&
        update.password !== undefined &&
        update.password == update.passwordConfirm){
    
    // Hash the pasword with cost of 12
    this.getUpdate().password = await bcrypt.hash(update.password,12)

    // Delete passwordConfirm field
    update.passwordConfirm = undefined
    next()

    }else 
    next()
})

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword,
) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model('User', userSchema)

module.exports = User