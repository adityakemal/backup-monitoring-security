import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/main.css";
import { RouterProvider } from "react-router-dom";
import routes from "./lib/routes";
import { ConfigProvider } from "antd";
import dayjs from "dayjs";
// import idID from "antd/locale/id_ID";
import theme from "./lib/theme";
import Provider from "./lib/provider";

dayjs.locale("id");
const objMainColor: any = {
  "--main-color": theme.mainColor,
  "--main-bg": theme.mainBg,
  "--main-border": theme.mainBorder,
};
if (window.location.hostname !== "localhost") {
  console.log = () => {};
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider
      // locale={idID}
      theme={{
        token: {
          colorPrimary: theme.mainColor,
          colorText: "#031602",
        },
        components: {
          Button: {
            // colorPrimaryBgHover: "transparent",
            // colorPrimaryBorder: theme.mainColor,
            // colorPrimaryBg: "inherit",
            // colorPrimaryActive: theme.mainColor,
            // // primaryHoverBg: `${theme.mainColor}50`,
            // // primaryHoverBorderColor: theme.mainColor,
            // // primaryActiveBorderColor: theme.mainColor,
            // // primaryColor: "#031602",
            // colorPrimaryBgHover: "red",
            // colorPrimaryBg: "red",
            primaryShadow: "none",
            // colorPrimaryTextActive: "black",
            fontSizeLG: 14,
            paddingBlockLG: 1,
          },
          DatePicker: {
            inputFontSize: 12,
          },
          // Input: {
          //   paddingBlock: 8.7,
          //   inputFontSize: 16,
          // },
          // Pagination: {
          //   itemActiveBg: theme.mainColor,
          //   itemActiveColorDisabled: "white",
          //   itemLinkBg: "red",
          // },
          Form: {
            verticalLabelPadding: "0 0 2px",
          },
          Tabs: {
            // itemColor: theme.mainColor,
            // itemColor: "white",
            titleFontSize: 16,
          },
          Menu: {
            /* here is your component tokens */
            itemSelectedBg: theme.mainBg,
            itemHoverColor: theme.mainColor,
            itemColor: "#a0a0a0",
            subMenuItemBg: "#ffffff10",
            itemSelectedColor: theme.mainColor,
            // groupTitleColor: "red",
            // darkItemSelectedColor: "red",
            // colorSubItemBg: "red",

            // itemHoverBg: theme.mainColoLight,
            // itemActiveBg: "#EFFBFF",
            // itemHoverColor: "#000000",
            // collapsedIconSize: 24,
            // iconSize: 18,
            fontSize: 13,
            iconSize: 14,
            // itemMarginBlock: 24,
            // itemPaddingInline: 150,
            // inlineIndent: "0",
          },
          // Badge: {
          //   indicatorHeightSM: 14,
          //   textFontSizeSM: 10,
          //   /* here is your component tokens */
          // },
          Pagination: {
            /* here is your component tokens */
            itemActiveBg: theme.mainColor + 10,
            itemSize: 40,
          },
        },
      }}>
      <div style={objMainColor}>
        <Provider>
          <RouterProvider router={routes} />
        </Provider>
      </div>
    </ConfigProvider>
  </React.StrictMode>
);
