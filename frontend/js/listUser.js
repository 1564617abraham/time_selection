const userList = document.querySelector('#users')
const inputSearch = document.querySelector('#personal-search')

let users = []

window.addEventListener('DOMContentLoaded', async () => {
    const data = await loadUsers()
    users = data
    renderUsers(users)
    console.log(`${users[0].firstName} ${users[0].lastName}`)
})

inputSearch.addEventListener('keyup', e => {
    const newUsers = users.filter(user => `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`.includes(inputSearch.value.toLowerCase()))
    console.log(`${newUsers[0].firstName} ${newUsers[0].lastName}`)
    renderUsers(newUsers)
})

async function loadUsers(){
    const response = await fetch('http://localhost:3001/api/users/gets')
    return await response.json()
}

const createUserItems = users => users.map(user => 
`<li> <div class="container-fluid c">${user.firstName} 
${user.lastName} ${user._id}</div> 
</li>`).join(' ')


const renderUsers = (users) => {
    const itemsString = createUserItems(users)
    userList.innerHTML = itemsString
}

// const element = document.querySelector('#button-delete');
// element.addEventListener('click',  function(){
// 	console.log("click");
// });

// const deleteUser = async(token) => {
//     const response = await fetch(`http://localhost:3001/api/users/ Bearer ${token}`)
//     return await response.json()
// }

{/* <button type="button" id="button-delete" class="btn du">
<img src="https://img.icons8.com/material-rounded/24/000000/filled-trash.png"/>
</button> 
<button type="button" id="button-update" class="btn du">
<img src="https://img.icons8.com/material-outlined/24/000000/edit--v1.png"/></div> */}








