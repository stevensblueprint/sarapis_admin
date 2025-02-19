import { Card } from 'antd';
import { Service } from '../interface/model/Service';

interface OrganizationLayoutServiceCardProps {
  service: Service;
}

export default function OrganizationLayoutServiceCard({
  service,
}: OrganizationLayoutServiceCardProps) {
  return (
    <Card className="mb-[1rem]">
      <h3 className="text-[#663399]">{service.name}</h3>
      <p>{service.description}</p>
      <p>
        <strong>Phone:</strong> {service.phones[0]?.number || 'N/A'}
      </p>
      <p>
        <strong>Address:</strong>{' '}
        {service.serviceAtLocations[0]?.location.addresses[0]?.address1 ||
          'Various Locations'}
      </p>
      <p>
        <strong>Application Process:</strong>{' '}
        {service.applicationProcess || 'Check website for details.'}
      </p>
      <p>
        <strong>Eligibility:</strong>{' '}
        {service.eligibilityDescription ||
          'No specific eligibility requirements.'}
      </p>
      {service.languages.length > 0 && (
        <p>
          <strong>Languages Available: </strong>
          {service.languages.map((lang) => (
            <span
              key={lang.id}
              className="mr-[8px] py-[3px] px-[8px] rounded-md bg-[#000] text-[#fff] inline-block"
            >
              {lang.name}
            </span>
          ))}
        </p>
      )}
    </Card>
  );
}
