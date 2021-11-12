import { Flex, FlexProps, IconButton, Input } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import theme from "../styles/theme";

interface NumbersPanelProps extends FlexProps {
  getDecrementButtonProps(): any;
  getIncrementButtonProps(): any;
  getInputProps(arg: any): any;
}

export const NumbersPanel = (props: NumbersPanelProps) => {
  const {
    getDecrementButtonProps,
    getIncrementButtonProps,
    getInputProps,
    ...rest
  } = props;

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps({ readOnly: true });

  return (
    <Flex {...rest}>
      <Container>
        <IconButton
          {...dec}
          className="numbers-button"
          size="sm"
          aria-label="Decrease"
          icon={<AiOutlineMinus />}
        />
        <Input {...input} />
        <IconButton
          {...inc}
          className="numbers-button"
          size="sm"
          aria-label="Increase"
          icon={<AiOutlinePlus />}
        />
      </Container>
    </Flex>
  );
};

const Container = styled(Flex)`
  align-items: center;
  background-color: ${theme.colors.background};
  color: ${theme.colors.blackAlpha[700]};
  button {
    min-width: 2.25rem;
    min-height: 2.25rem;
    color: white;
    background-color: ${theme.colors.brand};
  }
  button:active {
    background: ${theme.colors.brand};
  }
  button:hover {
    background: ${theme.colors.brand};
  }
  button.numbers-button[disabled] {
    background: ${theme.colors.gray[400]};
  }
  input {
    max-height: 2rem;
    max-width: 4rem;
    padding: 0;
    font-size: ${theme.fontSizes.sm};
    text-align: center;
  }
  input:focus {
    border-style: none;
    box-shadow: none;
  }
`;
