// Function to fetch all eligible cases from the backend
const fetchAllCases = async () => {
    try {
        const response = await axios.get('http://localhost:4001/api/v1/cases');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching cases:', error);
        return [];
    }
};

// Function to redirect to case details page
const redirectToCaseDetails = (caseId) => {
    localStorage.setItem('case_id', caseId); // Store the case ID in localStorage for later use
    location.assign(`/caseDetails/${caseId}`); // Redirect to the case details page
};

// Function to populate cases into the HTML
const populateCases = (cases) => {
    const newCasesContainer = document.getElementById('new-cases-container');
    const activeCasesContainer = document.getElementById('active-cases-container');

    newCasesContainer.innerHTML = ''; // Clear existing content
    activeCasesContainer.innerHTML = ''; // Clear existing content

    cases.forEach((caseItem, index) => {
        const caseRow = `
            <tr>
                <td>
                    <p class="mt-3">LAC-00${index + 1}-2024</p>
                </td>
                <td>
                    <p class="mt-3">${new Date(caseItem.appointment_date).toLocaleDateString()}</p>
                </td>
                <td>
                    <p class="mt-3">${caseItem.name_lawfirm || 'N/A'}</p>
                </td>
                <td class="text-end text-dark">
                    <span class="read-more">
                        <a class="text-dark" href="javascript:void(0);" onclick="redirectToCaseDetails('${caseItem._id}')">Read More >></a>
                    </span>
                </td>
            </tr>
        `;

        // Adjusting the condition to reflect possible case_status values
        if (caseItem.case_status === 'On Progress') {
            newCasesContainer.insertAdjacentHTML('beforeend', caseRow);
        } else if (caseItem.case_status === 'Active') {
            activeCasesContainer.insertAdjacentHTML('beforeend', caseRow);
        }
    });
};

// Initialize and populate the cases when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    const cases = await fetchAllCases();
    populateCases(cases);
});
