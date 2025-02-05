import React from 'react';
import { Tabs, Card } from 'antd';

const { TabPane } = Tabs;

//   Example "Services" data array.
//   In a real app, you'll fetch this from a backend and store it in state or props.
const servicesData = [
  {
    id: 1,
    title: 'Workforce Development',
    description:
      'Throughout our many years of service, A Wider Circle has seen far too few people rise out of poverty...',
    phone: '(301) 608-3508',
    address: '9159 Brookville Road Silver Spring MD 20910',
    categories: ['Work', 'Skills & Training'],
    eligibility: ['Unemployed', 'Employment Status'],
  },
  {
    id: 2,
    title: 'Partnership to Independence',
    description:
      'The Partnership to Independence (P2I) is a new initiative based on 17 years of working with individuals and families...',
    phone: '(301) 608-3508',
    address: '9159 Brookville Road Silver Spring MD 20910',
    categories: ['Education', 'Financial Education', 'Health Education'],
    eligibility: [],
  },
  {
    id: 3,
    title: 'Test',
    description: 'Testing the 3rd item',
    phone: '(956) 608-3508',
    address: ' Nightware Silver Spring MD 20910',
    categories: ['Dancing', 'Vibes and Chills', 'Cool Education'],
    eligibility: [],
  },
];

//   Example "Locations" data array.
//   Again, you can fetch from your backend or store locally in state/props.
const locationsData = [
  {
    id: 1,
    title: 'A Wider Circle Center for Community Service',
    address: '9159 Brookville Road Silver Spring MD 20910',
    phone: '(301) 608-3508',
  },
  {
    id: 2,
    title: 'A Wider Circle Mailing Address',
    address: '4808 Moorland Lane Bethesda MD 20814',
    phone: '(301) 608-3508, (301) 608-3504',
  },
  {
    id: 3,
    title: 'test 3 Items',
    address: '788888 Big Guy Lane Bethesda MD 20814',
    phone: '(301) 608-3508, (301) 608-3504',
  },
];

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
    <Card style={{ marginBottom: '1rem' }}>
      <h3 style={{ color: '#663399' }}>{title}</h3>
      <p>{description}</p>
      <p>
        <strong>Phone:</strong> {phone}
      </p>
      <p>
        <strong>Address:</strong> {address}
      </p>
      {/* Example "chips" for categories */}
      {categories.length > 0 && (
        <p>
          <strong>Service Category: </strong>
          {categories.map((cat) => (
            <span
              key={cat}
              style={{
                marginRight: 8,
                padding: '3px 8px',
                borderRadius: 4,
                background: '#000',
                color: '#fff',
                display: 'inline-block',
              }}
            >
              {cat}
            </span>
          ))}
        </p>
      )}
      {/* Example "chips" for eligibility */}
      {eligibility.length > 0 && (
        <p>
          <strong>Service Eligibility: </strong>
          {eligibility.map((el) => (
            <span
              key={el}
              style={{
                marginRight: 8,
                padding: '3px 8px',
                borderRadius: 4,
                background: '#faad14',
                color: '#000',
                display: 'inline-block',
              }}
            >
              {el}
            </span>
          ))}
        </p>
      )}
    </Card>
  );
};

// Render a "Location" item
const LocationCard: React.FC<{
  title: string;
  address: string;
  phone: string;
}> = ({ title, address, phone }) => {
  return (
    <Card style={{ marginBottom: '1rem' }}>
      <h3 style={{ color: '#663399' }}>{title}</h3>
      <p>
        <strong>Address:</strong> {address}
      </p>
      <p>
        <strong>Phone:</strong> {phone}
      </p>
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
