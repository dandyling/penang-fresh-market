import { TabList } from "@chakra-ui/react";
import styled from "@emotion/styled";
import theme from "../styles/theme";

export const TabBar = styled(TabList)`
  border-color: ${theme.colors.white};
  color: ${theme.colors.gray[400]};
  padding-bottom: 0.75rem;
  button[aria-selected="true"] > div {
    color: ${theme.colors.gray[800]};
    border-bottom-width: 4px;
    border-bottom-color: ${theme.colors.brand};
  }
  button:focus {
    box-shadow: none;
  }
  button > div > h3 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    font-size: ${theme.fontSizes.lg};
    font-weight: ${theme.fontWeights.medium};
  }
  button {
    padding: 0;
    padding-right: 4rem;
    border-style: none;
  }
`;
