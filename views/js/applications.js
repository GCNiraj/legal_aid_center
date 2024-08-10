var obj 
if (document.cookie) {
    obj = JSON.parse(document.cookie.substring(6));
} else {
    obj = JSON.parse('{}');
    location.assign('/')
}

const allApplications = async() => {
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

const displayPendingApplications = (applications) =>{
    var arr = applications.data
    let j = 0
    for (let i=0; i<arr.length; i++){
        console.log(arr[i])
    }
}