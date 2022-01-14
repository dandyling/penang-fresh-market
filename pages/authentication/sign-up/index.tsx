import {
  Button,
  Flex,
  FormControl,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { PageWrapper } from "../../../components/PageWrapper";
import theme from "../../../styles/theme";
import { SERVER } from "../../_app";
import { LoginDetails } from "../login";

interface UserDetails extends LoginDetails {
  username: string;
}

const LoginPage: NextPage = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((value) => !value);
  };

  const handleLogin = async (data: UserDetails) => {
    try {
      const response = await fetch(`${SERVER}/api/auth/local/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          email: data.emailAddress,
          password: data.password,
        }),
      });

      const json = await response.json();
      if (response.ok) {
        localStorage.setItem("penang-fresh", json.jwt);
        router.push("/");
      } else {
        throw new Error(json.error.message);
      }
    } catch (e: any) {
      toast({
        position: "top",
        duration: 800,
        title: "Sign Up Error",
        description: e.message,
        status: "error",
      });
    }
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
      <Form onSubmit={handleSubmit(handleLogin)}>
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
          <InputGroup size="lg">
            <Input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
            />
            <InputRightElement>
              <IconButton
                aria-label={showPassword ? "Hide Password" : "Show Password"}
                icon={showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                variant="ghost"
                color={theme.colors.gray}
                size="lg"
                fontSize="2xl"
                onClick={toggleShowPassword}
                mr="2"
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          type="submit"
          value="submit"
          size="lg"
          backgroundColor={theme.colors.brand}
          color="white"
          marginTop="8"
        >
          Sign Up
        </Button>
      </Form>
    </PageWrapper>
  );
};

const Form = styled.form`
  display: flex;
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
