import { useState } from 'react';
import Phone from './phoneComponent';
import './contactComponent.css';

function Contacts(props) {
  const [newContact, setNewContact] = useState("");
  const [detailsVisible, setDetailsVisible] = useState({});

  // Toggle the visibility of details for a specific contact
  const toggleDetails = (contactId) => {
    setDetailsVisible((prevState) => ({
      ...prevState,
      [contactId]: !prevState[contactId],
    }));
  };

  function deleteOnClick(contactId) {
		// Find the contact we want to delete and remove it
		fetch(`http://localhost/api/contacts/${contactId}`, {
			method: 'DELETE',
		})
		.then(() => {
			// remove it from the state
			deleteContact(contactId);
		})
		.catch((error) => {
			console.error('Error:', error);
		})
	}
  
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
      <div class="create-contact">
        <input
          type="text"
          placeholder="Name"
          value={newContact}
          onChange={(e) => setNewContact(e.target.value)}
        />
        <button onClick={onClick} class="create-button">Create Contact</button>
      </div>
      <div class="contact-info">
        {props.contacts.map((contact) => (
          <div key={contact.id} class="contact-details">
            <span
              onClick={() => toggleDetails(contact.id)}
              style={{ cursor: 'pointer' }}
            >
              <h3 class="contact-name-delete">
                {contact.name}
                  <button type="button" onClick={() => deleteOnClick(contact.id)} class="delete-button">Delete</button>
              </h3>
            </span>
            {detailsVisible[contact.id] && (
              <div>    
                <Phone contactId={contact.id} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


export default Contacts;