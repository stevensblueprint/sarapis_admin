import { Link } from 'react-router-dom';
import Organization from '../interface/model/Organization';
import { Card, Col } from 'antd';

interface OrganizationCardProps {
  organization: Organization;
}

const OrganizationCard = ({ organization }: OrganizationCardProps) => {
  return (
    <Col span={7}>
      <Link to={`/organizations/${organization.id}`}>
        <Card title={organization.name} hoverable>
          <p>{organization.description}</p>
          <p>Number of Services: {organization.services.length}</p>
        </Card>
      </Link>
    </Col>
  );
};

export default OrganizationCard;
