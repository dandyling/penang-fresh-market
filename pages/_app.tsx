import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import "../styles/globals.css";
import theme from "../styles/theme";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const SERVER = process.env.SERVER;
export const IMAGE_HOST = process.env.IMAGE_HOST;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </RecoilRoot>
  );
}
export default MyApp;
