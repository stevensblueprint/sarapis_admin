import React from 'react';
import { Tabs, Card } from 'antd';
import { servicesData, locationsData } from '../data/ServicesData';
import LocationCard from './LocationCard';
const { TabPane } = Tabs;

// Simple Card components for each type.
//  If your "services" and "locations" need different fields,
//  you can create separate components as shown here.

// Render a "Service" item
const ServiceCard: React.FC<{
  title: string;
  description: string;
  phone: string;
  address: string;
  categories?: string[];
  eligibility?: string[];
}> = ({
  title,
  description,
  phone,
  address,
  categories = [],
  eligibility = [],
}) => {
  return (
    <Card className="mb-[1rem]">
      <h3 className="text-[#663399]">{title}</h3>
      <p>{description}</p>
      <p>
        <strong>Phone:</strong> {phone}
      </p>
      <p>
        <strong>Address:</strong> {address}
      </p>
      {categories.length > 0 && (
        <p>
          <strong>Service Category: </strong>
          {categories.map((cat) => (
            <span
              key={cat}
              className="mr-[8px] py-[3px] px-[8px] rounded-md bg-[#000] text-[#fff] inline-block"
            >
              {cat}
            </span>
          ))}
        </p>
      )}
      {eligibility.length > 0 && (
        <p>
          <strong>Service Eligibility: </strong>
          {eligibility.map((el) => (
            <span
              key={el}
              className="mr-[8px] py-[3px] px-[8px] rounded-md bg-[#faad14] text-[#000] inline-block"
            >
              {el}
            </span>
          ))}
        </p>
      )}
    </Card>
  );
};

// The main component that actually builds the two Tabs:
//      - A "Services" tab
//      - A "Locations" tab
const OrganizationTabs: React.FC = () => {
  return (
    <Tabs defaultActiveKey="services" style={{ width: '100%' }}>
      {/* Services Tab */}
      <TabPane tab={`Services (${servicesData.length})`} key="services">
        {servicesData.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            description={service.description}
            phone={service.phone}
            address={service.address}
            categories={service.categories}
            eligibility={service.eligibility}
          />
        ))}
      </TabPane>

      {/* Locations Tab */}
      <TabPane tab={`Locations (${locationsData.length})`} key="locations">
        {locationsData.map((loc) => (
          <LocationCard
            key={loc.id}
            title={loc.title}
            address={loc.address}
            phone={loc.phone}
          />
        ))}
      </TabPane>
    </Tabs>
  );
};

export default OrganizationTabs;
