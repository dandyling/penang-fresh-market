import { Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";
import theme from "../styles/theme";

export const BottomPanel = styled(Flex)`
  position: fixed;
  flex-direction: column;
  bottom: 0;
  width: 100%;
  background-color: ${theme.colors.white};
  padding: 0.75rem;
  box-shadow: ${theme.shadows.md};
  border: 1px solid ${theme.colors.gray[100]};
  > * {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
  }
`;
