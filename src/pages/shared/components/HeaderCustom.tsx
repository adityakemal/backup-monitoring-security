import { ArrowLeftOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderCustomProps {
  title: string | ReactNode;
  addTitle?: string;
  withBack?: boolean;
  handleAdd?: () => void;
}

export default function HeaderCustom({
  title,
  handleAdd,
  addTitle,
  withBack,
}: HeaderCustomProps) {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="flex justify-between items-center">
      <div className=" flex items-center gap-x-3">
        {withBack && (
          <ArrowLeftOutlined
            className=" cursor-pointer text-xl"
            onClick={handleBack}
          />
        )}

        <p className="text-sm md:text-xl uppercase font-bold space-x-1 flex items-center">
          {title}
        </p>
      </div>

      {addTitle && (
        <Button
          onClick={handleAdd}
          size="large"
          type="primary"
          icon={<PlusCircleOutlined />}>
          {addTitle}
        </Button>
      )}
    </div>
  );
}
