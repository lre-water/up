import { createTheme as createMuiTheme } from "@mui/material/styles";
import variants from "./variants";
import typography from "./typography";
import overrides from "./overrides";
import breakpoints from "./breakpoints";
import props from "./props";
import shadows from "./shadows";

const createTheme = (name) => {
  let themeConfig = variants.find((variant) => variant.name === name);

  if (!name) {
    themeConfig = variants[0];
  }

  if (!themeConfig) {
    console.warn(new Error(`The theme ${name} is not valid`));
    themeConfig = variants[0];
  }

  return createMuiTheme(
    {
      spacing: 4,
      breakpoints: breakpoints,
      components: overrides,
      props: props,
      typography: typography,
      shadows: shadows,
      palette: themeConfig.palette,
    },
    {
      name: themeConfig.name,
      header: themeConfig.header,
      footer: themeConfig.footer,
      sidebar: themeConfig.sidebar,
      scrollbar: themeConfig.scrollbar,
    }
  );
};

export default createTheme;
