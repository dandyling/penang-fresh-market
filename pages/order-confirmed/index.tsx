import { Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { PageWrapper } from "../../components/PageWrapper";
import theme from "../../styles/theme";

const OrderConfirmedPage: NextPage = () => {
  return (
    <PageWrapper title="Your order is confirmed">
      <OuterContainer
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Container
          width="100%"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          textAlign="center"
        >
          <Image src="/Delivery confirmed.svg" alt="Your order is confirmed" />
          <Flex flexDirection="column">
            <Heading mb="1" as="h1" fontSize="2xl" fontWeight="semibold">
              Your order is confirmed!
            </Heading>
            <Text fontSize="sm" color="gray.500">
              We are processing your order, you can expect to receive your
              deliveries tomorrow
            </Text>
          </Flex>
        </Container>
        <Flex
          width="100%"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Link href="/" passHref>
            <Button
              width="100%"
              mb="4"
              color="white"
              backgroundColor={theme.colors.brand}
              size="lg"
            >
              Go to Home
            </Button>
          </Link>
          <Button
            width="100%"
            color={theme.colors.brand}
            variant="outline"
            borderColor={theme.colors.brand}
            size="lg"
          >
            Check order status
          </Button>
        </Flex>
      </OuterContainer>
    </PageWrapper>
  );
};

const Container = styled(Flex)`
  > * {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

const OuterContainer = styled(Flex)`
  padding: 1.5rem 1.5rem;
  > * {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;

export default OrderConfirmedPage;