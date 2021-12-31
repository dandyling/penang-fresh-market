import { Flex, FlexProps, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Product } from "./Product";
import { getPriceLabel } from "./ProductsPanel";

interface ProductDescriptionProps extends FlexProps {
  product: Product;
}

export const ProductDescription = ({
  product,
  ...rest
}: ProductDescriptionProps) => {
  return (
    <Flex flexDirection="column" {...rest}>
      <Heading as="h3" fontSize="md" fontWeight="medium">
        {product.attributes.name}
      </Heading>
      <Text fontSize="sm" color="gray.500">
        {product.attributes.label}
      </Text>
      <Text fontSize="sm">{getPriceLabel(product)}</Text>
    </Flex>
  );
};
