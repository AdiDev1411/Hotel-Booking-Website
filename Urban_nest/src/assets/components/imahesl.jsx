import ImageSlider from "./ImageSlider";
import img2 from '../Images/img2.png';
import img3 from '../Images/img3.png';
import img4 from '../Images/img4.png';
import img5 from '../Images/img5.png';
import img1 from '../Images/img1.png';

const IMAGESSLIDERS = () => {
  const slides = [
  { url: img1, title: "beach", buttonText: "Expoler Now!!" },
  { url: img2, title: "boat", buttonText: "Expoler Now!!" },
  { url: img3, title: "forest", buttonText: "Expoler Now!!" },
  { url: img4, title: "city", buttonText: "Expoler Now!!" },
  { url: img5, title: "italy", buttonText: "Expoler Now!!" },
];

  const containerStyles = {
    width: "90%",
    height: "680px",
    margin: "0 auto",
  };
  return (
    <div>
      {/* <h1>Hello monsterlessons</h1> */}
      <div style={containerStyles}>
        <ImageSlider slides={slides} />
      </div>
    </div>
  );
};

export default IMAGESSLIDERS;