import { Tabs } from 'antd';
import LocationCard from './LocationCard';
import OrganizationLayoutServiceCard from './OrganizationLayoutServiceCard';
import { Service } from '../interface/model/Service';
import Location from '../interface/model/Location';

const { TabPane } = Tabs;

interface OrganizationTabsProps {
  services: Service[];
  locations: Location[];
}

export default function OrganizationTabs({
  services,
  locations,
}: OrganizationTabsProps) {
  return (
    <Tabs defaultActiveKey="services" style={{ width: '100%' }}>
      {/* Services Tab */}
      <TabPane tab={`Services (${services.length})`} key="services">
        {services.map((service) => (
          <OrganizationLayoutServiceCard key={service.id} service={service} />
        ))}
      </TabPane>

      {/* Locations Tab */}
      <TabPane tab={`Locations (${locations.length})`} key="locations">
        {locations.map((loc) => (
          <LocationCard
            key={loc.id}
            title={loc.name || 'N/A'}
            address={loc.addresses[0]?.address1 || 'N/A'}
            phone={loc.phones[0]?.number || 'N/A'}
          />
        ))}
      </TabPane>
    </Tabs>
  );
}
