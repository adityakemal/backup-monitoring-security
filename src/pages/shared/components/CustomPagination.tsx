import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Pagination } from 'antd';
import { useIsMobile } from '../../../hooks/useIsMobile';

export default function CustomPagination({
  total,
  onChange,
  align = 'center',
  showSizeChanger,
  showQuickJumper,
  defaultCurrent,
  current,
}: {
  total: number;
  onChange: (val: number) => void;
  align?: 'center' | 'start' | 'end';
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  defaultCurrent?: number;
  current?: any;
}) {
  const isMobile = useIsMobile();
  return (
    <Pagination
      simple={isMobile}
      align={align}
      showSizeChanger={showSizeChanger}
      showQuickJumper={showQuickJumper}
      defaultCurrent={defaultCurrent}
      current={current}
      responsive
      total={total}
      onChange={onChange}
      itemRender={
        isMobile
          ? undefined
          : (_, type, originalElement) => {
              if (type === 'prev') {
                return (
                  <a className="flex  items-center gap-1 text-main">
                    <ArrowLeftOutlined /> Previous
                  </a>
                );
              }
              if (type === 'next') {
                return (
                  <a className="flex items-center gap-1 text-main">
                    Next <ArrowRightOutlined className="ml-2" />
                  </a>
                );
              }
              return originalElement;
            }
      }
    />
  );
}
