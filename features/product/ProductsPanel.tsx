import { AspectRatio, Flex, Grid, GridProps } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import React from "react";
import { useSetRecoilState } from "recoil";
import { isLoadingState } from "../../components/PageWrapper";
import { IMAGE_HOST } from "../../pages/_app";
import theme from "../../styles/theme";
import { Product } from "./Product";
import { ProductDescription } from "./ProductDescription";

interface ProductsPanelProps extends GridProps {
  products: Product[];
}

export const ProductsPanel = (props: ProductsPanelProps) => {
  const { products, ...rest } = props;
  const router = useRouter();
  const setIsLoading = useSetRecoilState(isLoadingState);
  return (
    <Container
      width="100%"
      gridTemplateColumns="1fr"
      gridAutoRows="auto"
      {...rest}
    >
      {products.map((product: Product) => {
        const handleClick = () => {
          setIsLoading(true);
          router.push(`product/${product.id}`);
        };

        return (
          <Flex
            key={product.id}
            as="button"
            className="product"
            onClick={handleClick}
          >
            <AspectRatio
              mr="4"
              ratio={72 / 82}
              minWidth="20%"
              borderWidth="1px"
              borderColor="gray.200"
              borderRadius="lg"
              shadow="lg"
              overflow="hidden"
            >
              <Image
                src={`${IMAGE_HOST}${product.attributes.picture?.data.attributes.formats?.thumbnail.url}`}
                alt={product.attributes.name}
                objectFit="cover"
                layout="fill"
              />
            </AspectRatio>
            <Flex padding="2" flex={1} flexDirection="column">
              <ProductDescription product={product} />
            </Flex>
          </Flex>
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
`;

export const getPriceLabel = (product: Product) => {
  return (
    product.attributes.price_label ??
    getPricePerUnit(product.attributes.price, product.attributes.unit)
  );
};

export const getPricePerUnit = (price: number, unit: string) => {
  return `${getPrice(price)} per ${unit}`;
};

export const getPrice = (price: number) => {
  return `RM ${price.toFixed(2)}`;
};
