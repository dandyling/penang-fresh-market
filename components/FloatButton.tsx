import { IconButton } from "@chakra-ui/react";
import styled from "@emotion/styled";
import theme from "../styles/theme";

export const FloatButton = styled(IconButton)`
  border-radius: 50%;
  box-shadow: ${theme.shadows["dark-lg"]};
  background-color: ${theme.colors.white};
  color: ${theme.colors.brand};
`;
