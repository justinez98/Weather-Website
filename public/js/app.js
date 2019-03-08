fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})


const weatherform = document.querySelector('form')
//provide a callback listener and type of event at the front
//usually the page will be refresh
const search = document.querySelector('input')
//give a special id for the item and use # to call it
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherform.addEventListener('submit', (e) => {
    //prevent the default behavior of refreshing the page
    e.preventDefault()
    //using the search value
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                if (data.errorMessage) {
                    messageOne.textContent = data.errorMessage
                } else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                }


            }
        })
    })
})