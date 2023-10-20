import React, { useState, useEffect } from 'react';
import './phoneComponent.css';

function Phone(props) {
  const [phoneData, setPhoneData] = useState([]);
  const [newPhone, setNewPhone] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [detailsVisible, setDetailsVisible] = useState(true);

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
  else if(parseInt(newPhone) >= 2147483648){
    alert("Try to input a phone number with smaller value (like 9 digits)");
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
      {detailsVisible && (
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
            <button onClick={createPhone} class="addPhoneButton">Add Phone</button>
          </div>
          <table>
            <thead>
              <tr>
                <th class="pdescription">Description</th>
                <th class="pnumber">Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {phoneData.map((phone) => (
                <tr key={phone.id}>
                  <td>{phone.name}</td>
                  <td>{phone.number}</td>
                  <td> <button onClick={() => deletePhone(phone.id)} class="deletePhoneButton">Delete</button> </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Phone;