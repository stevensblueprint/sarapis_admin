import { Card } from 'antd';

const LocationCard: React.FC<{
  title: string;
  address: string;
  phone: string;
}> = ({ title, address, phone }) => {
  return (
    <Card className="mb-[1rem]">
      <h3 className="text-[#663399]">{title}</h3>
      <p>
        <strong>Address:</strong> {address}
      </p>
      <p>
        <strong>Phone:</strong> {phone}
      </p>
    </Card>
  );
};
export default LocationCard;
