import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

const historyStack: string[] = [];

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const current = location.pathname;
    const last = historyStack[historyStack.length - 1];

    if (current !== last) {
      historyStack.push(current);
    }
  }, [location.pathname]);

  const handleBack = () => {
    if (historyStack.length <= 1) {
      navigate('/');
    } else {
      historyStack.pop();
      const prev = historyStack.pop();
      navigate(prev || '/');
    }
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
    >
      <ArrowLeftOutlined className="text-lg" />
      <span>Back</span>
    </button>
  );
};

export default BackButton;
