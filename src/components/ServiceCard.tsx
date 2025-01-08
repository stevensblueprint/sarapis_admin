import { Link } from 'react-router-dom';
import { Card } from 'antd';

interface ServiceCardProps {
  service: {
    id: number;
    name: string;
    organizationId: number;
    organizationName: string;
    description: string;
    location: string[];
    phone: string | null;
    serviceCategory: string | null;
    serviceEligibility: string[] | null;
  };
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <Card
      title={<span style={{ fontSize: '1.5em' }}>{service.name}</span>}
      bordered={false}
    >
      <div className="text-lg">
        <p>
          <Link to={`/organization/${service.organizationId}`}>
            Organization: {service.organizationName}
          </Link>
        </p>
        <p>{service.description}</p>
        {service.phone && <p>{service.phone}</p>}
        {service.location && <p>{service.location}</p>}
        {service.serviceCategory && (
          <p>
            <strong>Service Catergory:</strong> {service.serviceCategory}
          </p>
        )}
        {service.serviceEligibility && (
          <p>
            <strong>Service Eligibility:</strong>{' '}
            {service.serviceEligibility.join(', ')}
          </p>
        )}
      </div>
    </Card>
  );
};

export default ServiceCard;
