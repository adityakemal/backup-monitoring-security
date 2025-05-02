import { Navigate } from "react-router-dom";
import { useStorageStore } from "../pages/shared/storage.store";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

const { auth, token } = useStorageStore.getState();

export const PublicRoute = ({ children, redirectLink }: any) => {
  if (auth && token) return <Navigate to={redirectLink} />;
  return children;
};

export const PrivateRoute = ({ children }: any) => {
  if (!auth && !token) return <Navigate to="/" />;
  return children;
};

export const rupiahFormat = (value: any) => {
  if (value == 0) {
    return `Rp 0`;
  }

  return (
    value &&
    new Intl.NumberFormat("id-ID", {
      style: "currency", // add Rp
      currency: "IDR",
      // maximumSignificantDigits: 30
      minimumFractionDigits: 0, //remove ,00
    }).format(value)
  );
};

export const numberFormat = (value: any) =>
  value &&
  new Intl.NumberFormat("id-ID", {
    // style: '', // add Rp
    currency: "IDR",
    // maximumSignificantDigits: 30
    minimumFractionDigits: 0, // remove 2 digit after comma
  }).format(value);

export const cn = (...inputs: any) => {
  return twMerge(clsx(inputs));
};
