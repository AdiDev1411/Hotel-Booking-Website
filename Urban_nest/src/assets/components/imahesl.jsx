import ImageSlider from "./ImageSlider";
import img2 from '../Images/img2.png';
import img3 from '../Images/img3.png';
import img4 from '../Images/img4.png';
import img5 from '../Images/img5.png';
import img1 from '../Images/img1.png';
import '../CSS/temp.css'

const IMAGESSLIDERS = () => {
  const slides = [
  { url: 'https://ik.imagekit.io/Aditya14/Hotel_images/image11.jpg', title: "beach", buttonText: "Expoler Now!!" },
  { url: 'https://ik.imagekit.io/Aditya14/Hotel_images/image12.jpg', title: "boat", buttonText: "Expoler Now!!" },
  { url: 'https://ik.imagekit.io/Aditya14/Hotel_images/image13.jpg', title: "forest", buttonText: "Expoler Now!!" },
  { url: 'https://ik.imagekit.io/Aditya14/Hotel_images/image14.jpg', title: "city", buttonText: "Expoler Now!!" },
  { url: 'https://ik.imagekit.io/Aditya14/Hotel_images/image15.jpg', title: "italy", buttonText: "Expoler Now!!" },
];

  const containerStyles = {
    width: "90%",
    height: "680px",
    margin: "0 auto",
  };
  return (
    <div className="temp">
      {/* <h1>Hello monsterlessons</h1> */}
      <div style={containerStyles}>
        <ImageSlider slides={slides} />
      </div>
    </div>
  );
};

export default IMAGESSLIDERS;