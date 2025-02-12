import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Service } from '../interface/model/Service';
import { useState } from 'react';

interface MapProps {
  services: Service[];
}
interface MapInfo {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}
const Map = ({ services }: MapProps) => {
  const [popupClicked, setPopupClicked] = useState<string | null>(null);

  const mapInfoList: MapInfo[] = services.flatMap((service) =>
    service.serviceAtLocations.map((serviceAtLocation) => {
      const { id, name, latitude, longitude } = serviceAtLocation.location;
      return { id, name, latitude, longitude };
    })
  );
  return (
    <div
      style={{ height: '100vh', borderRadius: '15px', overflow: 'hidden' }}
      className="m-8"
    >
      <MapContainer
        center={[40.7128, -74.006]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {mapInfoList.map((location: MapInfo) => (
          <Marker
            key={location.id}
            position={[location.latitude, location.longitude]}
            eventHandlers={{
              mouseover: (event) => {
                event.target.openPopup();
              },
              mouseout: (event) => {
                if (popupClicked !== location.id) {
                  event.target.closePopup();
                }
              },
              click: () => {
                setPopupClicked(location.id);
              },
            }}
          >
            <Popup
              eventHandlers={{
                remove: () => setPopupClicked(null),
              }}
            >
              Name: {location.name}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
export default Map;
