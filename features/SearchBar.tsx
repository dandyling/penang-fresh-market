import {
  Flex,
  FlexProps,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import theme from "../styles/theme";

interface SearchBarProps extends FlexProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
}
export const SearchBar = (props: SearchBarProps) => {
  const { search, setSearch, placeholder, ...rest } = props;
  return (
    <Flex {...rest}>
      <InputGroup size="md">
        <Input
          backgroundColor={theme.colors.brandBackground}
          placeholder={placeholder}
          border="none"
          borderRadius="24"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
        <InputRightElement pointerEvents="none">
          <Icon color={theme.colors.brand} as={AiOutlineSearch} />
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
};
