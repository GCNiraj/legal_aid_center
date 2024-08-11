document.addEventListener('DOMContentLoaded', function () {
    // Get the token from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = window.location.pathname.split('/').pop();

    // Get form elements
    const newPasswordInput = document.getElementById('floatingInput');
    const confirmPasswordInput = document.getElementById('floatingPassword');
    const resetButton = document.querySelector('button[type="button"]');

    // Event listener for the reset button
    resetButton.addEventListener('click', async function () {
        const newPassword = newPasswordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        // Validate inputs
        if (!newPassword || !confirmPassword) {
            alert('Please fill in both fields.');
            return;
        }

        if (newPassword !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        try {
            // Send the data to the server
            const response = await fetch('/setPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, newPassword, passwordConfirm: confirmPassword }),
            });

            const result = await response.json();

            if (response.ok) {
                alert('Password has been reset successfully.');
                window.location.href = '/login'; // Redirect to login page or desired page
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while resetting the password.');
        }
    });
});
