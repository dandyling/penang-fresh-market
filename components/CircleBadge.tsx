import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";
import theme from "../styles/theme";

export const CircleBadge = styled(Box)`
  background-color: ${theme.colors.brand};
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1rem;
  height: 1rem;
  width: 1rem;
  box-shadow: ${theme.shadows["dark-lg"]};
`;
