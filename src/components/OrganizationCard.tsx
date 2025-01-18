import Organization from '../interface/model/Organization';

interface OrganizationCardProps {
  organization: Organization;
}

const OrganizationCard = ({ organization }: OrganizationCardProps) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{organization.name}</h5>
        <p className="card-text">{organization.description}</p>
      </div>
    </div>
  );
};

export default OrganizationCard;
