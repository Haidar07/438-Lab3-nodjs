const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const contacts = require('./contacts.json');
const app = express();
const fs = require('fs');
const { Console } = require('console');
const port = 3000


app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/contact', (req, res) => {
    res.json(contacts);
});

app.get('/contact/:id', (req, res) => {
    // reading contact_tel_number from the URL
    const id = parseInt(req.params.id);
    // searching contacts for the isbn
    for (let contact of contacts) {
        if (contact.id === id) {
            res.json(contact);
            return;
        }
    }

    // sending 404 when not found something is a good practice
    res.status(404).send('Contact not found');
});

app.post('/contact', (req, res) => {
    const contact = req.body;

    let maxid = contacts.reduce(
        (acc, curr) => (curr.id >= acc ? curr.id : acc),
        0
    )
    let newid = maxid + 1; 
    let newContact = {id:newid, ...contact} 
    contacts.push(newContact);

    res.send('Contact is added to the database');
});

// app.post('/contact/:id', (req, res) => {
//     // reading contact_tel_number from the URL
//     const id = req.params.id;
//     const newContact = req.body;

//     // remove item from the contacts array
//     for (let i = 0; i < contacts.length; i++) {
//         let contact = contacts[i]

//         if (contact.id === id) {
//             contacts[i] = newContact;
//         }
//     }

//     // sending 404 when not found something is a good practice
//     res.send('Contact is Added');
// });

app.post('/edit/:id', (req, res)=>{
 
    let id = +req.params.id;
    let contact = req.body;

    console.log(contact);
    let index = contacts.findIndex((ct => ct.id === id));
    let updatedContact = {id:id, ...contact};
    console.log(updatedContact);
    contacts[index] = updatedContact;
    res.send('Contact is Updated');
})

app.delete('/contact/:id', (req, res) => {

    const id = +req.params.id;
    let index = contacts.findIndex((ct => ct.id === id));
    contacts.splice(index, 1); 

    res.send('Contact is deleted');
});


app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));