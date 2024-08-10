import { showAlert } from './alert.js'

var obj = JSON.parse(document.cookie.substring(6))

export const createApplication = async (data) => {
    try {
        const res = await axios({
            method: "POST",
            url: 'http://localhost:4001/api/v1/applications',
            data,
        })
        
        if (res.data.status === 'success') {
            showAlert('success','Application submitted successfully!')
            window.setTimeout(() => {
                location.assign('/')
            }, 1500)
        }
    } catch (err) {
        console.log(err)
        let message = 
            typeof err.response !== 'undefined'
                ? err.response.data.message
                : err.message
        showAlert('error', 'Error: Please fill up the form again!',message)
    }
}


document.querySelector('#msform').addEventListener('submit', (e)=>{
    e.preventDefault()
    const form = new FormData()

    /* Form Page one values */
    form.append('name', document.getElementsByClassName('befn')[0].value)
    form.append('gender', document.querySelector('input[name="flexRadioDefault"]:checked').value)
    form.append('cid' ,document.getElementsByClassName('becid')[0].value)
    form.append('dob', document.getElementsByClassName('bedob')[0].value)
    form.append('number', document.getElementsByClassName('bepn')[0].value)
    form.append('email' , document.getElementsByClassName('bee')[0].value)
    form.append('occupation', document.getElementsByClassName('beod')[0].value)
    /* End of form one values */

    /* Form Page two values */ 
    // Current Addresses
    form.append('current_dzongkhag', document.getElementsByClassName('becd')[0].value)
    form.append('current_gewog',document.getElementsByClassName('becg')[0].value)
    form.append('current_village' , document.getElementsByClassName('becv')[0].value)

    // Permanent Addresses
    form.append('permanent_dzongkhag' ,document.getElementsByClassName('bepd')[0].value)
    form.append('permanent_gewog' ,document.getElementsByClassName('bepg')[0].value)
    form.append('permanent_village' , document.getElementsByClassName('bepv')[0].value)

    // Household Information
    form.append('total_household_income' ,document.getElementsByClassName('bethi')[0].value)
    form.append('total_household_member' , document.getElementsByClassName('bethm')[0].value)
    form.append('member_information' , document.getElementsByClassName('behmi')[0].value)
    form.append('member_name' , document.getElementsByClassName('behmfn')[0].value)
    form.append('member_occupation' , document.getElementsByName('household_occupation')[0].value)
    form.append('member_relationship' , document.getElementsByName('household_relationship')[0].value)
    form.append('member_phone' , document.getElementsByClassName('behmpn')[0].value)
    form.append( 'member_email ', document.getElementsByClassName('behme')[0].value)
    /* End of form two values */ 

    /* Form page third page values */
    form.append('institute_name' , document.getElementsByClassName('benoi')[0].value)
    if (document.getElementsByClassName('benodo')[0].value !== ''){
        form.append('dealing_official_name' , document.getElementsByClassName('benodo')[0].value)
        form.append('dealing_official_phone' , document.getElementsByClassName('be_cnodo')[0].value)
        form.append('dealing_official_email' , document.getElementsByClassName('be_emaildo')[0].value)
    }
    /* End of form third page values */  

    /* Form page last values*/
    form.append('verification_document' , document.getElementsByClassName('bevd')[0].files[0])
    form.append('family_tree' ,document.getElementsByClassName('beft')[0].files[0])

    form.append( 'householdincome_document' , document.getElementsByClassName('bedid')[0].files[0])
    form.append('householddisposable_document' , document.getElementsByClassName('bedcd')[0].files[0])

    if (typeof(document.getElementsByClassName('beeodd')[0].files[0])!=='undefined'){
        form.append('disability_documents' , document.getElementsByClassName('beeodd')[0].files[0])
    }

    if (typeof(document.getElementsByClassName('bead')[0].files[0]) !=='undefined'){
        form.append('additional_documents' , document.getElementsByClassName('bead')[0].files[0])
    }
    form.append('case_background' , document.getElementsByClassName('bebboc')[0].files[0])
    form.append( 'user' , obj._id)
    /* End of form page last values */ 
    createApplication(form)
})