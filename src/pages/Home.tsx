import { useEffect } from 'react';
import { useAuthenticatedClient } from '../hooks/useAuthenticatedClient';
import { getAllOrganizations } from '../api/lib/organizations';

export const Home = () => {
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
};
