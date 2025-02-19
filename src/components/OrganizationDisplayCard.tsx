import { Card } from 'antd';
import Organization from '../interface/model/Organization';

interface OrganizationDisplayCardProps {
  organization: Organization;
}

// The Left Column Top Card
export default function OrganizationDisplayCard({
  organization,
}: OrganizationDisplayCardProps) {
  return (
    <Card
      title={<span style={{ fontSize: '2rem' }}>{organization.name}</span>}
      bordered
      className="shadow-lg flex-[1_1_400]"
    >
      <div className="text-[1rem] text-333">
        <p>{organization.description}</p>
        <p>
          <strong>Website:</strong>{' '}
          <a href={organization.website} target="_blank" rel="noreferrer">
            {organization.website}
          </a>
        </p>
        <p>
          <strong>Phone:</strong> {organization.phones[0]?.number || 'N/A'}
        </p>
        <p>
          <strong>Email:</strong>{' '}
          <a href={`mailto:${organization.email}`}>{organization.email}</a>
        </p>
      </div>
    </Card>
  );
}
