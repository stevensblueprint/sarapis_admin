import { useState } from 'react';
import { Button } from 'antd';
import ServiceForm from '../components/forms/ServiceForm';
import Navbar from '../components/Navbar';

const Services = () => {
  const [showServiceModal, setShowServiceModal] = useState<boolean>(false);

  return (
    <div>
      <Navbar />
      <Button onClick={() => setShowServiceModal(true)}>Add Service</Button>
      <ServiceForm
        showModal={showServiceModal}
        closeModal={() => setShowServiceModal(false)}
      />
    </div>
  );
};

export default Services;
