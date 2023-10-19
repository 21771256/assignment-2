import { useState, useEffect } from 'react';
import Phone from './phoneComponent';

function Contact(props) {

	//console.log(props);

	function deleteOnClick() {
		// Find the contact we want to delete and remove it
		fetch(`http://localhost/api/contacts/${props.id}`, {
			method: 'DELETE',
		})
		.then(() => {
			// remove it from the state
			props.deleteContact(props.id);
		})
		.catch((error) => {
			console.error('Error:', error);
		})
	}

	return (
    <div>
      <button type="button" onClick={deleteOnClick}>Delete</button> 
      <Phone contactId={props.id} />
    </div>
	);
}


function Contactss(props) {
  const [newContact, setNewContact] = useState("");

  useEffect(() => {
    
  }, []);

  //function onChange(event) {
	//setNewContact(event.target.value);
//}
  function onClick() {
    if (newContact.trim() === ''){
      alert('Please enter a name for the contact.');
    }
    else{
      fetch(`http://localhost/api/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newContact }),
      })
        .then((response) => response.json())
        .then((data) => {
          props.setContacts(contacts => [...contacts, data]);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      setNewContact("");
    }  
  }

  function deleteContact(id) {
    // Remove the contact from the state
    props.setContacts((contacts) => contacts.filter((contact) => contact.id !== id));
  }

  return (
    <div>
	  <div>
		<input
			type="text"
			placeholder="Name"
			value={newContact}
			onChange={(e) => setNewContact(e.target.value)}
		/>
		<button onClick={onClick}>Create Contact</button>
      </div>
      <h3>
		    {props.contacts.map((contact) => (
          <div key={contact.id}>
			    {contact.name}
			    <Contact id={contact.id} deleteContact={deleteContact} />
			</div>
		  
        ))}
		
	  </h3>
	  
    </div>
  );
}

export default Contactss;