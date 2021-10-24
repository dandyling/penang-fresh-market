import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import {
  AiOutlineHeart,
  AiOutlineLeft,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import useSWR from "swr";
import { BottomPanel } from "../../components/BottomPanel";
import { CircleBadge } from "../../components/CircleBadge";
import { FloatButton } from "../../components/FloatButton";
import { NumbersPanel } from "../../components/NumbersPanel";
import { PageWrapper } from "../../components/PageWrapper";
import { Product } from "../../features/Product";
import { getPrice, getPriceLabel } from "../../features/ProductsPanel";
import theme from "../../styles/theme";
import { API, fetcher } from "../_app";
import { Order } from "./../../features/Order";

const ordersState = atom<Order[]>({
  key: "ordersState",
  default: [],
});

const ordersSubState = selector<number[]>({
  key: "ordersSubState",
  get: ({ get }) => {
    const orders = get(ordersState);
    return orders.map((o) => o.price * o.quantity);
  },
});

const ordersTotalState = selector<number>({
  key: "ordersTotalState",
  get: ({ get }) => {
    const ordersSub = get(ordersSubState);
    return ordersSub.reduce((total, s) => {
      return (total += s);
    }, 0);
  },
});

const ordersCountState = selector<number>({
  key: "ordersCountState",
  get: ({ get }) => {
    const orders = get(ordersState);
    return orders.reduce((total, p) => {
      return (total += p.quantity);
    }, 0);
  },
});

const ProductPage: NextPage = () => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [orders, setOrders] = useRecoilState(ordersState);
  const ordersCount = useRecoilValue(ordersCountState);
  const { id } = router.query;
  const { data: products, error: errorProducts } = useSWR<Product[]>(
    `${API}/products`,
    fetcher
  );

  if (errorProducts) {
    return <Flex>An error has occurred.</Flex>;
  }

  if (!products) {
    return <Flex>Loading...</Flex>;
  }

  const product = products?.find((p) => p.id === Number(id));
  if (!product) {
    return null;
  }

  return (
    <PageWrapper title={`Penang Fresh Market - ${product.name}`}>
      <Flex width="100%" height="100%" position="relative">
        <AspectRatio
          ratio={1.36}
          minWidth="100%"
          shadow="md"
          borderBottomWidth="0.5px"
          borderBottomStyle="solid"
          borderBottomColor="gray.50"
        >
          <Image
            alt={product.name}
            src={`${API}${product.picture.formats.small.url}`}
          />
        </AspectRatio>
        <Flex position="absolute" top="56" width="100%" paddingX="3">
          <Container>
            <Heading as="h2" fontWeight="medium" fontSize="lg">
              {product.name}
            </Heading>
            <Text color="gray.500" fontSize="sm">
              {product.label}
            </Text>
            <Text fontSize="sm">{getPriceLabel(product)}</Text>
            <NumbersPanel
              paddingTop="1"
              value={quantity}
              min={0}
              max={99}
              onIncrement={() => setQuantity(quantity + 1)}
              onDecrement={() => setQuantity(quantity - 1)}
            />
          </Container>
        </Flex>
      </Flex>
      <FloatButton
        icon={<AiOutlineLeft />}
        aria-label="Back"
        position="fixed"
        top="12"
        left="3"
        onClick={router.back}
      />
      <FloatButton
        icon={<AiOutlineHeart />}
        aria-label="Save to Favorites"
        position="fixed"
        top="12"
        right="16"
      />
      <Box position="fixed" top="12" right="3">
        <FloatButton
          icon={<AiOutlineShoppingCart />}
          aria-label="Go to Shopping Cart"
        />
        <CircleBadge
          position="absolute"
          bottom="-1"
          right="-1"
          fontSize="xx-small"
        >
          {ordersCount}
        </CircleBadge>
      </Box>
      <BottomPanel>
        <AddButton
          color={theme.colors.brand}
          borderColor={theme.colors.brand}
          variant="outline"
          width="100%"
          size="lg"
          onClick={() => {
            const order: Order = {
              ...product,
              quantity,
            };
            setOrders([...orders, order]);
          }}
        >
          <Text>{quantity} item</Text>
          <Text className="label">Add to Cart</Text>
          <Text>{getPrice(quantity * product.price)}</Text>
        </AddButton>
        <Button
          rightIcon={<AiOutlineShoppingCart />}
          backgroundColor={theme.colors.brand}
          color="white"
          size="lg"
        >
          Checkout
        </Button>
      </BottomPanel>
    </PageWrapper>
  );
};

const Container = styled(Flex)`
  width: 100%;
  min-height: 6rem;
  background-color: ${theme.colors.white};
  align-items: center;
  text-align: center;
  padding: 1rem;
  flex-direction: column;
  box-shadow: ${theme.shadows.lg};
  border: 1px solid ${theme.colors.gray[100]};
  border-radius: ${theme.radii.lg};
  > * {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
  }
`;

const AddButton = styled(Button)`
  justify-content: space-between;
  background-color: ${theme.colors.white};
  color: ${theme.colors.brand};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.normal};
  .label {
    font-size: ${theme.fontSizes.md};
    font-weight: ${theme.fontWeights.medium};
  }
`;

export default ProductPage;
