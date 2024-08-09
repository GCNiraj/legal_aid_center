import { showAlert } from './alert.js'

var email_temp = ''

export const signup = async (name, cid, email, phone, password, passwordConfirm) => {
    try {
        const res = await axios({
            method: "POST",
            url: 'http://localhost:4001/api/v1/users/signup',
            data: {
                name,
                email,
                cid,
                phone,
                password,
                passwordConfirm
            },
        })
        if (res.data.status === 'success') {
            showAlert('success', 'OTP sent to your email. Please verify to complete the signup process!')
            
        }
    } catch (err) {
        let message =
            typeof err.response !== 'undefined'
                ? err.response.data.message
                : err.message
        showAlert('error', 'Error: Passwords are not the same!', message)
    }
}

export const verifyOTP = async (email, otp) => {
    try {
        const res = await axios({
            method: "POST",
            url: 'http://localhost:4001/api/v1/users/verifyemail',
            data: {
                email,
                otp
            },
        })

        if (res.data.status === 'success') {
            showAlert('success', 'Registration Successful!')
            window.setTimeout(() => {
                location.assign('/login')
            }, 1500)
        }
    } catch (err) {
        let message =
            typeof err.response !== 'undefined'
                ? err.response.data.message
                : err.message
        showAlert('error', 'Error: OTP not matching!', message)
    }
}

document.querySelector('#msform').addEventListener('submit', (e) => {
    e.preventDefault()
    const name = document.getElementsByClassName('befn')[0].value
    const cid = document.getElementsByClassName('becid')[0].value
    const email = document.getElementsByClassName('bee')[0].value
    email_temp = email
    const phone = document.getElementsByClassName('bepn')[0].value
    const password = document.getElementsByClassName('bep')[0].value
    const passwordConfirm = document.getElementsByClassName('bepc')[0].value
    signup(name, cid, email, phone, password, passwordConfirm)
})

document.querySelector('#otp_submission').addEventListener('click', (e) => {
    const one = document.getElementById('1').value
    const two = document.getElementById('2').value
    const three = document.getElementById('3').value
    const four = document.getElementById('4').value
    const five = document.getElementById('5').value
    const six = document.getElementById('6').value

    const complete_otp = one + two + three + four + five + six
    verifyOTP(email_temp, complete_otp)
})