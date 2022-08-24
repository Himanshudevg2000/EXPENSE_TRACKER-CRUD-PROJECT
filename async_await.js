const saveToCloudStorage = async (event) => {
  event.preventDefault();
  let user = {
    expense: document.getElementById("expense").value,
    description: document.getElementById("description").value,
    category: document.getElementById("category").value,
  };
  try {
    let saveuser = await axios.post("https://crudcrud.com/api/ead7e4cfd92146b9a3ff582061b54376/AppointmentData", user);
    onScreen(saveuser.data);
  } catch (err) {
    // document.ul.innerHTML = document.ul.innerHTML + "<h1> Something went wrong </h1>"
    console.log(err)
    const parentNode = document.getElementById('users')
    const childHTML = "<li > <h2> Something went Wrong </h2> </li>"
    parentNode.innerHTML = parentNode.innerHTML + childHTML
  }
};


window.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await axios.get("https://crudcrud.com/api/ead7e4cfd92146b9a3ff582061b54376/AppointmentData")
        for( let i=0 ; i < response.data.length ;i++){
            onScreen(response.data[i])
        }
    } catch (err) {
        console.log(err)
    }
})


const onScreen = async (user) => {
  try {
    const parentNode = document.getElementById('users');
    const childHTML = `<li id=${user._id} > ${user.expense} - ${user.description} - ${user.category}  <button id="dlt" onclick =deleteUser('${user._id}')> Delete </button>
    <button id="edt" onclick=editUser('${user.description}',${user.expense},'${user._id}')> Edit </li>`
    parentNode.innerHTML = parentNode.innerHTML + childHTML
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = async (userId) => {
  try {
    let del_user = await axios.delete(`https://crudcrud.com/api/ead7e4cfd92146b9a3ff582061b54376/AppointmentData/${userId}`);
    removeUserfromScreen(userId);
  } catch (err) {
    console.log(err);
  }
};

const removeUserfromScreen = async (userId) => {
  try {
    const parentNode = document.getElementById('users')
    const childNodeToDelete = document.getElementById(userId)
    parentNode.removeChild(childNodeToDelete);

  } catch (err) {
    console.log(err);
  }
};

const editUser = async (Chdescription,expenseamount,userId) => {
  try {
    document.getElementById('description').value = Chdescription
    document.getElementById('expense').value = expenseamount
    deleteUser(userId)
  } catch (err) {
    console.log(err);
  }
};