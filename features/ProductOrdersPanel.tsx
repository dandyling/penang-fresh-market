import { AspectRatio, Flex, GridProps, Image } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FloatButton } from "../components/FloatButton";
import { NumbersPanel } from "../components/NumbersPanel";
import { API } from "../pages/_app";
import theme from "../styles/theme";
import { Order } from "./Order";
import { ProductDescription } from "./ProductDescription";
import { Container } from "./ProductsPanel";

interface ProductOrdersPanelProps extends GridProps {
  orders: Order[];
}

export const ProductOrdersPanel = (props: ProductOrdersPanelProps) => {
  const { orders, ...rest } = props;
  return (
    <Container
      width="100%"
      gridTemplateColumns="1fr"
      gridAutoRows="auto"
      {...rest}
    >
      {orders.map((order: Order) => {
        return (
          <Flex key={order.id} className="product">
            <Flex minWidth="20%" mr="4" flexDirection="column">
              <AspectRatio ratio={72 / 82} minWidth="100%">
                <Image
                  borderRadius="lg"
                  shadow="lg"
                  src={`${API}${order.picture?.formats?.thumbnail.url}`}
                  alt={order.name}
                />
              </AspectRatio>
              <Flex flex={1} />
            </Flex>
            <Flex flex={1} flexDirection="column">
              <Flex justifyContent="space-between">
                <ProductDescription paddingY="2" product={order} />
                <PanelButton
                  aria-label="Remove product"
                  icon={<AiOutlineDelete />}
                />
              </Flex>
              {order.quantity && (
                <NumbersPanel
                  alignSelf="flex-end"
                  paddingTop="2"
                  value={order.quantity}
                  min={0}
                  max={99}
                  onIncrement={console.log}
                  onDecrement={console.log}
                />
              )}
            </Flex>
          </Flex>
        );
      })}
    </Container>
  );
};

const PanelButton = styled(FloatButton)`
  box-shadow: ${theme.shadows.lg};
  border: 1px solid ${theme.colors.gray[100]};
`;
