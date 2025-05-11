import { ConfigProvider, theme as antdTheme } from "antd";
import { ReactNode } from "react";

import colors from "./colors";
import { useStorageStore } from "../pages/shared/storage.store";
import "../styles/main.css";

export default function AntdProvider({ children }: { children: ReactNode }) {
  const { mode } = useStorageStore();

  return (
    <ConfigProvider
      key={mode} // <-- Add this line!
      theme={{
        algorithm:
          mode === "dark"
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
        token: {
          // Primary Colors
          colorPrimary: colors.primary.main,
          colorPrimaryHover: colors.primary.light,
          colorPrimaryActive: colors.primary.dark,
          colorPrimaryBg: colors.primary.main + "10",
          colorPrimaryBgHover: colors.primary.main + "20",
          colorPrimaryBorder: colors.primary.main,
          colorPrimaryBorderHover: colors.primary.light,

          // Text Colors
          colorText:
            mode === "dark" ? colors.text.dark.primary : colors.text.primary,
          colorTextSecondary:
            mode === "dark"
              ? colors.text.dark.secondary
              : colors.text.secondary,
          colorTextDisabled:
            mode === "dark" ? colors.text.dark.disabled : colors.text.disabled,

          // Background Colors
          colorBgBase:
            mode === "dark"
              ? colors.background.dark
              : colors.background.default,
          colorBgContainer:
            mode === "dark" ? colors.background.paper : colors.background.paper,
          colorBgElevated:
            mode === "dark" ? colors.neutral[800] : colors.neutral[50],
          colorBgLayout:
            mode === "dark"
              ? colors.background.dark
              : colors.background.default,

          // Border Colors
          colorBorder:
            mode === "dark" ? colors.border.dark : colors.border.main,
          colorBorderSecondary:
            mode === "dark" ? colors.border.dark : colors.border.light,

          // Action Colors
          //   colorAction: colors.action.hover,
          //   colorActionHover: colors.action.selected,
          //   colorActionActive: colors.action.focus,
          //   colorActionDisabled: colors.action.disabled,
          //   colorActionDisabledBg: colors.action.disabledBackground,
        },
        components: {
          Button: {
            fontSizeLG: 14,
            paddingBlockLG: 1,
            colorPrimaryBg: colors.primary.main,
            colorPrimaryBgHover: colors.primary.light,
            colorPrimaryBorder: colors.primary.main,
            colorPrimaryBorderHover: colors.primary.light,
            colorPrimaryHover: colors.primary.light,
            colorPrimaryActive: colors.primary.dark,
            colorPrimaryTextActive: colors.primary.contrast,
          },
          DatePicker: {
            // inputFontSize: 12,
            // colorBgContainer:
            //   mode === "dark" ? colors.neutral[800] : colors.background.paper,
            // colorText:
            //   mode === "dark" ? colors.text.dark.primary : colors.text.primary,
            // colorTextPlaceholder:
            //   mode === "dark"
            //     ? colors.text.dark.secondary
            //     : colors.text.secondary,
            // colorBorder:
            //   mode === "dark" ? colors.border.dark : colors.border.main,
            // colorBgElevated:
            //   mode === "dark" ? colors.neutral[900] : colors.background.paper,
            // colorIcon:
            //   mode === "dark" ? colors.text.dark.primary : colors.text.primary,
            // colorIconHover:
            //   mode === "dark" ? colors.primary.light : colors.primary.main,
            // colorPrimary: colors.primary.main,
            // colorPrimaryHover: colors.primary.light,
            // colorPrimaryActive: colors.primary.dark,
            // colorTextDisabled:
            //   mode === "dark"
            //     ? colors.text.dark.disabled
            //     : colors.text.disabled,
            // colorBgContainerDisabled:
            //   mode === "dark" ? colors.neutral[900] : colors.neutral[100],
          },
          Form: {
            verticalLabelPadding: "0 0 2px",
          },
          Tabs: {
            titleFontSize: 16,
            itemSelectedColor: colors.primary.main,
            itemHoverColor: colors.primary.light,
            itemActiveColor: colors.primary.dark,
          },
          Menu: {
            itemSelectedBg:
              mode === "dark"
                ? colors.primary.main + "80"
                : colors.primary.main + "20",
            itemHoverColor:
              mode === "dark" ? colors.primary.light : colors.primary.main,
            itemColor:
              mode === "dark" ? colors.text.dark.primary : colors.text.primary,
            itemSelectedColor:
              mode === "dark" ? colors.primary.light : colors.primary.main,
            fontSize: 13,
            iconSize: 14,
          },
          Pagination: {
            itemActiveBg: colors.primary.main + "10",
            itemSize: 40,
            itemActiveColorDisabled: colors.text.disabled,
          },
          Input: {
            colorBgContainer:
              mode === "dark" ? colors.neutral[800] : colors.background.paper,
            colorBorder:
              mode === "dark" ? colors.border.dark : colors.border.main,
            colorText:
              mode === "dark" ? colors.text.dark.primary : colors.text.primary,
            colorTextPlaceholder:
              mode === "dark"
                ? colors.text.dark.secondary
                : colors.text.secondary,
            borderRadius: 8,
            paddingBlock: 8,
            paddingInline: 12,
            fontSize: 14,
            colorBgContainerDisabled:
              mode === "dark" ? colors.neutral[900] : colors.neutral[100],
            colorTextDisabled:
              mode === "dark"
                ? colors.text.dark.disabled
                : colors.text.disabled,
          },
          InputNumber: {
            colorBgContainer:
              mode === "dark" ? colors.neutral[800] : colors.background.paper,
            colorBorder:
              mode === "dark" ? colors.border.dark : colors.border.main,
            colorText:
              mode === "dark" ? colors.text.dark.primary : colors.text.primary,
            colorTextPlaceholder:
              mode === "dark"
                ? colors.text.dark.secondary
                : colors.text.secondary,
            borderRadius: 8,
            paddingBlock: 8,
            paddingInline: 12,
            fontSize: 14,
            colorBgContainerDisabled:
              mode === "dark" ? colors.neutral[900] : colors.neutral[100],
            colorTextDisabled:
              mode === "dark"
                ? colors.text.dark.disabled
                : colors.text.disabled,
          },
          Select: {
            colorBgContainer:
              mode === "dark" ? colors.neutral[800] : colors.background.paper,
            colorBorder:
              mode === "dark" ? colors.border.dark : colors.border.main,
            colorText:
              mode === "dark" ? colors.text.dark.primary : colors.text.primary,
            colorTextPlaceholder:
              mode === "dark"
                ? colors.text.dark.secondary
                : colors.text.secondary,
            borderRadius: 8,
            fontSize: 14,
            colorBgContainerDisabled:
              mode === "dark" ? colors.neutral[900] : colors.neutral[100],
            colorTextDisabled:
              mode === "dark"
                ? colors.text.dark.disabled
                : colors.text.disabled,
          },
          // Add more component customizations as needed
        },
      }}>
      {children}
    </ConfigProvider>
  );
}
