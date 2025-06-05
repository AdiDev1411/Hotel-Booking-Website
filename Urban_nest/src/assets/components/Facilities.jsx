import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../CSS/facilities.css';

function Facilities() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const amenities = [
    {
      name: 'Free Wi-Fi',
      image: 'https://images.unsplash.com/photo-1645725677294-ed0843b97d5c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description:
        'Enjoy seamless internet access throughout the hotel premises. Whether you’re working or streaming, we ensure a lag-free experience.',
      points: [
        'High-speed connectivity in all rooms and public areas',
        'No extra charges or time limitations',
        'Secure login with room number credentials',
      ],
    },
    {
      name: '24/7 Reception',
      image: 'https://ik.imagekit.io/Aditya14/Hotel_images/Reception.jpg',
      description:
        'Our reception desk is open round-the-clock to assist you with check-ins, check-outs, and any queries during your stay.',
      points: [
        'Instant support for room service and reservations',
        'Friendly multilingual staff available',
        'Tour and taxi booking support',
      ],
    },
    {
      name: 'Swimming Pool',
      image: 'https://ik.imagekit.io/Aditya14/Hotel_images/Pool.jpg',
      description:
        'Take a refreshing dip or lounge by the poolside. Our clean and maintained swimming pool is ideal for guests of all ages.',
      points: [
        'Open from 6 AM to 10 PM',
        'Separate children’s section available',
        'Poolside drinks and snacks available',
      ],
    },
    {
      name: 'Room Service',
      image: 'https://ik.imagekit.io/Aditya14/Hotel_images/Room_service.jpg',
      description:
        'Enjoy fine dining in the comfort of your room. Our room service is available 24/7 with a menu that covers all your cravings.',
      points: [
        'Multi-cuisine food options',
        'Fast and hygienic delivery',
        'Special midnight service menu',
      ],
    },
    {
      name: 'Gym & Fitness',
      image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description:
        'Keep up with your fitness routine with access to our modern gym equipped with all essential workout machines.',
      points: [
        'Treadmills, weights, cycles & more',
        'Certified fitness trainer available on request',
        'Open from 5 AM to 11 PM',
      ],
    },
    {
      name: 'Restaurant & Café',
      image: 'https://ik.imagekit.io/Aditya14/Hotel_images/cafe.jpg',
      description:
        'Relish a delightful culinary experience in our restaurant and café, serving everything from snacks to gourmet meals.',
      points: [
        'Buffet breakfast every morning',
        'Coffee shop open 24/7',
        'Live music on weekends',
      ],
    },
  ];

  return (
    <section id="facilities-section" className="facilities-container">
      <h2 className="section-title">Our Facilities & Amenities</h2>
      {amenities.map((item, index) => (
        <div
          className={`facility-row ${index % 2 === 0 ? 'left-image' : 'right-image'}`}
          key={index}
          data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
        >
          <div className="facility-text">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <ul>
              {item.points.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
          <div className="facility-image">
            <img src={item.image} alt={item.name} />
          </div>
        </div>
      ))}
    </section>
  );
}

export default Facilities;
