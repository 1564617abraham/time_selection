const userList = document.querySelector('#users')
const inputSearch = document.querySelector('#personal-search')

let users = []
let idUsers = []

window.addEventListener('DOMContentLoaded', async () => {
    const data = await loadUsers()
    users = data
    renderUsers(users)
    console.log(data[0]._id)
    console.log(ids())
    //console.log(`http://localhost:3001/api/users/${users[0]._id}`)
})

//BUSCADOR Y CARGAR NUEVA LISTA REDUCIDA

inputSearch.addEventListener('keyup', e => {
    const newUsers = users.filter(user => `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`.includes(inputSearch.value.toLowerCase()))
    console.log(`${newUsers[0].firstName} ${newUsers[0].lastName}`)
    renderUsers(newUsers)
})

//FUNCIONES PARA CARGAR LA LISTA DE TRABAJADORES

async function loadUsers() {
    const response = await fetch('http://localhost:3001/api/users/gets')
    return await response.json()
}

const createUserItems = users => users.map(user => 
`<li> <div class="container-fluid c">${user.firstName} 
${user.lastName}</div> 
</li>`).join(' ')


const renderUsers = (users) => {
    const itemsString = createUserItems(users)
    userList.innerHTML = itemsString
}


const userDelete = document.querySelector('#button-delete')
userDelete.addEventListener('click', () => {
    console.log('click delete button')
    deleteUser()
    
})

//todo: CONSEGUIR OBTENER LA ID QUE QUEREMOS PARA ELIMINAR

const deleteUser = async () => {
    console.log(`http://localhost:3001/api/users/${id}`)
    const response = await fetch(`http://localhost:3001/api/users/${newUsers}`, { method: 'DELETE', headers: {
        'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
    }, })
    location.reload()
    return await response.json()
}

//obtenemos array de IDs

const getIds = userId => (userId.map(user => user._id))

const ids = async () => {
    const data = await loadUsers()
    idUsers = getIds(data)
    console.log(idUsers)
}









