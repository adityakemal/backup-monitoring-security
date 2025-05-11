import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import routes from "./lib/routes";
import AntdProvider from "./lib/AntdProvider";
import Provider from "./lib/provider";
import dayjs from "dayjs";
import { useStorageStore } from "./pages/shared/storage.store";
dayjs.locale("id");
import "./styles/main.css";
import colors from "./lib/colors";

if (window.location.hostname !== "localhost") {
  console.log = () => {};
}

const objMainColor: any = {
  // Primary Colors
  "--color-primary": colors.primary.main,
  "--color-primary-light": colors.primary.light,
  "--color-primary-dark": colors.primary.dark,
  "--color-primary-contrast": colors.primary.contrast,

  // Secondary Colors
  "--color-secondary": colors.secondary.main,
  "--color-secondary-light": colors.secondary.light,
  "--color-secondary-dark": colors.secondary.dark,
  "--color-secondary-contrast": colors.secondary.contrast,

  // Background Colors
  "--color-background": colors.background.default,
  "--color-background-paper": colors.background.paper,
  "--color-background-dark": colors.background.dark,

  // Text Colors
  "--color-text-primary": colors.text.primary,
  "--color-text-secondary": colors.text.secondary,
  "--color-text-disabled": colors.text.disabled,
  "--color-text-dark-primary": colors.text.dark.primary,
  "--color-text-dark-secondary": colors.text.dark.secondary,
  "--color-text-dark-disabled": colors.text.dark.disabled,

  // Border Colors
  "--color-border": colors.border.main,
  "--color-border-light": colors.border.light,
  "--color-border-dark": colors.border.dark,

  // Semantic Colors
  "--color-success": colors.success.main,
  "--color-warning": colors.warning.main,
  "--color-error": colors.error.main,
  "--color-info": colors.info.main,

  // Action Colors
  "--color-action-hover": colors.action.hover,
  "--color-action-selected": colors.action.selected,
  "--color-action-disabled": colors.action.disabled,
  "--color-action-disabled-bg": colors.action.disabledBackground,
  "--color-action-focus": colors.action.focus,
};

// Create a wrapper component to handle dark mode
function App() {
  const { mode } = useStorageStore();

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (mode === "dark") {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }, [mode]);

  return (
    <AntdProvider>
      <div style={objMainColor}>
        <Provider>
          <RouterProvider router={routes} />
        </Provider>
      </div>
    </AntdProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
