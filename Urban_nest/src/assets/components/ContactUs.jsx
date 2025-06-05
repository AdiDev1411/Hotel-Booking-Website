import React, { useState } from "react";
import "../CSS/contact.css";
import { motion, AnimatePresence } from "framer-motion";

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

 const handleSubmit = async (e) => {
  e.preventDefault();
  const newSubmission = { name, email, number, message };

  try {
    const res = await fetch("http://localhost:5002/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSubmission),
    });

    if (!res.ok) throw new Error("Failed to send message");

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);

    // Clear form
    setName("");
    setEmail("");
    setMessage("");
    setNumber("");
  } catch (err) {
    console.error("Error submitting contact form:", err);
  }
};


  return (
    <div className="contact-section">
      <h1>Contact Us</h1>
      <p>If you have any questions or inquiries, feel free to reach out to us.</p>

      <div className="contact-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="phone"
            name="phone"
            placeholder="Your number"
            required
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="6"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button type="submit">Send Message</button>

          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="success-message"
              >
                ✅ Message sent successfully!
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        <div className="contact-info">
          <h3>Hotel Address</h3>
          <p>123 Luxury Lane, Mumbai, India</p>
          <p>Email: adiforpro@gmail.com</p>
          <p>Phone: +91-7016157670</p>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
