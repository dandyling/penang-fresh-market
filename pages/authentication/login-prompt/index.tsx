import { AspectRatio, Button, Flex, Heading } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import React from "react";
import { PageWrapper } from "../../../components/PageWrapper";
import theme from "../../../styles/theme";

const LoginPromptPage: NextPage = () => {
  const router = useRouter();
  return (
    <PageWrapper title="Login to Penang Fresh Market">
      <Container>
        <Heading textAlign="center" color={theme.colors.brand} as="h1">
          Penang Fresh Market
        </Heading>
        <AspectRatio ratio={1} width="90%">
          <Image
            src="/Delivery bike.svg"
            alt="Penang Fresh Market"
            layout="fill"
            objectFit="cover"
          />
        </AspectRatio>
        <Button
          size="lg"
          backgroundColor={theme.colors.brand}
          color="white"
          onClick={() => {
            router.push("/authentication/sign-up");
          }}
        >
          Sign Up
        </Button>
        <Button
          backgroundColor="white"
          color={theme.colors.brand}
          size="lg"
          onClick={() => {
            router.push("/authentication/login");
          }}
        >
          Login
        </Button>
      </Container>
    </PageWrapper>
  );
};

const Container = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  padding: 2rem;
  > * {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  button {
    width: 100%;
  }
`;

export default LoginPromptPage;
