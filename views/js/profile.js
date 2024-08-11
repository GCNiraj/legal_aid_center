document.addEventListener('DOMContentLoaded', function() {
    // Retrieve user info from localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        // Populate the profile details with user info
        document.querySelector('.profile-card .card-title').textContent = user.name;
        document.querySelector('.profile-card .card-text').textContent = user.gender;
        document.querySelector('.list-group-item:nth-child(1) p').textContent = user.cid;
        document.querySelector('.list-group-item:nth-child(2) p').textContent = user.dob;
        document.querySelector('.list-group-item:nth-child(3) p').textContent = user.email;
        document.querySelector('.list-group-item:nth-child(4) p').textContent = user.phone;
        document.querySelector('.list-group-item:nth-child(5) p').textContent = `${user.currentAddress.village}, ${user.currentAddress.gewog}, ${user.currentAddress.dzongkhag}`;
    } else {
        console.error('User information not found.');
    }
});
