import {
  Button,
  Flex,
  FormControl,
  Heading,
  IconButton,
  Input,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
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
      <Container>
        <Heading marginBottom="8" color={theme.colors.brand} as="h1">
          Sign Up
        </Heading>
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
            placeholder="Username"
            {...register("username", { required: true })}
          />
        </FormControl>
        <FormControl isRequired>
          <Input
            size="lg"
            placeholder="Password"
            {...register("password", { required: true })}
          />
        </FormControl>
        <FormControl isRequired>
          <Input
            size="lg"
            placeholder="Confirm Password"
            {...register("confirmPassword", { required: true })}
          />
        </FormControl>
        <Button
          size="lg"
          backgroundColor={theme.colors.brand}
          color="white"
          onClick={handleSubmit(handleLogin)}
          marginTop="8"
        >
          Sign Up
        </Button>
      </Container>
    </PageWrapper>
  );
};

const Container = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 100%;
  padding: 2rem;
  flex: 1;
  > * {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  button {
    width: 100%;
  }
`;

export default LoginPage;
