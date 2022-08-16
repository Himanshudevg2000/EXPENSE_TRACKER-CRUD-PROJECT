function saveToCloudStorage(event) {
    event.preventDefault();
    const expense = event.target.expenseamount.value;
    const description = event.target.Chdescription.value;
    const category = event.target.Chcategory.value;

    const obj = {
        expense,
        description,
        category
    }

    axios.post("https://crudcrud.com/api/73a8a29a4aec4898b3b8f1d8b368d0b7/AppointmentData",obj)
    .then((response) => {
        onScreen(response.data)
    })
    .catch((error) => {
        document.div.ulcontainer.innerHTML = document.div.ulcontainer.innerHTML + "<h2> Something went wrong </h2>"
        console.log(error)
    })
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/73a8a29a4aec4898b3b8f1d8b368d0b7/AppointmentData")
    .then((response) => {
        for(var i=0; i<response.data.length ; i++) {
            onScreen(response.data[i])
        }
    })
    .catch((error) => {
        console.log(error)
    })
})

function onScreen(user){
    const parentNode = document.getElementById('users');
    const childHTML = `<li id=${user._id} > ${user.expense} - ${user.description} - ${user.category}  <button id="dlt" onclick =deleteUser('${user._id}')> Delete </button>
    <button id="edt" onclick=editUser('${user.description}',${user.expense},'${user._id}')> Edit </li>`
    parentNode.innerHTML = parentNode.innerHTML + childHTML
}

function deleteUser(userId){
    axios.delete(`https://crudcrud.com/api/73a8a29a4aec4898b3b8f1d8b368d0b7/AppointmentData/${userId}`)
    .then((response) => {
        removeFromScreen(userId)
    })
}

function removeFromScreen(userId) {
    const parentNode = document.getElementById('users')
    const childNodeToDelete = document.getElementById(userId)
    parentNode.removeChild(childNodeToDelete);
}


function editUser(Chdescription,expenseamount,userId){
    document.getElementById('description').value = Chdescription
    document.getElementById('expense').value = expenseamount
    deleteUser(userId)
}
