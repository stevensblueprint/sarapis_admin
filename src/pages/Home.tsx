import { useEffect } from 'react';
import { useAuthenticatedClient } from '../hooks/useAuthenticatedClient';
import { getAllOrganizations } from '../api/lib/organizations';
import type { CascaderProps } from 'antd';
import { Cascader, Dropdown, Space } from 'antd';
import {
  ShareAltOutlined,
  DownloadOutlined,
  DownOutlined,
} from '@ant-design/icons';
import {
  Option,
  typesOfServicesOptions,
  sortByOptions,
  servicesList,
  resulsPerPageOptions,
  items,
} from '../data/HomeData';
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

  const onChangeTypesOfService: CascaderProps<
    Option,
    'value',
    true
  >['onChange'] = (value) => {
    console.log(value);
  };

  const onChangeSortBy: CascaderProps<Option>['onChange'] = (value) => {
    console.log(value);
  };

  const onChangeResultsPerPage: CascaderProps<Option>['onChange'] = (value) => {
    console.log(value);
  };

  return (
    <>
      <div className="bg-gray-200">
        <div>
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
              {servicesList.map((service) => {
                return <ServiceCard key={service.id} service={service} />;
              })}
            </div>
            <div className="basis-1/3 grow-0">
              <Map />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
