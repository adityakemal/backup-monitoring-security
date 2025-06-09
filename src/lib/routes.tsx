import { createBrowserRouter } from "react-router-dom";

import LoginContainer from "../pages/auth/LoginContainer";
import { PrivateRoute, PublicRoute } from "./helper";
import { Button, Result } from "antd";
import { useStorageStore } from "../pages/shared/storage.store";

import ForgotPasswordContainer from "../pages/auth/ForgotPasswordContainer";
import OtpVerifyContainer from "../pages/auth/OtpVerifyContainer";
import CongratPage from "../pages/auth/components/Congratulation";
import NewPasswordContainer from "../pages/auth/NewPasswordContainer";
import DashboardContainer from "../pages/dashboard/DashboardContainer";
import SettingContainer from "../pages/setting/SettingContainer";
import EmployeeContainer from "../pages/employee/EmployeeContainer";
import EmployeeMonitoringContainer from "../pages/employeeMonitoring/EmployeeMonitoringContainer";
import AddEmployeeContainer from "../pages/employee/AddEmployeeContainer";

// New imports for Device and Group
import DeviceContainer from "../pages/device/DeviceContainer";
import AddDeviceContainer from "../pages/device/AddDeviceContainer";
import GroupContainer from "../pages/group/GroupContainer";
import AddGroupContainer from "../pages/group/AddGroupContainer";
import EmployeeAnalyticsContainer from "../pages/employeeAnalytics/EmployeeAnalyticsContainer";

const { role } = useStorageStore.getState();

//access status
// auth  = can access if authenticated
// public = can access if not authenticated
// * = can access if authenticated and not authenticated

const superAdminRoutes = [
  {
    path: "/dashboard",
    element: <DashboardContainer />,
    onlyAccessBy: "auth",
  },
  {
    path: "/employee-monitoring",
    element: <EmployeeMonitoringContainer />,
    onlyAccessBy: "auth",
  },
  {
    path: "/employee-analytics",
    element: <EmployeeAnalyticsContainer />,
    onlyAccessBy: "auth",
  },
  {
    path: "/employee",
    element: <EmployeeContainer />,
    onlyAccessBy: "auth",
  },
  {
    path: "/form-employee",
    element: <AddEmployeeContainer />,
    onlyAccessBy: "auth",
  },
  // New Device routes
  {
    path: "/device",
    element: <DeviceContainer />,
    onlyAccessBy: "auth",
  },
  {
    path: "/form-device",
    element: <AddDeviceContainer />,
    onlyAccessBy: "auth",
  },
  // New Group routes
  {
    path: "/group",
    element: <GroupContainer />,
    onlyAccessBy: "auth",
  },
  {
    path: "/form-group",
    element: <AddGroupContainer />,
    onlyAccessBy: "auth",
  },
];

export const USER_ROLES: any = {
  superadmin: [...superAdminRoutes],
};

const acceptableRoutesByRole = role ? USER_ROLES[role || ""] : [];

const routes = [
  {
    path: "/",
    element: <LoginContainer />,
    onlyAccessBy: "public",
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordContainer />,
    onlyAccessBy: "public",
  },
  {
    path: "/verify-forgot-password/:email",
    element: <OtpVerifyContainer />,
    onlyAccessBy: "public",
  },
  {
    path: "/reset-password/:email/:token",
    element: <NewPasswordContainer />,
    onlyAccessBy: "public",
  },
  {
    path: "/congratulation",
    element: <CongratPage />,
    onlyAccessBy: "public",
  },
  {
    path: "/setting",
    element: <SettingContainer />,
    onlyAccessBy: "auth",
  },
  {
    path: "*",
    element: (
      <div className="w-full h-screen flex items-center justify-center">
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button type="primary" onClick={() => window.history.back()}>
              Back
            </Button>
          }
        />
      </div>
    ),
    onlyAccessBy: "all",
  },

  ...acceptableRoutesByRole,
];

export const acceptablePathList = routes.map((res: any) => res.path);
const redirectLink = acceptableRoutesByRole[0]?.path || "/";

console.log(redirectLink[0]?.path, "redirectlink");

const remap = routes.map((res) => ({
  ...res,
  element:
    res.onlyAccessBy === "auth" ? (
      <PrivateRoute>{res.element}</PrivateRoute>
    ) : res.onlyAccessBy === "public" ? (
      <PublicRoute redirectLink={redirectLink}>{res.element}</PublicRoute>
    ) : (
      res.element
    ),
}));

export default createBrowserRouter(remap);
