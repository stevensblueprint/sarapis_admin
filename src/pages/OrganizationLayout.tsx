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
const { Content } = Layout;
const OrganizationLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      {/* PLACE HOLDER SEARCH BAR*/}
      {/* TO DO: Add search bar that links back to "Organizations" page with search query */}
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

      <Layout style={{ minHeight: '100vh', background: '#fff' }}>
        <Content style={{ margin: '2rem' }}>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {/* Left Column: Organization Display Card */}
            <div style={{ flex: '1 1 400px', minWidth: '350px' }}>
              <OrganizationDisplayCard />
              <OrganizationTabs />
            </div>
            <div style={{ flex: '1 1 400px', minHeight: '300px' }}>
              {/* Placeholder for Non-profit Logo */}
              <Card
              bordered
              style={{
                flex: '1 1 400px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                // Used to make content centered
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
                <div>
                <img src ="https://placehold.co/500x300" ></img>
                </div>
              </Card>
              {/* Google Map Embed */}
              <iframe
                title="A Wider Circle Map"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '300px' }}
                src="https://www.google.com/maps/embed/v1/place?q=A+Wider+Circle+9159+Brookville+Rd+Silver+Spring+MD+20910&key=YOUR_API_KEY"
                allowFullScreen
              />
            </div>
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default OrganizationLayout;
