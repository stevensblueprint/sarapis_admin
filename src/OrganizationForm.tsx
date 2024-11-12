
import React from 'react';
import { Center, TextInput, Textarea, Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';

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
      email: (value) => (/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) || !value ? null : 'Invalid email'),
      url: (value) => (/^(http|https):\/\/[^ "]+$/.test(value) || !value ? null : 'Invalid URL'),
    },
  });

  return (
    <Center style={{ height: '100vh' }}>
      <form
        onSubmit={form.onSubmit((values) => console.log(values))}
        style={{
          width: '100%',
          maxWidth: '500px',  // Limits form width to 500px
          padding: '20px',    // Optional padding around form
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',  // Optional shadow for styling
          borderRadius: '8px',  // Rounded corners
        }}
      >
        <TextInput label="Name" placeholder="Organization Name" {...form.getInputProps('name')} required />
        <TextInput label="Alternate Name" placeholder="Alternate Name" {...form.getInputProps('alternate_name')} />
        <Textarea label="Description" placeholder="Brief summary" {...form.getInputProps('description')} required />
        <TextInput label="Email" placeholder="Contact Email" {...form.getInputProps('email')} />
        <TextInput label="URL" placeholder="Website URL" {...form.getInputProps('url')} />
        <TextInput label="Tax Status" placeholder="Tax Designation" {...form.getInputProps('tax_status')} />
        <TextInput label="Tax ID" placeholder="Tax ID" {...form.getInputProps('tax_id')} />
        <TextInput label="Year Incorporated" placeholder="YYYY" {...form.getInputProps('year_incorporated')} />
        <TextInput label="Legal Status" placeholder="Legal Status" {...form.getInputProps('legal_status')} />

        <Group mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Center>
  );
}

export default OrganizationForm;