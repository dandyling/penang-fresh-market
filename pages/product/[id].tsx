import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import {
  AiFillCheckCircle,
  AiOutlineHeart,
  AiOutlineLeft,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { MdAddShoppingCart } from "react-icons/md";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import useSWR from "swr";
import { BottomPanel } from "../../components/BottomPanel";
import { CircleBadge } from "../../components/CircleBadge";
import { FloatButton } from "../../components/FloatButton";
import { NumbersPanel } from "../../components/NumbersPanel";
import { Toast } from "../../components/Toast";
import { PageWrapper } from "../../components/PageWrapper";
import { Product } from "../../features/Product";
import { getPriceLabel } from "../../features/ProductsPanel";
import theme from "../../styles/theme";
import { API, fetcher } from "../_app";
import { Order } from "./../../features/Order";
import { isServer } from "../../utils/utils";
import produce from "immer";
import Image from "next/image";

export const ordersState = atom<Order[]>({
  key: "ordersState",
  default: !isServer ? JSON.parse(localStorage.getItem("orders") ?? "[]") : [],
});

const ordersSubState = selector<number[]>({
  key: "ordersSubState",
  get: ({ get }) => {
    const orders = get(ordersState);
    return orders.map((o) => o.price * o.quantity);
  },
});

export const ordersTotalState = selector<number>({
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
  const toast = useToast();
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

  const addToCart = () => {
    const newOrders = produce(orders, (draft) => {
      const order = draft.find((o) => o.id === product.id);
      if (order) {
        order.quantity += quantity;
      } else {
        const newOrder: Order = {
          ...product,
          quantity,
        };
        draft.push(newOrder);
      }
    });
    setOrders(newOrders);
    localStorage.setItem("orders", JSON.stringify(newOrders));
  };

  const handleAddToCart = () => {
    addToCart();
    toast({
      position: "top",
      duration: 800,
      render: () => (
        <Toast>
          <Text textAlign="center">{quantity} item added to cart</Text>
          <Icon fontSize="xl" ml="2" as={AiFillCheckCircle} />
        </Toast>
      ),
    });
  };

  const handleBuyNow = () => {
    addToCart();
    router.push("/shopping-cart");
  };

  return (
    <PageWrapper title={`Penang Fresh Market - ${product.name}`}>
      <Flex width="100%" height="100%" position="relative">
        <AspectRatio
          position="absolute"
          ratio={1.36}
          minWidth="100%"
          shadow="md"
          borderBottomWidth="0.5px"
          borderBottomStyle="solid"
          borderBottomColor="gray.50"
          top="0"
        >
          <Image
            alt={product.name}
            src={`${API}${product.picture.formats.small.url}`}
            layout="fill"
            objectFit="cover"
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
      <Box
        position="fixed"
        top="12"
        right="3"
        onClick={() => router.push("/shopping-cart")}
      >
        <FloatButton
          icon={<AiOutlineShoppingCart />}
          aria-label="Go to Shopping Cart"
        />
        {ordersCount > 0 && (
          <CircleBadge
            position="absolute"
            bottom="-1"
            right="-1"
            fontSize="xx-small"
          >
            {ordersCount}
          </CircleBadge>
        )}
      </Box>
      <BottomPanel>
        <Flex>
          <IconButton
            size="lg"
            variant="outline"
            aria-label="Add to Cart"
            color={theme.colors.brand}
            borderColor={theme.colors.brand}
            onClick={handleAddToCart}
            icon={<MdAddShoppingCart />}
          />
          <Button
            backgroundColor={theme.colors.brand}
            color="white"
            size="lg"
            onClick={handleBuyNow}
            flex={1}
            marginLeft="3"
          >
            Buy Now
          </Button>
        </Flex>
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

export default ProductPage;
