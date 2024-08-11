import { showAlert } from './alert.js'

document.addEventListener('DOMContentLoaded', function() {
    // Select the form element
    const form = document.querySelector('form');

    // Handle form submission
    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Gather form data
        const name = document.querySelector('#floatingInput[name="name"]').value;
        const cid = document.querySelector('#floatingInput[name="cid"]').value;
        const dob = document.querySelector('#floatingInput[name="dob"]').value;
        const phone = document.querySelector('#floatingInput[name="phone"]').value;
        const email = document.querySelector('#floatingInput[name="email"]').value;
        const role = document.querySelector('input[name="flexRadioDefault"]:checked').value;

        // Prepare the data to send to the API
        const data = {
            name: name,
            email: email,
            role: role,
            cid: cid,
            dob: dob,
            phone: phone
        };

        try {
            // Send a POST request to the /addLawyer API
            const response = await axios.post('/api/v1/users/addLawyer', data);

            if (response.data.status === 'success') {
                showAlert('success','User Added successfully! A registration link has been sent to the email')
                form.reset(); // Reset the form after successful submission
            } else {
                showAlert('Failed','Failed to add user. Please try again.');
            }
        } catch (error) {
            console.error('Error adding user:', error);
            showAlert('Failed','An error occured.');
        }
    });
});
