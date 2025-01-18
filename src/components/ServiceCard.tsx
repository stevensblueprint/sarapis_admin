import { Link } from 'react-router-dom';
import { Card } from 'antd';
import { Service } from '../interface/model/Service';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <Card
      title={<span style={{ fontSize: '1.5em' }}>{service.name}</span>}
      bordered={false}
      className="mx-8 mt-8"
      style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
    >
      <div className="text-xl">
        <p>
          Organization:
          <Link to={`/organization/${service.organization.id}`}>
            {' ' + service.organization.name}
          </Link>
        </p>
        <p>{service.description}</p>
        {service.phones.map((phone) => {
          return <p key={phone.id}>{phone.number}</p>;
        })}
        {service.serviceAtLocations.map((serviceAtLocation) => {
          return (
            <p key={serviceAtLocation.id}>{serviceAtLocation.location.name}</p>
          );
        })}
      </div>
    </Card>
  );
};

export default ServiceCard;
