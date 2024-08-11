// Function to create the HTML structure for each user
function createUserRow(user) {
    return `
    <tr>
        <td>
            <p class="mt-3">${user.name}</p>
        </td>
        <td>
            <p class="mt-3">${user.email}</p>
        </td>
        <td class="text-end text-dark">
            <span class="read-more">
                <a class="text-dark" href="/application-id/${user._id}">Read More >></a>
            </span>
        </td>
    </tr>`;
}

// Function to fetch and display users based on role
async function fetchAndDisplayUsers() {
    try {
        const response = await axios.get('/api/v1/users');
        const users = response.data.data; // Assuming your API returns { data: [ ...users ] }

        // Filter and display Admins
        const adminContainer = document.querySelector('.pending-case.admin tbody');
        const admins = users.filter(user => user.role === 'Admin');
        adminContainer.innerHTML = '';
        admins.forEach(user => {
            adminContainer.innerHTML += createUserRow(user);
        });

        // Filter and display Lawyers
        const lawyerContainer = document.querySelector('.pending-case.lawyers tbody');
        const lawyers = users.filter(user => user.role === 'Lawyer');
        lawyerContainer.innerHTML = '';
        lawyers.forEach(user => {
            lawyerContainer.innerHTML += createUserRow(user);
        });

    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

// Fetch and display users on page load
document.addEventListener('DOMContentLoaded', fetchAndDisplayUsers);
