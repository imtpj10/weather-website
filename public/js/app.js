

console.log('Client side javascript is loaded!')
// const url = 
// fetch().then((response)=>{
//     response.json().then((data)=>{
//         if(data.Error) {
//             console.log(data.Error)
//         } else{
//             console.log(data.address)
//             console.log(data.temperature)
//             console.log(data.description)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
const message3 = document.querySelector('#message-3')

// message1.textContent = 'From Javascript!'
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault() 
    message1.textContent = 'Loading...'
    message2.textContent=''
    message3.textContent=''
    const url = 'http://127.0.0.1:3000/weather?address=' + searchElement.value;
    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.Error) {
                message1.textContent = data.Error
            } else{
                message1.textContent = data.address
                message2.textContent=data.temperature
                message3.textContent=data.description
            }
        })
    })
})