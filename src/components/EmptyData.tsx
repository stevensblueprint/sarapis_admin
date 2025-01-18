import { Empty, Typography } from 'antd';

interface EmptyDataProps {
  text: string;
}

const EmptyData = ({ text }: EmptyDataProps) => {
  return (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={<Typography.Text>{text}</Typography.Text>}
    ></Empty>
  );
};

export default EmptyData;
