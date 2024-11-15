import React, { useState } from 'react';
import { Button, Group, Modal, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

interface Service {
  name: string;
  alternateName?: string;
  description?: string;
  status: string;
}

interface Program {
  name: string;
  alternateName?: string;
  services: Service[];
}

interface ProgramFormProps {
  programs: Program[];
  addProgram: (program: Program) => void;
  editProgram: (index: number, updatedProgram: Program) => void;
  deleteProgram: (index: number) => void;
  addService: (programIndex: number, service: Service) => void;
  editService: (programIndex: number, serviceIndex: number, updatedService: Service) => void;
  deleteService: (programIndex: number, serviceIndex: number) => void;
}

const ProgramForm: React.FC<ProgramFormProps> = ({
  programs,
  addProgram,
  editProgram,
  deleteProgram,
  addService,
  editService,
  deleteService,
}) => {
  const [programModalOpen, setProgramModalOpen] = useState(false);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingProgramIndex, setEditingProgramIndex] = useState<number | null>(null);
  const [editingServiceIndex, setEditingServiceIndex] = useState<number | null>(null);

  const form = useForm({
    initialValues: {
      programName: '',
      programAlternateName: '',
      serviceName: '',
      serviceAlternateName: '',
      serviceDescription: '',
      serviceStatus: '',
    },
  });

  const handleProgramSubmit = () => {
    const newProgram: Program = {
      name: form.values.programName,
      alternateName: form.values.programAlternateName,
      services: [],
    };
    if (editingProgramIndex !== null) {
      editProgram(editingProgramIndex, newProgram);
      setEditingProgramIndex(null);
    } else {
      addProgram(newProgram);
    }
    setProgramModalOpen(false);
    form.reset();
  };

  const handleServiceSubmit = () => {
    const newService: Service = {
      name: form.values.serviceName,
      alternateName: form.values.serviceAlternateName,
      description: form.values.serviceDescription,
      status: form.values.serviceStatus,
    };
    if (editingServiceIndex !== null && editingProgramIndex !== null) {
      editService(editingProgramIndex, editingServiceIndex, newService);
      setEditingServiceIndex(null);
    } else if (editingProgramIndex !== null) {
      addService(editingProgramIndex, newService);
    }
    setServiceModalOpen(false);
    form.reset();
  };

  return (
    <div>
      <Button onClick={() => setProgramModalOpen(true)} style={{ marginBottom: '15px' }}>
        Add Program
      </Button>

      {programs.map((program, programIndex) => (
        <div
          key={programIndex}
          style={{
            margin: '20px 0',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '8px',
          }}
        >
          <h3>{program.name}</h3>
          <p>Alternate Name: {program.alternateName || 'N/A'}</p>
          <Group spacing="xs">
            <Button
              onClick={() => {
                setEditingProgramIndex(programIndex);
                setProgramModalOpen(true);
                form.setValues({
                  programName: program.name,
                  programAlternateName: program.alternateName || '',
                });
              }}
            >
              Edit Program
            </Button>
            <Button color="red" onClick={() => deleteProgram(programIndex)}>
              Delete Program
            </Button>
          </Group>

          <Button
            onClick={() => {
              setEditingProgramIndex(programIndex);
              setServiceModalOpen(true);
            }}
            style={{ marginTop: '10px' }}
          >
            Add Service
          </Button>

          {program.services.map((service, serviceIndex) => (
            <div
              key={serviceIndex}
              style={{
                marginTop: '10px',
                padding: '10px',
                border: '1px dashed #aaa',
                borderRadius: '8px',
              }}
            >
              <h4>{service.name}</h4>
              <p>Alternate Name: {service.alternateName || 'N/A'}</p>
              <p>Description: {service.description || 'No description provided'}</p>
              <p>Status: {service.status}</p>
              <Group spacing="xs">
                <Button
                  onClick={() => {
                    setEditingServiceIndex(serviceIndex);
                    setServiceModalOpen(true);
                    form.setValues({
                      serviceName: service.name,
                      serviceAlternateName: service.alternateName || '',
                      serviceDescription: service.description || '',
                      serviceStatus: service.status,
                    });
                  }}
                >
                  Edit Service
                </Button>
                <Button color="red" onClick={() => deleteService(programIndex, serviceIndex)}>
                  Delete Service
                </Button>
              </Group>
            </div>
          ))}
        </div>
      ))}

      {/* Program Modal */}
      <Modal
        opened={programModalOpen}
        onClose={() => {
          setProgramModalOpen(false);
          setEditingProgramIndex(null);
          form.reset();
        }}
        title="Program"
      >
        <TextInput label="Program Name" {...form.getInputProps('programName')} required />
        <TextInput label="Alternate Name" {...form.getInputProps('programAlternateName')} />
        <Button fullWidth mt="md" onClick={handleProgramSubmit}>
          {editingProgramIndex !== null ? 'Update Program' : 'Add Program'}
        </Button>
      </Modal>

      {/* Service Modal */}
      <Modal
        opened={serviceModalOpen}
        onClose={() => {
          setServiceModalOpen(false);
          setEditingServiceIndex(null);
          form.reset();
        }}
        title="Service"
      >
        <TextInput label="Service Name" {...form.getInputProps('serviceName')} required />
        <TextInput label="Alternate Name" {...form.getInputProps('serviceAlternateName')} />
        <Textarea label="Description" {...form.getInputProps('serviceDescription')} />
        <TextInput label="Status" {...form.getInputProps('serviceStatus')} required />
        <Button fullWidth mt="md" onClick={handleServiceSubmit}>
          {editingServiceIndex !== null ? 'Update Service' : 'Add Service'}
        </Button>
      </Modal>
    </div>
  );
};

export default ProgramForm;
