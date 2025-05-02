import dayjs from 'dayjs';
import { DatePicker as DatePickerAntd, Input, Modal } from 'antd';
import { useIsMobile } from '../../../hooks/useIsMobile';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useState } from 'react';
import { CalendarOutlined } from '@ant-design/icons';
const { RangePicker } = DatePickerAntd;

interface HeaderFilterCustomProps {
  className?: string;
  handleDateRange: (dates: any) => void;
  dateRangeValue: any;
}

export default function HeaderFilterCustom({
  className,
  dateRangeValue,
  handleDateRange,
}: HeaderFilterCustomProps) {
  const dateFormat = 'DD MMMM YYYY';
  const isMobile = useIsMobile();

  // Preset tanggal untuk desktop
  const rangePresets: any = [
    { label: 'Last 7 Days', value: [dayjs().subtract(7, 'day'), dayjs()] },
    { label: 'Last 14 Days', value: [dayjs().subtract(14, 'day'), dayjs()] },
    { label: 'Last 30 Days', value: [dayjs().subtract(30, 'day'), dayjs()] },
    { label: 'Last 90 Days', value: [dayjs().subtract(90, 'day'), dayjs()] },
  ];

  // Handler untuk Ant Design RangePicker (Desktop)
  const onRangeChange = (dates: any) => {
    if (dates) {
      handleDateRange(dates);
      console.log('====================================');
      console.log(dates);
      console.log('====================================');
    } else {
      handleDateRange([]);
    }
  };

  const [isModalOpenRange, setIsModalOpenRange] = useState(false);
  return (
    <>
      {isMobile ? (
        <div className="flex gap-2">
          <Input
            readOnly
            onClick={() => setIsModalOpenRange(true)}
            className="w-full text-sm text-gray-500 "
            suffix={<CalendarOutlined />}
            size="large"
            value={`${dayjs(dateRangeValue[0]).format(
              'DD MMMM YYYY',
            )} - ${dayjs(dateRangeValue[1]).format('DD MMMM YYYY')}`}
          />
          <Modal
            styles={{
              header: { paddingInline: 16, paddingTop: 16 },
              content: { padding: 0 },
            }}
            centered
            title="Pilih Tanggal"
            footer={null}
            open={isModalOpenRange}
            onCancel={() => setIsModalOpenRange(false)}
          >
            <div className="flex items-center justify-center pb-6">
              <DateRange
                scroll={{ enabled: true, calendarHeight: 230 }}
                ranges={[
                  {
                    startDate: dateRangeValue[0],
                    endDate: dateRangeValue[1],
                    key: 'selection',
                  },
                ]}
                showDateDisplay={false}
                startDatePlaceholder="Tanggal Mulai"
                endDatePlaceholder="Tanggal Akhir"
                months={2}
                onChange={(item) =>
                  onRangeChange([
                    item?.selection?.startDate,
                    item?.selection?.endDate,
                  ])
                }
                direction="vertical"
                maxDate={new Date()}
              />
            </div>
          </Modal>
        </div>
      ) : (
        <RangePicker
          className={`w-full rangepicker-filter ${className}`}
          presets={rangePresets}
          onChange={onRangeChange}
          value={dateRangeValue}
          size="large"
          format={dateFormat}
          disabledDate={(current) => current && current.isAfter(dayjs(), 'day')}
          allowClear={false}
          placement="bottomLeft"
          showNow
        />
      )}
    </>
  );
}
