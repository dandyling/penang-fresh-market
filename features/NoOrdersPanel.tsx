import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { AiTwotoneShopping } from "react-icons/ai";
import theme from "../styles/theme";

export const NoOrdersPanel = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <Container>
      <Flex flexDirection="column">
        <Text>Oops, your shopping cart is empty!</Text>
        <Text>Browse our fresh products catalogue now</Text>
      </Flex>
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        onClick={handleClick}
      >
        <Icon
          as={AiTwotoneShopping}
          color={theme.colors.brand}
          height="4em"
          width="4em"
          marginY="2"
        />
        <Button
          variant="outline"
          color={theme.colors.brand}
          borderColor={theme.colors.brand}
          maxWidth="auto"
        >
          <Text>Go shopping now</Text>
        </Button>
      </Flex>
    </Container>
  );
};

const Container = styled(Flex)`
  text-align: center;
  flex-direction: column;
  align-items: center;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;
