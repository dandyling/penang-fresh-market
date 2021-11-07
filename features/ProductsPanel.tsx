import { AspectRatio, Flex, Grid, GridProps, Image } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";
import { API } from "../pages/_app";
import theme from "../styles/theme";
import { Product } from "./Product";
import { ProductDescription } from "./ProductDescription";

interface ProductsPanelProps extends GridProps {
  products: Product[];
}

export const ProductsPanel = (props: ProductsPanelProps) => {
  const { products, ...rest } = props;
  return (
    <Container
      width="100%"
      gridTemplateColumns="1fr"
      gridAutoRows="auto"
      {...rest}
    >
      {products.map((product: Product) => {
        return (
          <Link key={product.id} href={`product/${product.id}`} passHref>
            <Flex as="button" className="product">
              <AspectRatio mr="4" ratio={72 / 82} minWidth="20%">
                <Image
                  borderRadius="lg"
                  shadow="lg"
                  src={`${API}${product.picture?.formats?.thumbnail.url}`}
                  alt={product.name}
                />
              </AspectRatio>
              <Flex padding="2" flex={1} flexDirection="column">
                <ProductDescription product={product} />
              </Flex>
            </Flex>
          </Link>
        );
      })}
    </Container>
  );
};

export const Container = styled(Grid)`
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

export const getPriceLabel = (product: Product) => {
  return product.price_label ?? getPricePerUnit(product.price, product.unit);
};

export const getPricePerUnit = (price: number, unit: string) => {
  return `${getPrice(price)} per ${unit}`;
};

export const getPrice = (price: number) => {
  return `RM ${price.toFixed(2)}`;
};
