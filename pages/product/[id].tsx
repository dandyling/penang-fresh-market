import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Text,
  useToast,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import produce from "immer";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import React, { useEffect } from "react";
import {
  AiFillCheckCircle,
  AiOutlineHeart,
  AiOutlineLeft,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useRecoilState } from "recoil";
import { BottomPanel } from "../../components/BottomPanel";
import { CircleBadge } from "../../components/CircleBadge";
import { FloatButton } from "../../components/FloatButton";
import { formatUnit, NumbersPanel } from "../../components/NumbersPanel";
import { PageWrapper } from "../../components/PageWrapper";
import { Toast } from "../../components/Toast";
import { Product, ProductResponse } from "../../features/product/Product";
import { getPrice, getPriceLabel } from "../../features/product/ProductsPanel";
import { useNumbersPanel } from "../../features/product/useNumbersPanel";
import { Order, ordersState } from "../../features/shopping-cart/Order";
import { useProgress } from "../../hooks/useProgress";
import theme from "../../styles/theme";
import { IMAGE_HOST, SERVER } from "../_app";

interface ProductPageProps {
  product: Product;
}

const ProductPage = ({ product }: ProductPageProps) => {
  const [orders, setOrders] = useRecoilState(ordersState);
  const router = useRouter();
  const toast = useToast();
  const { startProgress, stopProgress } = useProgress();

  useEffect(() => {
    if (!product) {
      startProgress();
    } else {
      stopProgress();
    }
  }, [product, startProgress, stopProgress]);

  const unit = product?.attributes.unit ?? "kg";
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumbersPanel({ unit });
  const quantity = Number((getInputProps() as any)?.value);

  if (!product) {
    return null;
  }

  const handleNavigateCart = () => {
    startProgress();
    router.push("/shopping-cart");
  };

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

  return (
    <PageWrapper title={`Penang Fresh Market - ${product.attributes.name}`}>
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
            alt={product.attributes.name}
            src={`${IMAGE_HOST}${product.attributes.picture?.data.attributes.formats?.small.url}`}
            layout="fill"
            objectFit="cover"
            priority
          />
        </AspectRatio>
        <Flex position="absolute" top="56" width="100%" paddingX="3">
          <Container>
            <Heading as="h2" fontWeight="medium" fontSize="lg">
              {product.attributes.name}
            </Heading>
            <Text color="gray.500" fontSize="sm">
              {product.attributes.label}
            </Text>
            <Text fontSize="sm">{getPriceLabel(product)}</Text>
            <NumbersPanel
              unit={unit}
              getIncrementButtonProps={getIncrementButtonProps}
              getDecrementButtonProps={getDecrementButtonProps}
              getInputProps={getInputProps}
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
      <Box position="fixed" top="12" right="3" onClick={handleNavigateCart}>
        <FloatButton
          icon={<AiOutlineShoppingCart />}
          aria-label="Go to Shopping Cart"
        />
        {orders.length > 0 && (
          <CircleBadge
            position="absolute"
            bottom="-1"
            right="-1"
            fontSize="xx-small"
          >
            {orders.length}
          </CircleBadge>
        )}
      </Box>
      <BottomPanel>
        <Button
          justifyContent="space-between"
          alignItems="center"
          backgroundColor={theme.colors.brand}
          color="white"
          size="lg"
          onClick={handleAddToCart}
          paddingX="3"
        >
          <Text textAlign="left" flex={1} fontWeight="normal" fontSize="sm">
            {formatUnit(quantity, product.attributes.unit)}
          </Text>
          <Text flex={3} fontWeight="medium">
            Add to Cart
          </Text>
          <Text textAlign="right" flex={1} fontWeight="normal" fontSize="sm">
            {getPrice(quantity * product.attributes.price)}
          </Text>
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

export default ProductPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const resProducts = await fetch(`${SERVER}/api/products?populate=*`);
  const products: ProductResponse = await resProducts.json();
  const paths = products.data.map((p) => ({ params: { id: String(p.id) } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const resProduct = await fetch(
    `${SERVER}/api/products/${params?.id}?populate=*`
  );
  const product = await resProduct.json();
  return {
    props: {
      product: product.data,
    },
  };
};
