import { Flex, FlexProps, IconButton } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import theme from "../styles/theme";

interface NumbersPanelProps extends FlexProps {
  value: number;
  min: number;
  max: number;
  onIncrement(): void;
  onDecrement(): void;
}

export const NumbersPanel = (props: NumbersPanelProps) => {
  const { value, min, max, onIncrement, onDecrement, ...rest } = props;
  return (
    <Flex {...rest}>
      <Container>
        <IconButton
          className="numbers-button"
          size="sm"
          aria-label="Decrease"
          icon={<AiOutlineMinus />}
          onClick={onDecrement}
          disabled={value <= min}
        />
        <Flex>{value}</Flex>
        <IconButton
          className="numbers-button"
          size="sm"
          aria-label="Increase"
          icon={<AiOutlinePlus />}
          onClick={onIncrement}
          disabled={value >= max}
        />
      </Container>
    </Flex>
  );
};

const Container = styled(Flex)`
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
  div {
    justify-content: center;
    align-items: center;
    min-width: 2rem;
    font-size: ${theme.fontSizes.sm};
  }
`;
