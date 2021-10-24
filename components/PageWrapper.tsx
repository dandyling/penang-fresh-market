import { Flex, FlexProps } from "@chakra-ui/react";
import Head from "next/head";
import React, { ReactNode } from "react";
import theme from "../styles/theme";

interface PageWrapperProps extends FlexProps {
  title: string;
  children: ReactNode;
}

export const PageWrapper = (props: PageWrapperProps) => {
  const { title, children } = props;
  return (
    <Flex
      minWidth="100vw"
      minHeight="100vh"
      backgroundColor={theme.colors.background}
      flexDirection="column"
    >
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </Flex>
  );
};
