const formulario = document.querySelector('form')    
    formulario.addEventListener('submit', async(event) => {
        event.preventDefault();
        const data = Object.fromEntries(
            new FormData(event.target)
        )
        await sendDataRegister(data)
        formulario.reset()
    })


const sendDataRegister = (data) => {
    fetch("http://localhost:3001/api/users/register", {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}