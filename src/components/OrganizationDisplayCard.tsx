import { Card } from 'antd';
import Organization from '../interface/model/Organization';

interface OrganizationDisplayCard {
  organization: Organization;
}

// The Left Column Top Card
const OrganizationDisplayCard = () => {
  return (
    <Card
      title={<span style={{ fontSize: '2rem' }}>A Wider Circle</span>}
      bordered
      className="shadow-lg flex-[1_1_400]"
    >
      <div className="text-[1rem] text-333">
        <p>
          A Wider Circle’s efforts focus on the provision of basic need items,
          workforce development, wraparound support, and neighborhood
          revitalization. These four components work in concert to create
          lasting change in the lives of those we serve. A Wider Circle says no
          to nobody! Anyone in need of help can find it here.
        </p>
        <p>
          In addition to all of the individuals and families that call us, more
          than 500 government, social service, and nonprofit agencies regularly
          contact us for help in serving their clients. We look forward to
          working with you.
        </p>
        <p>
          <strong>Website:</strong>{' '}
          <a href="https://awidercircle.org/" target="_blank" rel="noreferrer">
            https://awidercircle.org/
          </a>
        </p>
        <p>
          <strong>Phone:</strong> (301) 608-3508
        </p>
        <p>
          <strong>Email:</strong>{' '}
          <a href="mailto:contact@awidercircle.org">contact@awidercircle.org</a>
        </p>
      </div>
    </Card>
  );
};

export default OrganizationDisplayCard;
