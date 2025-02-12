import { Card } from 'antd';
import {
  HomeOutlined,
  DollarOutlined,
  BookOutlined,
  ShoppingOutlined,
  CoffeeOutlined,
  CarOutlined,
  MedicineBoxOutlined,
  BankOutlined,
  AlertOutlined,
  HeartOutlined,
  IdcardOutlined,
} from '@ant-design/icons';

const categories = [
  { title: 'Care', icon: <HeartOutlined className="text-5xl" /> },
  { title: 'Emergency', icon: <AlertOutlined className="text-5xl" /> },
  { title: 'Goods', icon: <ShoppingOutlined className="text-5xl" /> },
  { title: 'Housing', icon: <HomeOutlined className="text-5xl" /> },
  { title: 'Money', icon: <DollarOutlined className="text-5xl" /> },
  { title: 'Work', icon: <IdcardOutlined className="text-5xl" /> },
  { title: 'Education', icon: <BookOutlined className="text-5xl" /> },
  { title: 'Food', icon: <CoffeeOutlined className="text-5xl" /> },
  { title: 'Health', icon: <MedicineBoxOutlined className="text-5xl" /> },
  { title: 'Legal', icon: <BankOutlined className="text-5xl" /> },
  { title: 'Transit', icon: <CarOutlined className="text-5xl" /> },
];

const full_rows = 5 * Math.floor(categories.length / 5);

const Home = () => {
  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-6xl font-semibold mb-6">Browse by Category</h2>
      <div className="grid grid-cols-5 gap-6">
        {categories.slice(0, full_rows).map((category, index) => (
          <Card key={index} className="w-40 h-40 flex-col text-center">
            <div className="flex justify-center items-center">
              {category.icon}
            </div>
            <p className="text-lg font-medium mt-2">{category.title}</p>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-auto gap-6 mt-6">
        {categories.slice(full_rows).map((category, index) => (
          <Card key={index} className="w-40 h-40 flex-col text-center">
            <div className="flex justify-center items-center">
              {category.icon}
            </div>
            <p className="text-lg font-medium mt-2">{category.title}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
