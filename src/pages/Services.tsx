import { useEffect, useState } from 'react';
import { useAuthenticatedClient } from '../hooks/useAuthenticatedClient';
import { getAllServices, getTextSearchServices } from '../api/lib/services';
import type { CascaderProps, AutoCompleteProps } from 'antd';
import { Cascader, Dropdown, Space, AutoComplete, Button } from 'antd';
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
} from '../data/HomeData';
import ServiceCard from '../components/ServiceCard';
import Map from '../components/Map';
import { Service } from '../interface/model/Service';
import Navbar from '../components/Navbar';
import Response from '../interface/Response';

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
  const client = useAuthenticatedClient();

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await getAllServices(client);
        const data = response.data as Response<Service[]>;
        setServices((prev) => [...prev, ...data.contents]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrganizations();
  }, [client]);

  const onChangeTypesOfService: CascaderProps<
    Option,
    'value',
    true
  >['onChange'] = (value) => {
    console.log(value);
    console.log(searchText);
  };

  const onChangeSortBy: CascaderProps<Option>['onChange'] = (value) => {
    console.log(value);
  };

  const onChangeResultsPerPage: CascaderProps<Option>['onChange'] = (value) => {
    console.log(value);
  };

  const getPanelValue = async (searchText: string) => {
    const response = await getTextSearchServices(client, searchText);
    setOptions(
      response.data.map((service: Service) => ({ value: service.name }))
    );
  };

  const onSelectSearch = (data: string) => setSearchText(data);

  return (
    <>
      <Navbar />
      <div className="flex flex-row justify-evenly gap-10 p-5">
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
          />
          <Cascader
            options={sortByOptions}
            onChange={onChangeSortBy}
            placeholder="Sort By"
            className="h-10"
          />
          <Cascader
            options={resulsPerPageOptions}
            onChange={onChangeResultsPerPage}
            placeholder="Results Per Page"
            className="h-10"
          />
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
          {services.map((service) => {
            return <ServiceCard key={service.id} service={service} />;
          })}
        </div>
        <div className="basis-1/3 grow-0">
          <Map />
        </div>
      </div>
      <div className="flex flex-row justify-start p-10">
        <p>Showing 1 to 10 of 100 entries</p>
      </div>
    </>
  );
};

export default Services;
