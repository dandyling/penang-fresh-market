import { Flex, FlexProps } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import theme from "./../styles/theme";

export interface ToastProps extends FlexProps {
  children: ReactNode;
}

export const Toast = ({ children }: ToastProps) => {
  return (
    <Flex
      borderRadius="lg"
      shadow="dark-lg"
      backgroundColor={theme.colors.brand}
      color="white"
      opacity={0.9}
      p={3}
      justifyContent="center"
      alignItems="center"
    >
      {children}
    </Flex>
  );
};
