interface ThemeConfigState {
  themeColor: string;
  locale: string;
  root: string;
}

const themeConfig: ThemeConfigState = {
  themeColor: "primary",
  locale: "en",
  root: "/",
};

export default themeConfig;
