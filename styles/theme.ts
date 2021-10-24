import { theme as ChakraTheme } from "@chakra-ui/react";

const theme = {
  ...ChakraTheme,
  colors: {
    ...ChakraTheme.colors,
    brand: "hsl(359, 77%, 60%)",
    brandBackground: "hsl(359, 77%, 95%)",
    background: "#F8F5F2",
  },
};

export default theme;
