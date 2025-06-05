import React, { useEffect, useState } from "react";

const Admin = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("contactSubmissions")) || [];
    setSubmissions(stored);
  }, []);

  const handleDelete = (indexToDelete) => {
    const updated = submissions.filter((_, index) => index !== indexToDelete);
    localStorage.setItem("contactSubmissions", JSON.stringify(updated));
    setSubmissions(updated);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📩 Contact Form Submissions</h2>
      {submissions.length === 0 ? (
        <p style={styles.noData}>No messages submitted yet.</p>
      ) : (
        <div style={styles.list}>
          {submissions.map((item, index) => (
            <div key={index} style={styles.card}>
              <p>
                <strong>Name:</strong> {item.name}
              </p>
              <p>
                <strong>Email:</strong> {item.email}
              </p>
              <p>
                <strong>Subject:</strong> {item.subject}
              </p>
              <p>
                <strong>Message:</strong> {item.message}
              </p>
              <button
                style={styles.deleteBtn}
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    fontFamily: "Arial",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  noData: {
    color: "#888",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    position: "relative",
  },
  deleteBtn: {
    marginTop: "10px",
    backgroundColor: "#ff4d4f",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Admin;
