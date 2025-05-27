import React, { useState } from 'react';

const Adminfac = () => {
  const departments = ["Computer Science", "Software Engineering", "Information Technology"];

  const [selectedDep, setSelectedDep] = useState("");
  const [contacts, setContacts] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");

  const handleDepChange = (e) => {
    setSelectedDep(e.target.value);
    setContacts([]); // Reset contacts when department changes
  };

  const searchContacts = async () => {
    const url = `http://localhost:5000/api/contact/getcontact/${selectedDep}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch contacts.");
      }

      const data = await response.json();
      if (!Array.isArray(data) || data.length === 0) {
        console.warn("No contacts found.");
        setContacts([]);
      } else {
        console.log("Contacts fetched:", data);
        setContacts(data);
      }
    } catch (err) {
      console.error("Error during fetch:", err);
      setContacts([]);
    }
  };

  const addContact = async () => {
    if (!mail || !phone) {
      alert("Email and phone number are required.");
      return;
    }

    const url = `http://localhost:5000/api/contact/addcontact/${mail}/${phone}`;
    const payload = {
        department: selectedDep,
        email: mail,
        phone: phone
      };
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Failed to add contact.");
      }

      const result = await response.json();
      console.log("Contact added:", result);
      alert("Contact added successfully!");
      setMail("");
      setPhone("");
      setFormVisible(false);
      searchContacts(); // Refresh contact list
    } catch (err) {
      console.error("Error while adding contact:", err);
    }
  };

  return (
    <div className="p-4">
      <select value={selectedDep} onChange={handleDepChange} className="border p-2 mb-4">
        <option value="">Select Department</option>
        {departments.map((dep, index) => (
          <option key={index} value={dep}>{dep}</option>
        ))}
      </select>

      {selectedDep && (
        <div className="space-x-4">
          <button onClick={() => setFormVisible(true)} className="bg-blue-500 text-white px-4 py-2 rounded">Add Contact</button>
          <button onClick={searchContacts} className="bg-green-500 text-white px-4 py-2 rounded">Search</button>
        </div>
      )}

      {formVisible && (
        <div className="mt-4 space-y-2">
          <input
            type="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            placeholder="Enter email"
            className="block border p-2 w-full"
            required
          />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone"
            className="block border p-2 w-full"
            required
          />
          <button onClick={addContact} className="bg-purple-600 text-white px-4 py-2 rounded">Upload Info</button>
        </div>
      )}

      {contacts.length > 0 && (
        <div className="mt-6">
          <h2 className="font-bold text-lg mb-2">Contacts:</h2>
          <ul className="space-y-2">
            {contacts.map((con, index) => (
              <li key={index} className="border-b pb-2">
                <strong>📧 {con.email || "N/A"}</strong><br />
                📞 {con.phone || "N/A"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Adminfac;
