import ImageSlider from "./ImageSlider";
import img2 from 'https://ik.imagekit.io/Aditya14/Hotel_images/pexels-pixabay-258154.jpg?updatedAt=1748348324827';
import img3 from 'https://ik.imagekit.io/Aditya14/Hotel_images/pexels-pixabay-258154.jpg?updatedAt=1748348324827';
import img4 from 'https://ik.imagekit.io/Aditya14/Hotel_images/pexels-pixabay-258154.jpg?updatedAt=1748348324827';
import img5 from 'https://ik.imagekit.io/Aditya14/Hotel_images/pexels-pixabay-258154.jpg?updatedAt=1748348324827';
import img1 from 'https://ik.imagekit.io/Aditya14/Hotel_images/pexels-pixabay-258154.jpg?updatedAt=1748348324827';

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