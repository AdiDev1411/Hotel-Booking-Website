import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../CSS/ConfirmationPage.css";
import superdelux from "../Images/Super-Deluxe.png";
import delux from "../Images/Deluxe.png";
import premium from "../Images/premium.png";
import { useNavigate } from "react-router-dom"; 

const ConfirmationPage = () => {
   const navigate = useNavigate();
  const location = useLocation();
  const { formData, totalBill, bookingId } = location.state;

  let showimg;
  if (formData.roomType === 'Super Deluxe') {
    showimg = superdelux;
  } else if (formData.roomType === 'Deluxe') {
    showimg = delux;
  } else if (formData.roomType === 'Premium') {
    showimg = premium;
  }

  const handleDownload = () => {
    const doc = new jsPDF();

    doc.text("Booking Confirmation", 20, 20);

    // Call autoTable by passing the doc instance explicitly
    autoTable(doc, {
      startY: 30,
      head: [["Field", "Value"]],
      body: [
        ["Booking ID", bookingId],
        ["Name", formData.name],
        ["Email", formData.email],
        ["Phone", formData.phone],
        ["Room Type", formData.roomType],
        ["AC Option", formData.acOption],
        ["Breakfast", formData.breakfast],
        ["Guests", formData.guests],
        ["Rooms", formData.numRooms],
        ["Start Date", formData.startDate],
        ["End Date", formData.endDate],
        ["Payment Method", formData.paymentMethod],
        ["Total Amount", `₹${formData.totalAmount}`],
      ],
    });

    doc.save(`${bookingId}.pdf`);
  };

  const backtomain = ()=>{
    navigate("/")
  } 

  return (
    <div className="confirm-container">
      <div className="confirm-right">
      <div className="confirm-left">
        <img src={showimg} alt="Room" />
      </div>
        <h2>🎉 Congratulations! Booking Confirmed</h2>
        <p style={{ display: "flex", marginBottom: "4px" }}><strong style={{ width: "150px" }}>Booking ID:</strong> {bookingId}</p>
       <ul style={{ listStyle: "none", padding: 0 }}>
  <li style={{ display: "flex", marginBottom: "4px" }}>
    <strong style={{ width: "150px" }}>Name:</strong> {formData.name}
  </li>
  <li style={{ display: "flex", marginBottom: "4px" }}>
    <strong style={{ width: "150px" }}>Email:</strong> {formData.email}
  </li>
  <li style={{ display: "flex", marginBottom: "4px" }}>
    <strong style={{ width: "150px" }}>Phone:</strong> {formData.phone}
  </li>
  <li style={{ display: "flex", marginBottom: "4px" }}>
    <strong style={{ width: "150px" }}>Room Type:</strong> {formData.roomType}
  </li>
  <li style={{ display: "flex", marginBottom: "4px" }}>
    <strong style={{ width: "150px" }}>AC:</strong> {formData.acOption}
  </li>
  <li style={{ display: "flex", marginBottom: "4px" }}>
    <strong style={{ width: "150px" }}>Breakfast:</strong> {formData.breakfast}
  </li>
  <li style={{ display: "flex", marginBottom: "4px" }}>
    <strong style={{ width: "150px" }}>Guests:</strong> {formData.guests}
  </li>
  <li style={{ display: "flex", marginBottom: "4px" }}>
    <strong style={{ width: "150px" }}>Rooms:</strong> {formData.numRooms}
  </li>
  <li style={{ display: "flex", marginBottom: "4px" }}>
    <strong style={{ width: "150px" }}>Dates:</strong> {formData.startDate} to {formData.endDate}
  </li>
  <li style={{ display: "flex", marginBottom: "4px" }}>
    <strong style={{ width: "150px" }}>Payment Method:</strong> {formData.paymentMethod}
  </li>
</ul>

        {/* <h3>Total Amount: ₹{totalBill.total}</h3> */}
        <div className="buttons-section">

        <button onClick={handleDownload} className="download-btn">📄 Save as PDF</button>
        <button onClick={backtomain} className="back-btn">🔙 Back To Main Page</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
