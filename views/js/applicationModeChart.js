
async function fetchData(url) {
    try {
        const response = await axios.get(url);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.log(error)
        return null;
    }
}

// Function to initialize the charts
async function initializeCharts() {
    // Fetch data for Application Mode (by gender)
    const genderData = await fetchData('/api/v1/applications/report/gender');
    if (genderData) {
        const genderLabels = genderData.map(item => item._id);
        const genderCounts = genderData.map(item => item.total);

        new Chart(document.getElementById('acquisitions'), {
            type: 'pie',
            data: {
                labels: genderLabels,
                datasets: [{
                    label: 'Applications by Gender',
                    data: genderCounts,
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
                }]
            }
        });
    }

    // Fetch data for Case Types (by nature)
    const natureData = await fetchData('/api/v1/cases/report/nature');
    if (natureData) {
        const natureLabels = natureData.map(item => item._id);
        const natureCounts = natureData.map(item => item.totalCases);

        new Chart(document.getElementById('case-types-pie'), {
            type: 'pie',
            data: {
                labels: natureLabels,
                datasets: [{
                    label: 'Case Types',
                    data: natureCounts,
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
                }]
            }
        });
    }

    // Fetch data for Cases Graph (by Dzongkhag)
    const dzongkhagData = await fetchData('/api/v1/cases/report/dzongkhag');
    if (dzongkhagData) {
        const dzongkhagLabels = dzongkhagData.map(item => item._id);
        const dzongkhagCounts = dzongkhagData.map(item => item.totalCases);

        new Chart(document.getElementById('cases-line-graph'), {
            type: 'line',
            data: {
                labels: dzongkhagLabels, // Dzongkhag names as x-axis labels
                datasets: [{
                    label: 'Cases by Dzongkhag',
                    data: dzongkhagCounts,
                    fill: false,
                    borderColor: '#4bc0c0'
                }]
            },
            options: {
                scales: {
                    x: {
                        beginAtZero: true, // Start x-axis from 0 if needed
                        title: {
                            display: true,
                            text: 'Dzongkhag' // Label for the x-axis
                        }
                    },
                    y: {
                        beginAtZero: true, // Ensure y-axis starts from 0
                        title: {
                            display: true,
                            text: 'Number of Cases' // Label for the y-axis
                        },
                        ticks: {
                            stepSize: 1 // Ensure y-axis increments by 1
                        }
                    }
                }
            }
        });
    }

    const statusData = await fetchData('/api/v1/cases/report/status');
    if (statusData) {
        const statusLabels = statusData.map(item => item._id);
        const statusCounts = statusData.map(item => item.totalCases);

        new Chart(document.getElementById('cases-status-bar'), {
            type: 'bar',
            data: {
                labels: statusLabels,
                datasets: [{
                    label: 'Cases by Status',
                    data: statusCounts,
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    const feeStructureData = await fetchData('/api/v1/cases/report/feestructure');
    if (feeStructureData) {
        const feeLabels = feeStructureData.map(item => item._id);
        const feeCounts = feeStructureData.map(item => item.totalCases);

        new Chart(document.getElementById('fee-structure-doughnut'), {
            type: 'doughnut',
            data: {
                labels: feeLabels,
                datasets: [{
                    label: 'Cases by Fee Structure',
                    data: feeCounts,
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
                }]
            }
        });
    }

    const occupationData = await fetchData('/api/v1/applications/report/occupation');
    if (occupationData) {
        const occupationLabels = occupationData.map(item => item._id);
        const occupationCounts = occupationData.map(item => item.total);

        new Chart(document.getElementById('occupation-bar'), {
            type: 'line',
            data: {
                labels: occupationLabels, // Occupation labels on the x-axis
                datasets: [{
                    label: 'Applications by Occupation',
                    data: occupationCounts,
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true, // Start y-axis from 0
                        title: {
                            display: true,
                            text: 'Number of Applications' // Label for the y-axis
                        },
                        ticks: {
                            stepSize: 1 // Ensure y-axis increments by 1
                        }
                    }
                }
            }
        });
    }

}

// Initialize the charts when the page loads
document.addEventListener('DOMContentLoaded', initializeCharts);
