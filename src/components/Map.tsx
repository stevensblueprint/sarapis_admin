import { MapContainer, TileLayer } from 'react-leaflet';

const Map = () => {
  return (
    <div
      style={{ height: '100vh', borderRadius: '15px', overflow: 'hidden' }}
      className="m-8"
    >
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};
export default Map;
