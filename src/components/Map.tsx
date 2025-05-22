import { useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { Service } from '../interface/model/Service';

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
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const [clickedMarker, setClickedMarker] = useState<string | null>(null);

  const mapInfoList: MapInfo[] = services.flatMap((service) =>
    service.serviceAtLocations.map((serviceAtLocation) => {
      const { id, name, latitude, longitude } = serviceAtLocation.location;
      return { id, name: name || 'Unknown', latitude, longitude };
    })
  );

  const API_KEY = process.env.GOOGLE_MAPS_API_KEY || '';

  const containerStyle = {
    width: '100%',
    height: '100%',
  };

  const center = {
    lat: 40.7128,
    lng: -74.006,
  };

  return (
    <div className="m-8 h-screen rounded-[15px] overflow-hidden">
      <LoadScript googleMapsApiKey={API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
          options={{ scrollwheel: false }}
        >
          {mapInfoList.map((location: MapInfo) => (
            <Marker
              key={location.id}
              position={{ lat: location.latitude, lng: location.longitude }}
              onMouseOver={() => setActiveMarker(location.id)}
              onMouseOut={() => {
                if (clickedMarker !== location.id) {
                  setActiveMarker(null);
                }
              }}
              onClick={() => setClickedMarker(location.id)}
            >
              {(activeMarker === location.id ||
                clickedMarker === location.id) && (
                <InfoWindow
                  onCloseClick={() => {
                    if (clickedMarker === location.id) setClickedMarker(null);
                    if (activeMarker === location.id) setActiveMarker(null);
                  }}
                >
                  <div>Name: {location.name}</div>
                </InfoWindow>
              )}
            </Marker>
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
