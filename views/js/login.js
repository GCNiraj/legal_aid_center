import { showAlert } from './alert.js'

const login = async (email, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://localhost:4001/api/v1/users/login',
            data : {
                email,
                password,
            },
        })
        if (res.data.status === 'success') {
            showAlert('success', 'Logged in successfully')
            // window.setTimeout(() => {
            //     location.assign('/dashboard')
            // }, 1500)
            var obj = res.data.data.user
            console.log(obj)
            document.cookie = ' token = ' + JSON.stringify(obj)
            console.log(obj)
            localStorage.setItem('user', JSON.stringify(obj));
            if (obj.role === 'Admin') {
                window.setTimeout(() => {
                    location.assign('/adminDashboard');
                }, 1500);
            } else if (obj.role === 'Lawyer') {
                window.setTimeout(() => {
                    location.assign('/lawyerDashboard');
                }, 1500);
            } else if (obj.role === 'User') {
                window.setTimeout(() => {
                    location.assign('/userDashboard');
                }, 1500);
            } else {
                // Default to a general dashboard or an error page
                window.setTimeout(() => {
                    location.assign('/dashboard');
                }, 1500);
            }
        

        }
    } catch (err) {
        err.response.data.message
        let message = 
            typeof err.response !== 'undefined'
                ?err.response.data.message
                :err.message
        
        if (err.response.data.message === 'Unauthorized'){
            showAlert('error', 'Error: Unverified email please verify your email',message)
            

        }else{
            showAlert('error', 'Error: Incorrect email or password',message)
        }
    }
}

document.querySelector('#form').addEventListener('submit', (e) => {
    e.preventDefault()
    const email = document.getElementById('floatingInput').value
    const password = document.getElementById('floatingPassword').value
    login(email, password)
})