import React, { useState, useEffect } from 'react';

function Phone(props) {
  const [phoneData, setPhoneData] = useState([]);
  const [newPhone, setNewPhone] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    fetch(`http://localhost/api/contacts/${props.contactId}/phones`)
      .then((response) => response.json())
      .then((data) => setPhoneData(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [props.contactId]);

  function deletePhone(phoneId) {
    fetch(`http://localhost/api/contacts/${props.contactId}/phones/${phoneId}`, {
      method: 'DELETE',
    })
      .then(() => {
        // remove the phone from the state
        setPhoneData((data) => data.filter((phone) => phone.id !== phoneId));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function createPhone() {
	if (newDescription.trim() === '' || newPhone.trim() === ''){
      alert('Please fill in both name and phone number field to add contact.');
	}
	else{
      fetch(`http://localhost/api/contacts/${props.contactId}/phones`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ name: newDescription, number: newPhone }),
	  })
	  .then((response) => response.json())
	  .then((data) => {
	 	setPhoneData((phoneData) => [...phoneData, data]);
	  })
	  .catch((error) => {
		console.error('Error:', error);
	  });
	  setNewPhone('');
	  setNewDescription('');
	}
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={newPhone}
          onChange={(e) => setNewPhone(e.target.value)}
        />
        <button onClick={createPhone}>Add Phone</button>
      </div>
      <ul>
        {phoneData.map((phone) => (
          <li key={phone.id}>
            {phone.name}: {phone.number}
            <button onClick={() => deletePhone(phone.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Phone;
