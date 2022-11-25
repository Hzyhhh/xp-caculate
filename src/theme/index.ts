import { extendTheme } from "native-base";

const theme = extendTheme({
  components: {
    Heading: {
      baseStyle: (props: any) => {
        return {
          _light: { color: "red.300" },
          _dark: { color: "blue.300" },
        };
      },
    },
  },
});

export default theme;
