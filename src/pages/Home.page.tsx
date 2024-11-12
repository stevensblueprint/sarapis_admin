import { useNavigate } from 'react-router-dom';
import { Button, Group } from '@mantine/core';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';

export function HomePage() {
  const navigate = useNavigate();

  const handleGoToForm = () => {
    navigate('/organization-form');
  };

  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
      <Group justify="center" mt="xl">
        <Button onClick={handleGoToForm}>Go to Form</Button>
      </Group>
    </>
  );
}
