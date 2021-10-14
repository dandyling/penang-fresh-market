import { Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { IconsPanel } from "../features/IconsPanel";
import { ProductsGrid } from "../features/ProductsGrid";
import theme from "../styles/theme";

const Home: NextPage = () => {
  return (
    <Flex
      minWidth="100vw"
      minHeight="100vh"
      backgroundColor={theme.colors.background}
      flexDirection="column"
    >
      <Head>
        <title>Penang Fresh Market</title>
        <meta name="description" content="Penang Fresh Market" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <IconsPanel />
      <Flex
        as="main"
        padding="3"
        flexDirection="column"
        backgroundColor="white"
      >
        <ProductsGrid />
      </Flex>
    </Flex>
  );
};

export default Home;
