import { showAlert } from './alert.js'

document.querySelector('#msform').addEventListener('submit', (e)=>{
    e.preventDefault()

    /* Form Page one values */
    // const name = document.getElementsByClassName('befn')[0].value
    // const gender = document.querySelector('input[name="flexRadioDefault"]:checked').value
    // const cid = document.getElementsByClassName('becid')[0].value
    // const dob = document.getElementsByClassName('bedob')[0].value
    // const number = document.getElementsByClassName('bepn')[0].value
    // const email = document.getElementsByClassName('bee')[0].value
    // const occupation = document.getElementsByClassName('beod')[0].value
    /* End of form one values */

    /* Form Page two values */ 
    // Current Addresses
    const current_dzongkhag = document.getElementsByClassName('becd')[0].value
    const current_gewog = document.getElementsByClassName('becg')[0].value
    const current_village = document.getElementsByClassName('becv')[0].value

    // Permanent Addresses
    const permanent_dzongkhag = document.getElementsByClassName('bepd')[0].value
    const permanent_gewog = document.getElementsByClassName('bepg')[0].value
    const permanent_village = document.getElementsByClassName('bepv')[0].value

    // Household Information
    const total_household_income = document.getElementsByClassName('bethi')[0].value
    const total_household_member = document.getElementsByClassName('bethm')[0].value
    const member_information = document.getElementsByClassName('behmi')[0].value
    const member_name = document.getElementsByClassName('behmfn')[0].value
    const member_occupation = document.getElementsByName('household_occupation').value
    const member_relationship = document.getElementsByName('household_relationship').value
    const member_phone = document.getElementsByClassName('behmpn')[0].value
    const member_email = document.getElementsByClassName('behme')[0].value
    /* End of form two values */ 
    alert(current_dzongkhag)
    alert(current_gewog)
    alert(current_village)
    alert(permanent_dzongkhag)
    alert(permanent_gewog)
    alert(permanent_village)
    alert(total_household_income)
    alert(total_household_member)
    alert(member_information)

    alert(member_name)
    alert(member_occupation)
    alert(member_relationship)
    alert(member_phone)
    alert(member_email)

    /* Form page last values*/
    const verification_document = document.getElementsByClassName('bevd')[0].files[0]
    const family_tree = document.getElementsByClassName('beft')[0].files[0]

    const disposable_income = document.getElementsByClassName('bedid')[0].files[0]
    const disposable_capital = document.getElementsByClassName('bedcd')[0].files[0]
    const case_background = document.getElementsByClassName('bebboc')[0].files[0]

    const evidence_of_disability = document.getElementsByClassName('beeodd')[0].files[0]
    const additional_docs = document.getElementsByClassName('bead')[0].files[0]
    /* End of form page last values */ 


    alert(verification_document)
    alert(family_tree)
    alert(disposable_income)
    alert(current_gewog)
    alert(current_village)
    alert(disposable_capital)
    alert(case_background)
    alert(permanent_village)
    alert(evidence_of_disability)

    alert(additional_docs)
})