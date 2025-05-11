import { createBrowserRouter } from "react-router-dom";

import LoginContainer from "../pages/auth/LoginContainer";
import { PrivateRoute, PublicRoute } from "./helper";
import { Button, Result } from "antd";
import { useStorageStore } from "../pages/shared/storage.store";
import SettingContainer from "../pages/setting/SettingContainer";

import ForgotPasswordContainer from "../pages/auth/ForgotPasswordContainer";
import OtpVerifyContainer from "../pages/auth/OtpVerifyContainer";
import CongratPage from "../pages/auth/components/Congratulation";
import NewPasswordContainer from "../pages/auth/NewPasswordContainer";
import DashboardContainer from "../pages/dashboard/DashboardContainer";
import UserMonitoringContainer from "../pages/userMonitoring/UserMonitoringContainer";
// import UserManagementContainer from '../pages/userManagement/UserManagementContainer';

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
    path: "/user-monitoring",
    element: <UserMonitoringContainer />,
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
