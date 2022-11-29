const displayer = document.getElementById('displayer')
const btn = document.getElementById('display-btn')
const box = document.querySelector('input')
const form = document.querySelector('form')

form.addEventListener('submit', e => {
    e.preventDefault()
    displayer.innerText = box.value
})