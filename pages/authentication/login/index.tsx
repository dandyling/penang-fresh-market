import {
  AspectRatio,
  Button,
  Flex,
  FormControl,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import Link from "next/link";
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

export interface LoginDetails {
  emailAddress: string;
  password: string;
}

const LoginPage: NextPage = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((value) => !value);
  };

  const handleLogin = async (data: LoginDetails) => {
    try {
      const response = await fetch(`${SERVER}/api/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: data.emailAddress,
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
        title: "Login Error",
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
      <Flex
        flexDirection="column"
        minWidth="100%"
        flex="1"
        justifyContent="space-between"
        alignItems="center"
        padding="8"
      >
        <Form onSubmit={handleSubmit(handleLogin)}>
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
          >
            Login
          </Button>
        </Form>
        <Link href="#" passHref>
          <Text color={theme.colors.brand}>Forgot Password</Text>
        </Link>
      </Flex>
    </PageWrapper>
  );
};

const Form = styled.form`
  display: flex;
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
