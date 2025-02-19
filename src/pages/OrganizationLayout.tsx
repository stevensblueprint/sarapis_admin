import { AutoComplete, Button, Dropdown, Space, Layout, Card } from 'antd';

import Navbar from '../components/Navbar';

import { items } from '../data/OrganizationsData';

import {
  DownloadOutlined,
  DownOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import OrganizationDisplayCard from '../components/OrganizationDisplayCard';
import OrganizationTabs from '../components/OrganizationTabs';
import Map from '../components/Map';
const { Content } = Layout;
const OrganizationLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      {/* PLACE HOLDER SEARCH BAR*/}
      <div className="flex flex-row justify-center gap-10 p-5">
        <AutoComplete
          placeholder="Search organizations"
          className="w-1/3 h-12"
        />
        <Button type="primary" className="h-12">
          Search
        </Button>
      </div>

      {/* Share and Download Buttons, added "mr-10" to add space between browser edge and download*/}
      <div className="basis-1/3 flex flex-row justify-end gap-4 mr-10">
        <div className="flex flex-row justify-center items-center gap-2">
          <ShareAltOutlined className="text-[18px]" />
          <p className="text-lg">Share</p>
        </div>
        <div className="flex flex-row justify-center items-center gap-2">
          <DownloadOutlined className="text-[18px]" />
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

      <Layout className="min-h-screen bg-[#fff]">
        <Content className="m-[2rem]">
          <div className="flex gap-[2rem] flex-nowrap">
            {/* Left Column: Organization Display Card */}
            <div className="flex-1 min-w-[350px]">
              <OrganizationDisplayCard />
              <OrganizationTabs />
            </div>
            {/* Right Column: Logo and Map */}
            <div className="flex-1 min-w-[300px]">
              {/* Placeholder for Non-profit Logo */}
              <Card
                bordered
                className="flex-1 shadow-md flex justify-center items-center"
              >
                <div>
                  <img src="https://placehold.co/500x300"></img>
                </div>
              </Card>
              {/* Google Map Embed */}
              <Map />
            </div>
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default OrganizationLayout;
