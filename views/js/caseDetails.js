import { showAlert } from './alert.js'

const displayApplicationData = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: 'http://localhost:4001/api/v1/applications/' + localStorage.getItem('application_id')
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
    document.querySelector('#be_contact').textContent = application.number + ' / ' + application.email
    document.querySelector('#be_currentaddress').textContent = application.current_address[0].current_village + ' , ' + application.current_address[0].current_gewog + ' , ' + application.current_address[0].current_dzongkhag
    document.querySelector('#be_permanentaddress').textContent = application.permanent_address[0].permanent_village + ' , ' + application.permanent_address[0].permanent_gewog + ' , ' + application.permanent_address[0].permanent_dzongkhag

    document.querySelector('#be_totalhhincome').textContent = application.total_household_income
    document.querySelector('#be_totalhhmember').textContent = application.total_household_member
    document.querySelector('#be_institudename').textContent = application.institute_name
    document.querySelector('#be_doname').textContent = application.dealing_official[0].dealing_official_name
    document.querySelector('#be_doe').textContent = application.dealing_official[0].dealing_official_email
    document.querySelector('#be_dopn').textContent = application.dealing_official[0].dealing_official_phone
}

export const update = async (nature_of_case, case_details, type_of_service_provided, name_of_service_provider, number_of_service_provider, email_of_service_provider, dzongkhag, name_lawfirm, appointment_date, license_number, fee_structure, court, court_official_name, court_official_number, court_official_email, case_status, disposed_date, outcome, impact) => {
    try {
        const res = await axios({
            method: "PATCH",
            url: 'http://localhost:4001/api/v1/cases/' + localStorage.getItem('caseid'),
            data: {
                nature_of_case,
                case_details,
                type_of_service_provided,
                name_of_service_provider,
                number_of_service_provider,
                email_of_service_provider,
                dzongkhag,
                name_lawfirm,
                appointment_date,
                license_number,
                fee_structure,
                court,
                court_official_name,
                court_official_number,
                court_official_email,
                case_status,
                disposed_date,
                outcome,
                impact
            }
        })

        if (res.data.status === 'success') {
            showAlert('success', 'Application status updated and case added successfully!')
            window.setTimeout(() => {

                // location.assign('/')
            }, 1500)
        }

    } catch (err) {
        console.log(err)
        let message =
            typeof err.response !== 'undefined'
                ? err.response.data.message
                : err.message
        showAlert('error', 'Error: Could not update the status of the application!', message)

    }
}

document.querySelector('#id_submission').addEventListener('click', (e) => {
    const nature_of_case = document.getElementsByName('nature_of_case')[0].value
    const case_details = document.getElementsByClassName('be_cased')[0].value
    const type_of_service_provided = document.getElementsByName('service_type')[0].value
    const name_of_service_provider = document.getElementsByClassName('be_serviceprovider')[0].value
    const number_of_service_provider = document.getElementsByClassName('be_servicecontact')[0].value

    const email_of_service_provider = document.getElementsByClassName('be_serviceemail')[0].value

    const dzongkhag = document.getElementsByName('be_dzongkhag')[0].value

    const name_lawfirm = document.getElementsByClassName('be_namelawfirm')[0].value

    const appointment_date = document.getElementsByClassName('be_appointment')[0].value

    const license_number = document.getElementsByClassName('be_licensenumber')[0].value

    const fee_structure = document.querySelector('input[name="flexRadioDefault"]:checked').value

    const court = document.getElementsByName('be_court')[0].value

    const court_official_name = document.getElementsByClassName('be_courtofficial')[0].value

    const court_official_number = document.getElementsByClassName('be_courtofficialnumber')[0].value

    const court_official_email = document.getElementsByClassName('be_courtofficialemail')[0].value

    const case_status = document.getElementsByName('be_casestatus')[0].value

    const disposed_date = document.getElementsByClassName('be_dispose')[0].value

    const outcome = document.getElementsByClassName('be_out')[0].value

    const impact = document.getElementById('floatingTextarea2').value

    update(nature_of_case, case_details, type_of_service_provided, name_of_service_provider, number_of_service_provider, email_of_service_provider, dzongkhag, name_lawfirm, appointment_date, license_number, fee_structure, court, court_official_name, court_official_number, court_official_email, case_status, disposed_date, outcome, impact)
})