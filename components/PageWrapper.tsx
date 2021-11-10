import { FlexProps } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Head from "next/head";
import React, { ReactNode } from "react";
import Div100vh from "react-div-100vh";
import theme from "../styles/theme";

interface PageWrapperProps extends FlexProps {
  title: string;
  children: ReactNode;
}

export const PageWrapper = (props: PageWrapperProps) => {
  const { title, children } = props;
  return (
    <FullHeight>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </FullHeight>
  );
};

const FullHeight = styled(Div100vh)`
  display: flex;
  flex-direction: column;
  min-width: 100vw;
  background-color: ${theme.colors.background};
`;
