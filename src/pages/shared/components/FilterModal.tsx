import { Button, Form, Modal } from 'antd';
import { MdFilterList } from 'react-icons/md';
import FormGenerator from './FormGenerator';

interface FilterModalProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  handleOk: () => void;
  data: any;
}

const FilterModal = (props: FilterModalProps) => {
  const [hookFormGenerator] = Form.useForm();
  return (
    <>
      <Button type="default" onClick={props.onOpen}>
        <MdFilterList />
        <p>Filter</p>
      </Button>
      <Modal
        title="Filter"
        open={props.open}
        onOk={props.handleOk}
        onCancel={props.onClose}
      >
        <FormGenerator
          id="dynamicForm"
          hookForm={hookFormGenerator}
          onFinish={props.handleOk}
          layout="vertical"
          size="default"
          data={props.data}
        />
      </Modal>
    </>
  );
};
export default FilterModal;
