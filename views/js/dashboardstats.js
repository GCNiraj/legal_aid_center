// Function to fetch and update total cases
async function updateTotalCases() {
    try {
        const response = await axios.get('/api/v1/cases/totalCases');
        document.querySelector('.card01 .text h2').textContent = `${response.data.data.totalCases}+`;
    } catch (error) {
        console.error('Error fetching total cases:', error);
    }
}

// Function to fetch and update active cases
async function updateActiveCases() {
    try {
        const response = await axios.get('/api/v1/cases/activeCases');
        document.querySelector('.card02 .text h2').textContent = response.data.data.activeCases;
    } catch (error) {
        console.error('Error fetching active cases:', error);
    }
}

// Function to fetch and update settled cases
async function updateSettledCases() {
    try {
        const response = await axios.get('/api/v1/cases/settledCases');
        document.querySelector('.card03 .text h2').textContent = `${response.data.data.settledCases}+`;
    } catch (error) {
        console.error('Error fetching settled cases:', error);
    }
}

// Function to fetch and update total applications
async function updateTotalApplications() {
    try {
        const response = await axios.get('/api/v1/applications/totalApplications');
        document.querySelector('.card04 .text h2').textContent = `${response.data.data.totalApplications}+`;
    } catch (error) {
        console.error('Error fetching total applications:', error);
    }
}

// Function to initialize the dashboard
async function initializeDashboard() {
    await updateTotalCases();
    await updateActiveCases();
    await updateSettledCases();
    await updateTotalApplications();
}

// Initialize the dashboard when the page loads
document.addEventListener('DOMContentLoaded', initializeDashboard);
