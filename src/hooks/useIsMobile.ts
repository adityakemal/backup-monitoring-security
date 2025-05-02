import { Grid } from "antd";
const { useBreakpoint } = Grid;

export const useIsMobile = () => {
  const { xs: isMobile } = useBreakpoint();

  return isMobile;
};
