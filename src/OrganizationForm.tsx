import React, { useState } from 'react';
import { Button, Center, Group, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import ProgramForm from './ProgramForm';

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

function OrganizationForm() {
  const form = useForm({
    initialValues: {
      name: '',
      alternate_name: '',
      description: '',
      email: '',
      url: '',
      tax_status: '',
      tax_id: '',
      year_incorporated: '',
      legal_status: '',
    },

    validate: {
      name: (value) => (value ? null : 'Name is required'),
      description: (value) => (value ? null : 'Description is required'),
      email: (value) =>
        /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) || !value ? null : 'Invalid email',
      url: (value) => (/^(http|https):\/\/[^ "]+$/.test(value) || !value ? null : 'Invalid URL'),
    },
  });

  const [programs, setPrograms] = useState<Program[]>([]);

  const addProgram = (program: Program) => {
    setPrograms((prev) => [...prev, { ...program, services: [] }]);
  };

  const editProgram = (index: number, updatedProgram: Program) => {
    setPrograms((prev) => {
      const updated = [...prev];
      updated[index] = updatedProgram;
      return updated;
    });
  };

  const deleteProgram = (index: number) => {
    setPrograms((prev) => prev.filter((_, i) => i !== index));
  };

  const addService = (programIndex: number, service: Service) => {
    setPrograms((prev) => {
      const updated = [...prev];
      updated[programIndex].services.push(service);
      return updated;
    });
  };

  const editService = (programIndex: number, serviceIndex: number, updatedService: Service) => {
    setPrograms((prev) => {
      const updated = [...prev];
      updated[programIndex].services[serviceIndex] = updatedService;
      return updated;
    });
  };

  const deleteService = (programIndex: number, serviceIndex: number) => {
    setPrograms((prev) => {
      const updated = [...prev];
      updated[programIndex].services = updated[programIndex].services.filter(
        (_, i) => i !== serviceIndex
      );
      return updated;
    });
  };

  const handleSubmit = (values: typeof form.values) => {
    const completeData = {
      organization: values,
      programs,
    };
    //test data
    console.log(completeData);
  };

  return (
    <Center style={{ height: '100vh', overflowY: 'auto' }}>
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        style={{
          width: '100%',
          maxWidth: '600px',
          padding: '20px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          overflowY: 'auto',
          maxHeight: '90vh',
        }}
      >
        <TextInput
          label="Name"
          placeholder="Organization Name"
          {...form.getInputProps('name')}
          required
        />
        <TextInput
          label="Alternate Name"
          placeholder="Alternate Name"
          {...form.getInputProps('alternate_name')}
        />
        <Textarea
          label="Description"
          placeholder="Brief summary"
          {...form.getInputProps('description')}
          required
        />
        <TextInput label="Email" placeholder="Contact Email" {...form.getInputProps('email')} />
        <TextInput label="URL" placeholder="Website URL" {...form.getInputProps('url')} />
        <TextInput
          label="Tax Status"
          placeholder="Tax Designation"
          {...form.getInputProps('tax_status')}
        />
        <TextInput label="Tax ID" placeholder="Tax ID" {...form.getInputProps('tax_id')} />
        <TextInput
          label="Year Incorporated"
          placeholder="YYYY"
          {...form.getInputProps('year_incorporated')}
        />
        <TextInput
          label="Legal Status"
          placeholder="Legal Status"
          {...form.getInputProps('legal_status')}
        />

        <div style={{ marginTop: '20px' }}>
          <ProgramForm
            programs={programs}
            addProgram={addProgram}
            editProgram={editProgram}
            deleteProgram={deleteProgram}
            addService={addService}
            editService={editService}
            deleteService={deleteService}
          />
        </div>

        <Group mt="md">
          <Button type="submit" style={{ marginTop: '20px' }}>
            Submit
          </Button>
        </Group>
      </form>
    </Center>
  );
}

export default OrganizationForm;
