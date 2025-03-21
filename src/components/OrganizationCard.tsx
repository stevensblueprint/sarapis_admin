import Organization from '../interface/model/Organization';
import { Card, Col } from 'antd';

interface OrganizationCardProps {
  organization: Organization;
}

const OrganizationCard = ({ organization }: OrganizationCardProps) => {
  return (
    <Col span={7}>
      <Card title={organization.name}>
        <p>{organization.description}</p>
        <p>Number of Services: {organization.services.length}</p>
      </Card>
    </Col>
  );
};

export default OrganizationCard;
