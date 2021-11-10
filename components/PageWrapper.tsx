import { Flex, FlexProps } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { LinearProgress } from "@material-ui/core";
import Head from "next/head";
import React, { ReactNode } from "react";
import Div100vh from "react-div-100vh";
import { atom, useRecoilValue } from "recoil";
import theme from "../styles/theme";

interface PageWrapperProps extends FlexProps {
  title: string;
  children: ReactNode;
}

export const PageWrapper = (props: PageWrapperProps) => {
  const { title, children } = props;
  const isLoading = useRecoilValue(isLoadingState);
  return (
    <FullHeight>
      {isLoading && <LinearProgress color="secondary" />}
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        position="fixed"
        flexDirection="column"
        top="0"
        left="0"
        width="100%"
        height="100%"
      >
        {children}
      </Flex>
    </FullHeight>
  );
};

const FullHeight = styled(Div100vh)`
  display: flex;
  flex-direction: column;
  min-width: 100vw;
  background-color: ${theme.colors.background};
`;

export const isLoadingState = atom({
  key: "isLoadingState",
  default: false,
});
