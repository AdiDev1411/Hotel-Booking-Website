import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapView = () => {
  const position = [22.322535, 70.767537]; // Example: Delhi

  return (
    <MapContainer center={position} zoom={19} style={{ height: '400px', width: '39%' }}>
        <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution='&copy; <a href="https://www.esri.com/en-us/home">Esri</a> &mdash; Satellite Imagery'
      />
      <Marker position={position}>
        <Popup>
          Our Hotel Location <br /> WTC.
        </Popup> 
      </Marker>
    </MapContainer>
  );
};

export default MapView;
