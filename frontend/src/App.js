import { useState, useEffect } from 'react';
import './App.css';
import Contacts from './components/contactComponent.js';

function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch('http://localhost/api/contacts')
      .then((response) => response.json())
      .then((data) => setContacts(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="header">Contactor</h1>
      <div className="frame">
        <h2 className="frame-heading">Contacts</h2>
        <div className="Contact-details">
          <Contacts contacts={contacts} setContacts={setContacts}/>
        </div>
      </div>
      <div className="description">
        <p>Click a contact to view or hide associated phone numbers and perform deletion and insertion</p>
      </div>
    </div>
  );
}

export default App;