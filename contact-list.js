const setEditModal = (id) => {
    const xhttp = new XMLHttpRequest();
//Add code here to:
//get a book given its ISBN number
//Parse it into the book attributes
//Display Book attributes
//User can change any attributes 
//Write back the new data

    xhttp.open("GET", "http://localhost:3000/contact/" + id, false);
    xhttp.send();

    const contact = JSON.parse(xhttp.responseText);

    const x = `
    <form action="http://localhost:3000/edit/${contact.id}" id="form1" method="POST">
    <div class="form-group" id="contact_name">
        <label for="exampleInputPassword1">Contact Name</label>
        
    </div>

    <div class="form-group" id="contact_profession">
        <label for="exampleInputPassword1">Contact Profession</label>
    
    </div>

    <div class="form-group" id="contact_tel_number">
        <label for="exampleInputPassword1">Contact Tel Num</label>
    </div>

    <div class="form-group" id="contact_mobile_number">
        <label for="exampleInputPassword1">Contact Mobile Num</label>
    </div>

    <button type="submit" form="form1" class="btn btn-primary">Submit</button>
</form>`

    document.getElementById('subform').innerHTML = x;

    document.getElementById('contact_name').innerHTML = document.getElementById('contact_name').innerHTML + `<input class="form-control" id="contact_name" value="${contact.contact_name}">`;

    document.getElementById('contact_profession').innerHTML = document.getElementById('contact_profession').innerHTML + `<input class="form-control" id="contact_profession" value="${contact.contact_profession}">`;

    document.getElementById('contact_tel_number').innerHTML = document.getElementById('contact_tel_number').innerHTML + `<input class="form-control" id="contact_tel_number" value="${contact.contact_tel_number}">`;

    document.getElementById('contact_mobile_number').innerHTML = document.getElementById('contact_mobile_number').innerHTML + `<input class="form-control" id="contact_mobile_number" value="${contact.contact_mobile_number}">`;
    

}

const deleteContact = (id) => {
    const xhttp = new XMLHttpRequest();
//Add code here to:
//Delete the record that has the given id Number

    xhttp.open("Delete", "http://localhost:3000/contact/" + id, false);
    xhttp.send();

}

const loadContacts = () => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "http://localhost:3000/contact", false);
    xhttp.send();

    const contacts = JSON.parse(xhttp.responseText);
    
    for (let contact of contacts) {
        const x = `
        <tr>
            <td>${contact.contact_name}</td>
            <td>${contact.contact_profession}</td>
            <td>${contact.contact_tel_number}</td>
            <td>${contact.contact_mobile_number}</td>
            <td><button onclick="deleteContact(${contact.id})" type="button" class="btn btn-primary" data-toggle="modal">Delete</button></td>
            <td><button onclick="setEditModal(${contact.id})" types="button" class="btn btn-primary" data-toggle="modal">Edit
            </button></td>
        </tr>
        `

        document.getElementById('contacts').innerHTML = document.getElementById('contacts').innerHTML + x;
    }
}


loadContacts();