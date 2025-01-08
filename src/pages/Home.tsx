import { useEffect } from 'react';
import { useAuthenticatedClient } from '../hooks/useAuthenticatedClient';
import { getAllOrganizations } from '../api/lib/organizations';
import ServiceCard from '../components/ServiceCard';
import Map from '../components/Map';

export const Home: React.FC = () => {
  const client = useAuthenticatedClient();

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await getAllOrganizations(client);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrganizations();
  }, [client]);

  return (
    <>
      <div className="flex flex-row flex-nowrap">
        <ServiceCard
          service={{
            id: 1,
            name: 'React',
            organizationId: 1,
            organizationName: 'Facebook',
            description: 'A JavaScript library for building user interfaces',
            location: ['San Francisco, CA'],
            phone: '123-456-7890',
            serviceCategory: 'Technology',
            serviceEligibility: ['Developers', 'Designers'],
          }}
        />
        <Map />
      </div>
    </>
  );
};
