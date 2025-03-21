import {
  AutoComplete,
  AutoCompleteProps,
  Button,
  Cascader,
  CascaderProps,
  Dropdown,
  Space,
  Row,
} from 'antd';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import {
  getAllOrganizations,
  getTextSearchOrganizations,
} from '../api/lib/organizations';
import Organization from '../interface/model/Organization';
import {
  resulsPerPageOptions,
  sortByOptions,
  Option,
  items,
} from '../data/OrganizationsData';
import {
  DownloadOutlined,
  DownOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import Response from '../interface/Response';
import OrganizationCard from '../components/OrganizationCard';
import EmptyData from '../components/EmptyData';
import OrganizationForm from '../components/forms/OrganizationForm';

const Organizations = () => {
  const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await getAllOrganizations();
        const data = response.data as Response<Organization[]>;
        setOrganizations(data.contents);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrganizations();
  }, []);

  const getPanelValue = async (searchText: string) => {
    const response = await getTextSearchOrganizations(searchText);
    setOptions(
      response.data.map((organization: Organization) => ({
        value: organization.name,
      }))
    );
  };

  const onChangeSortBy: CascaderProps<Option>['onChange'] = (value) => {
    console.log(searchText);
    console.log(value);
  };

  const onChangeResultsPerPage: CascaderProps<Option>['onChange'] = (value) => {
    console.log(value);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-row justify-center gap-10 p-5">
        <AutoComplete
          options={options}
          onSelect={(data: string) => setSearchText(data)}
          onSearch={(text) => getPanelValue(text)}
          placeholder="Search organizations"
          className="w-1/3 h-12"
        />
        <Button type="primary" className="h-12">
          Search
        </Button>
      </div>
      <div className="flex flex-row p-8">
        <div className="basis-1/2 flex flex-row gap-4 justify-start">
          <Cascader
            options={sortByOptions}
            onChange={onChangeSortBy}
            placeholder="Sort by"
            className="h-10"
          />
          <Cascader
            options={resulsPerPageOptions}
            onChange={onChangeResultsPerPage}
            placeholder="Results per page"
            className="h-10"
          />
          <OrganizationForm organizations={organizations} />
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
      <div className="flex justify-center">
        <div>
          <Row gutter={[16, 16]} justify="start">
            {organizations.length > 0 ? (
              organizations.map((organization) => (
                <OrganizationCard
                  key={organization.id}
                  organization={organization}
                />
              ))
            ) : (
              <div className="col-span-3">
                <EmptyData text="No Organizations found" />
              </div>
            )}
          </Row>
        </div>
      </div>
    </>
  );
};

export default Organizations;
