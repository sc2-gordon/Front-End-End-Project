let msgboard = document.getElementById("board")
let form = document.getElementById("form")

function addingmsg(power) {
    let newmsg = document.createElement("div")
    newmsg.innerHTML = `
    <p>${power.text}</p>
    <button id=${power.id} class="btn btn-danger">Delete</button>
    `
    msgboard.appendChild(newmsg)
}


fetch("https://next-message-board.herokuapp.com/messages")
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {

        for (let i = 0; i < data.length; i++) {
            console.log(data[i].text)
            addingmsg(data[i])
        }
    })

form.addEventListener("submit", function () {
    const input = document.getElementById("inputtext")
    // event.preventDefault()
    let bodyData = {
        text: input.value
    }
    fetch("https://next-message-board.herokuapp.com/messages", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
    })
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data)
            addingmsg(data.message)
        })
        .catch(error => {
            console.log(error)
        })
})

msgboard.addEventListener('click', function (e) {
    e.preventDefault()
    if (isNaN(parseInt(e.target.id))) {
        return
    } else {
        fetch(`https://next-message-board.herokuapp.com/messages/delete/${e.target.id}`, {
            method: 'post'
        })
            .then(resp => resp.json())
            .then(data => {
                const woosh = e.target.parentElement
                woosh.classList.add('rotate')
                setTimeout(function () {
                    woosh.remove()
                }, 200)
            })
    }
})