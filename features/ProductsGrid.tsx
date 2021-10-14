import {
  AspectRatio,
  Flex,
  Grid,
  Heading,
  Image,
  Tab,
  Tabs,
  Text,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import { categories } from "../stubs/Category";
import { products } from "../stubs/Product";
import theme from "../styles/theme";
import { TabBar } from "./TabBar";

export const ProductsGrid = () => {
  return (
    <Flex width="100%" flexDirection="column">
      <Tabs>
        <TabBar>
          {categories.map((category) => {
            return (
              <Tab key={category.id}>
                <Flex>{category.name}</Flex>
              </Tab>
            );
          })}
        </TabBar>
      </Tabs>
      <Container width="100%" gridTemplateColumns="1fr" gridAutoRows="auto">
        {products.map((product) => {
          return (
            <Flex as="button" className="product" key={product.id}>
              <AspectRatio mr="4" ratio={72 / 82} width="20%">
                <Image
                  borderRadius="lg"
                  shadow="lg"
                  src={product.imageUrl}
                  alt={product.name}
                />
              </AspectRatio>
              <Flex padding="2" flexDirection="column">
                <Heading as="h3" fontSize="md" fontWeight="medium">
                  {product.name}
                </Heading>
                <Text fontSize="sm">{product.description}</Text>
                <Text fontSize="sm">{`RM ${product.price.toFixed(2)} per ${
                  product.unit
                }`}</Text>
              </Flex>
            </Flex>
          );
        })}
      </Container>
    </Flex>
  );
};

const Container = styled(Grid)`
  .product {
    padding-top: ${theme.space[3]};
    padding-bottom: ${theme.space[3]};
  }
  button {
    text-align: left;
  }
  img {
    border: 1px solid ${theme.colors.gray[200]};
  }
`;
