
const btn = document.getElementById('button-get');
const userList = document.querySelector('#users')


btn.addEventListener('click', async(e) => {
    e.preventDefault()
    const data = await loadUsers()
    renderUsers(data)
    // userList.innerHTML = data[0].firstName
})

window.addEventListener('DOMContentLoaded', async () => {
    const data = await loadUsers()
    renderUsers(data)
})

async function loadUsers(){
    const response = await fetch('http://localhost:3001/api/users/gets')
    return await response.json()
}

const createUserItems = users => users.map(user => `<li>${user.firstName} ${user.lastName}</li>`).join(' ')

const renderUsers = (users) => {
    const itemsString = createUserItems(users)
    userList.innerHTML = itemsString
}