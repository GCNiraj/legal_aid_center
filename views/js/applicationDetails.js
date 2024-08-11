import { showAlert } from './alert.js'

const displayApplicationData = async() => {
    try {
        const res = await axios({
            method: 'GET',
            url: 'http://localhost:4001/api/v1/applications/'+localStorage.getItem('application_id')
        })
        displayApplicationDatainPage(res.data.data)
    } catch (err) {
        console.log(err)
    }
}
displayApplicationData()

const displayApplicationDatainPage = (application) => {
    console.log(application.current_address[0].current_dzongkhag)
    document.querySelector('#be_name').textContent = application.name
    document.querySelector('#be_gender').textContent = application.gender
    document.querySelector('#be_dob').textContent = application.dob
    document.querySelector('#be_cid').textContent = application.cid
    document.querySelector('#be_occupation').textContent = application.occupation
    document.querySelector('#be_contact').textContent = application.number+' / '+application.email
    document.querySelector('#be_currentaddress').textContent = application.current_address[0].current_village+' , '+application.current_address[0].current_gewog+' , '+application.current_address[0].current_dzongkhag
    document.querySelector('#be_permanentaddress').textContent =application.permanent_address[0].permanent_village+' , '+application.permanent_address[0].permanent_gewog+' , '+application.permanent_address[0].permanent_dzongkhag

    document.querySelector('#be_totalhhincome').textContent = application.total_household_income
    document.querySelector('#be_totalhhmember').textContent = application.total_household_member
    document.querySelector('#be_institudename').textContent = application.institute_name
    document.querySelector('#be_doname').textContent = application.dealing_official[0].dealing_official_name
    document.querySelector('#be_doe').textContent = application.dealing_official[0].dealing_official_email
    document.querySelector('#be_dopn').textContent = application.dealing_official[0].dealing_official_phone
}
// export const createcase = async () => {
//     try {
//         let application =   localStorage.getItem('application_id')
//         const res = await axios({
//             method: "POST",
//             url: 'http://localhost:4001/api/v1/cases/',
//             data: {
//                 application,

//             }
//         })

//         if (res.data.status === 'success') {
//             showAlert('success','Case status updated successfully!')
//             window.setTimeout(() => {

//                 location.assign('/')
//             }, 1500)

//     }
//     } catch (err) {
//         console.log(err)
//     }
// }
export const createcase = async () => {
    try {
        let application = localStorage.getItem('application_id');
        
        // Creating a case with default values
        const res = await axios({
            method: "POST",
            url: 'http://localhost:4001/api/v1/cases/',
            data: {
                nature_of_case: 'Civil', // Default to 'Civil'
                case_details: 'No details provided', // Default case details
                type_of_service_provided: 'Legal Advice', // Default service type
                name_of_service_provider: 'Dummy', // Default service provider name
                number_of_service_provider: '0000000000', // Default service provider number
                email_of_service_provider: 'dummy@example.com', // Default service provider email
                dzongkhag: 'Thimphu', // Default Dzongkhag
                name_lawfirm: 'Law & Co.', // Default law firm name
                license_number: 'L123456', // Default license number
                appointment_date: new Date().toISOString().split('T')[0], // Default to today's date
                fee_structure: 'Probono', // Default to 'Probono'
                court: 'High Court', // Default court
                court_official_name: 'dummy', // Default court official name
                court_official_number: '1234567890', // Default court official number
                court_official_email: 'court@example.com', // Default court official email
                case_status: 'On Progress', // Default to 'On Progress'
                disposed_date: '', // Leave empty for now
                outcome: 'Pending', // Default outcome
                impact: 'To be determined', // Default impact
                application: application, // application ID is required, so it's passed from localStorage
            }
        });

        if (res.data.status === 'success') {
            showAlert('success', 'Case created successfully!');
            window.setTimeout(() => {
                location.assign('/'); // Redirect to another page after creation
            }, 1500);
        }
    } catch (err) {
        console.log(err);
        showAlert('error', 'Failed to create case.');
    }
};



export const update = async (verified_status, remarks) => {
    try {
        const res = await axios({
            method: "PATCH",
            url: 'http://localhost:4001/api/v1/applications/'+localStorage.getItem('application_id'),
            data: {
                verified_status,
                remarks
            }
        })

        if (res.data.status === 'success') {
            showAlert('success','Application status updated and case added successfully!')
            createcase()
            window.setTimeout(() => {

                // location.assign('/')
            }, 1500)
        }

    } catch (err) {
        let message = 
            typeof err.response !== 'undefined'
                ? err.response.data.message
                : err.message
        showAlert('error', 'Error: Could not update the status of the application!',message)

    }
}

document.querySelector('#application_status').addEventListener('submit', (e)=>{
    e.preventDefault()
    const verified_status = document.querySelector('input[name="exampleRadios"]:checked').value
    const remarks = document.querySelector('#floatingTextarea').value

    update(verified_status, remarks)
})