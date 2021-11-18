import {
  AspectRatio,
  Button,
  Flex,
  FormControl,
  Heading,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { AiOutlineArrowLeft, AiOutlineLeft } from "react-icons/ai";
import { PageWrapper } from "../../../components/PageWrapper";
import theme from "../../../styles/theme";

const LoginPage: NextPage = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const handleLogin = () => {
    console.log();
  };

  return (
    <PageWrapper title="Login">
      <Flex width="100%" paddingTop="12" paddingX="3">
        <IconButton
          aria-label="Back"
          icon={<AiOutlineArrowLeft />}
          variant="ghost"
          color={theme.colors.brand}
          size="lg"
          fontSize="2xl"
          onClick={router.back}
        />
      </Flex>
      <Flex
        flexDirection="column"
        minWidth="100%"
        flex="1"
        justifyContent="space-between"
        alignItems="center"
        padding="8"
      >
        <Container>
          <Heading color={theme.colors.brand} as="h1">
            Login
          </Heading>
          <AspectRatio ratio={1} width="60%">
            <Image
              src="/Delivery bike.svg"
              alt="Penang Fresh Market"
              layout="fill"
              objectFit="cover"
            />
          </AspectRatio>
          <FormControl isRequired>
            <Input
              size="lg"
              placeholder="Email Address"
              {...register("emailAddress", { required: true })}
            />
          </FormControl>
          <FormControl isRequired>
            <Input
              size="lg"
              placeholder="Password"
              {...register("password", { required: true })}
            />
          </FormControl>
          <Button
            size="lg"
            backgroundColor={theme.colors.brand}
            color="white"
            onClick={handleSubmit(handleLogin)}
          >
            Login
          </Button>
        </Container>
        <Link href="#" passHref>
          <Text color={theme.colors.brand}>Forgot Password</Text>
        </Link>
      </Flex>
    </PageWrapper>
  );
};

const Container = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 100%;
  > * {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  button {
    width: 100%;
  }
`;

export default LoginPage;
