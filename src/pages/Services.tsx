import { useEffect, useState } from 'react';
import { getAllServices, getTextSearchServices } from '../api/lib/services';
import type { CascaderProps, AutoCompleteProps, SelectProps } from 'antd';
import { Cascader, Dropdown, Space, AutoComplete, Button, Select } from 'antd';
import {
  ShareAltOutlined,
  DownloadOutlined,
  DownOutlined,
} from '@ant-design/icons';
import {
  Option,
  typesOfServicesOptions,
  sortByOptions,
  resulsPerPageOptions,
  items,
} from '../data/ServicesData';
import ServiceCard from '../components/ServiceCard';
import Map from '../components/Map';
import { Service } from '../interface/model/Service';
import Navbar from '../components/Navbar';
import Response from '../interface/Response';
import EmptyData from '../components/EmptyData';
import ServiceForm from '../components/forms/ServiceForm';
import { SampleServiceData } from '../data/SampleServiceData';

const Services: React.FC = () => {
  const sampleServiceArray: Service[] = [SampleServiceData];
  const [services, setServices] = useState<Service[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [options, setOptions] = useState<AutoCompleteProps['options']>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getAllServices();
        const data = response.data as Response<Service[]>;
        setServices(data.contents);
      } catch (error) {
        console.error(error);
      }
    };
    fetchServices();
  }, []);

  const onChangeTypesOfService: CascaderProps<
    Option,
    'value',
    true
  >['onChange'] = (value) => {
    console.log(value);
    console.log(searchText);
  };

  const onChangeSortBy: SelectProps<Option>['onChange'] = (value) => {
    console.log(value);
  };

  const onChangeResultsPerPage: SelectProps<Option>['onChange'] = (value) => {
    console.log(value);
  };

  const getPanelValue = async (searchText: string) => {
    const response = await getTextSearchServices(searchText);
    setOptions(
      response.data.map((service: Service) => ({ value: service.name }))
    );
  };

  const onSelectSearch = (data: string) => setSearchText(data);

  return (
    <>
      <Navbar />
      <div className="flex flex-row justify-center gap-10 p-5">
        <AutoComplete
          options={options}
          onSelect={onSelectSearch}
          onSearch={(text) => getPanelValue(text)}
          placeholder="Search for Services"
          className="h-12 w-80"
        />
        <AutoComplete
          options={options}
          onSelect={onSelectSearch}
          onSearch={(text) => getPanelValue(text)}
          placeholder="Search for Location"
          className="h-12 w-80"
        />
        <Button type="primary" className="h-12">
          Search
        </Button>
      </div>
      <div className="flex flex-row p-8">
        <div className="basis-1/2 flex flex-row gap-4 justify-start">
          <Cascader
            options={typesOfServicesOptions}
            onChange={onChangeTypesOfService}
            multiple
            placeholder="Types of Services"
            className="h-10"
          />
          <Select
            options={sortByOptions}
            onChange={onChangeSortBy}
            placeholder="Sort By"
            style={{ width: 220 }}
            className="h-10"
          />
          <Select
            options={resulsPerPageOptions}
            onChange={onChangeResultsPerPage}
            placeholder="Results Per Page"
            style={{ width: 160 }}
            className="h-10"
          />
          <ServiceForm />
        </div>
        <div className="basis-1/2 flex flex-row justify-end gap-4">
          <div className="flex flex-row justify-center items-center gap-2">
            <ShareAltOutlined style={{ fontSize: '18px' }} />
            <p className="text-lg">Share</p>
          </div>
          <div className="flex flex-row justify-center items-center gap-2">
            <DownloadOutlined style={{ fontSize: '18px' }} />
            <Dropdown menu={{ items }} trigger={['click']}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <p className="text-lg">Download</p>
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="basis-2/3">
          {services.length > 0 ? (
            services.map((service) => {
              return <ServiceCard key={service.id} service={service} />;
            })
          ) : (
            <EmptyData text="No services found" />
          )}
        </div>
        <div className="basis-1/3 grow-0">
          <Map services={sampleServiceArray} />
        </div>
      </div>
      <div className="flex flex-row justify-start p-10">
        <p>Showing 1 to 10 of 100 entries</p>
      </div>
    </>
  );
};

export default Services;
