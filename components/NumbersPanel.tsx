import { Box, Flex, FlexProps, IconButton } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Unit } from "../features/product/useNumbersPanel";
import theme from "../styles/theme";

interface NumbersPanelProps extends FlexProps {
  unit: Unit;
  getDecrementButtonProps(): any;
  getIncrementButtonProps(): any;
  getInputProps(arg: any): any;
}

export const NumbersPanel = (props: NumbersPanelProps) => {
  const {
    unit,
    getDecrementButtonProps,
    getIncrementButtonProps,
    getInputProps,
    ...rest
  } = props;

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps({ readOnly: true });

  const quantity = formatUnit(parseFloat(input.value), unit);
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
        <Box fontSize="sm">{quantity}</Box>
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
  div {
    max-height: 2rem;
    min-width: 4rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-top: 0;
    padding-bottom: 0;
    font-size: ${theme.fontSizes.sm};
    text-align: center;
  }
  input:focus {
    border-style: none;
    box-shadow: none;
  }
`;

export const formatUnit = (value: number, unit: Unit) => {
  if (unit === "gram") {
    return `${value * 1000} g`;
  } else {
    return `${value} ${unit}`;
  }
};
