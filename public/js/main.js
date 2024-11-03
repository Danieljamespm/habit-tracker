const deleteBtn = document.getElementsByClassName('delete')


Array.from(deleteBtn).forEach((i)=>{
    i.addEventListener('click', deleteHabit)
})


async function deleteHabit(){
    const habitID = this.parentNode.parentNode.childNodes[3].dataset.id
    console.log(this.parentNode.parentNode.childNodes[3].dataset.id)
    try {
        const response = await fetch('/deleteHabit', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'habitIDFromJSFile' : habitID
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.log(err)
    }
}