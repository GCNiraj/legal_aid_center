var obj
if (document.cookie) {
    obj = JSON.parse(document.cookie.substring(6));
} else {
    obj = JSON.parse('{}');
    location.assign('/')
}

const allApplications = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: 'http://localhost:4001/api/v1/applications',
        })
        displayPendingApplications(res.data)
    } catch (err) {

    }
}

allApplications()

const displayPendingApplications = (applications) => {
    var arr = applications.data
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].verified_status === 'Pending') {
            var tr = document.querySelector('.app_no').cloneNode(true)

            var app_name = tr.querySelector('.app_name')
            app_name.innerHTML = 'LAC-00' + String(i) + '-2024'

            var app_date = tr.querySelector('.app_date')
            app_date.innerHTML = formatCurrentDate()

            var app_applicant = tr.querySelector('.app_applicant')
            app_applicant.innerHTML = arr[i].name

            var unique = tr.querySelector('.read-more')
            unique.innerHTML = `<a class="text-dark" id="`+arr[i]._id+`")>Read More >></a>`

            unique.addEventListener('click',()=> recordId(arr[i]._id))

            var tr2 = document.querySelector('.app_no')
            tr2.insertAdjacentElement('afterend', tr)

        }
    }
    document.querySelector('.app_no').remove()
}

function formatCurrentDate() {
    const today = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formatter = new Intl.DateTimeFormat('en-GB', options);
    const formattedDate = formatter.format(today);
    return formattedDate;
}

function recordId(id){
    localStorage.setItem('application_id',id)
    location.assign('/applicationDetails')
    console.log("Cause")
}