import { Tabs } from 'antd';
import { servicesData, locationsData } from '../data/DummyData';
import LocationCard from './LocationCard';
import OrganizationLayoutServiceCard from './OrganizationLayoutServiceCard';

const { TabPane } = Tabs;

export default function OrganizationTabs() {
  return (
    <Tabs defaultActiveKey="services" style={{ width: '100%' }}>
      {/* Services Tab */}
      <TabPane tab={`Services (${servicesData.length})`} key="services">
        {servicesData.map((service) => (
          <OrganizationLayoutServiceCard key={service.id} service={service} />
        ))}
      </TabPane>

      {/* Locations Tab */}
      <TabPane tab={`Locations (${locationsData.length})`} key="locations">
        {locationsData.map((loc) => (
          <LocationCard
            key={loc.id}
            title={loc.name}
            address={loc.addresses[0]?.address1 || 'N/A'}
            phone={loc.phones[0]?.number || 'N/A'}
          />
        ))}
      </TabPane>
    </Tabs>
  );
}
