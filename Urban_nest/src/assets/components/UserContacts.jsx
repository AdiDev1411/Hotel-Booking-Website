import React, { useEffect, useState } from "react";
import "../CSS/AdminDashboard.css"; // Reuse same styling
import "../CSS/usercontact.css"
export default function UserContacts() {
  const [contacts, setContacts] = useState([]);
  const BASE_URL = "http://localhost:5002/api";

  const fetchContacts = async () => {
    try {
      const res = await fetch(`${BASE_URL}/contact`);
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  };

 useEffect(() => {
  fetchContacts(); // Initial load

  const interval = setInterval(() => {
    fetchContacts(); // Refresh every 5 seconds
  }, 5000);

  return () => clearInterval(interval); // Cleanup
}, []);


  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/contact/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setContacts((prev) => prev.filter((contact) => contact._id !== id));
      } else {
        console.error("Failed to delete contact");
      }
    } catch (err) {
      console.error("Error deleting contact:", err);
    }
  };



  return (
      <div className="table-wrapper">
        <h2 className="main-heading">User Contact Submissions</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Number</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <tr key={contact._id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.number}</td>
                <td>{contact.message}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(contact._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No user contacts found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
