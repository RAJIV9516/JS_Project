let data ={
    name: "Rajiv",
    age: 19,
    address: 'bhopal'
}

localStorage.setItem("userdata",JSON.stringify(data))
let finaldata = JSON.parse(localStorage.getItem('userdata'))
console.log(finaldata.age);

function signup(){
    let data ={
        username:document.getElementById('username').value,
        password:document.querySelector('#password').value
    }
    localStorage.setItem('signupdata',JSON.stringify(data))
}

let local_data =JSON.parse(localStorage.getItem('signupdata'))

function login(){
    let data = {
        usernamelogin : document.getElementById('usernamelogin').value,
        passwordlogin : document.getElementById('passwordlogin').value
    }

    if(local_data.username!=data.usernamelogin || local_data.password != data.passwordlogin){
        alert("user not found")
        return false
    }
}



// ======================================================================================
async function fet(){
    let table = document.querySelector('#displaydata')
    let res = await fetch("http://localhost:3000/emp")
    let data = await res.json()
    let finaldata = data.map((e)=>`
    <tr>
    <td> ${e.id} </td>
    <td> ${e.city} </td>
    <td> ${e.checkin} </td>
    <td> ${e.checkout} </td>
    <td> ${e.room} </td>
    <td> <button onclick="mydelete('${e.id}')">Delet</button> </td>
    <td> <button onclick="edit('${e.id}')">Edit</button> </td>
    </tr>

    `).join("")
    table.innerHTML = finaldata
}
fet()

// ==============delete===============
function mydelete(id){
    console.log(id);
    fetch(`http://localhost:3000/emp/${id}`,{
        method:'DELETE'
    })
    .then(r=>alert("Deleted...!!"))
 }


// ============insert data=============
function insert_data(){
    let data = {
        city: document.querySelector('#destination').value,
        checkin: document.querySelector('#d1').value,
        checkout: document.querySelector('#d2').value,
        room: document.querySelector('#d3').value,

    }

    fetch("http://localhost:3000/emp",{
        method: 'POST',
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(r=>alert("Data Inserted"))
}


// ====================update===============
 async function edit(id){
    let res = await fetch(`http://localhost:3000/emp/${id}`)
    let data = await res.json()
    let edit_frm =`
    <input type="text" value="${data.id}" readonly id="id1"> <br>
    <input type="text" value="${data.city}" id="city1"> <br>
    <input type="text" value="${data.checkin}" id="checkin1"> <br>
    <input type="text" value="${data.checkout}" id="checkout1"> <br>
    <input type="text" value="${data.room}" id="room1"> <br>
    <input type="submit" onclick="mydata('${data.id}')">

    `
    document.querySelector('#editform').innerHTML=edit_frm
 }

 function mydata(id){
    let updata = {
        name: document.querySelector('#id1').value,
        id: document.querySelector('#city1').value,
        age: document.querySelector('#checkin1').value,
        contact: document.querySelector('#checkout1').value,
        city: document.querySelector('#room1').value

    }
    fetch(`http://localhost:3000/emp/${id}`,{
        method: 'PUT',
        header:{
            'content-type':'application/json'
        },
        body:JSON.stringify(updata)
    })
    .then(res=>alert("updated..!!!"))
 }