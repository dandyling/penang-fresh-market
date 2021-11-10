import { AspectRatio, Flex, GridProps } from "@chakra-ui/react";
import styled from "@emotion/styled";
import produce from "immer";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { FloatButton } from "../components/FloatButton";
import { NumbersPanel } from "../components/NumbersPanel";
import { ordersState } from "../pages/product/[id]";
import { API } from "../pages/_app";
import theme from "../styles/theme";
import { Order } from "./Order";
import { ProductDescription } from "./ProductDescription";
import { Container } from "./ProductsPanel";
import Image from "next/image";

export const ProductOrdersPanel = (props: GridProps) => {
  const [orders, setOrders] = useRecoilState(ordersState);
  const { ...rest } = props;

  const removeOrder = (i: number) => {
    const newOrders = produce(orders, (draft) => {
      draft.splice(i, 1);
    });
    setOrders(newOrders);
    localStorage.setItem("orders", JSON.stringify(newOrders));
  };

  const addOrder = (i: number, quantity: number) => {
    const newOrders = produce(orders, (draft) => {
      const selectedOrder = draft[i];
      selectedOrder.quantity += quantity;
    });
    setOrders(newOrders);
    localStorage.setItem("orders", JSON.stringify(newOrders));
  };

  return (
    <Container
      width="100%"
      gridTemplateColumns="1fr"
      gridAutoRows="auto"
      {...rest}
    >
      {orders.map((order: Order, i) => {
        const handleIncrement = () => {
          addOrder(i, 1);
        };

        const handleDecrement = () => {
          const selectedOrder = orders[i];
          if (selectedOrder.quantity > 1) {
            addOrder(i, -1);
          } else {
            handleRemove();
          }
        };

        const handleRemove = () => {
          const yes = confirm(
            "Do you want to remove this product from the shopping cart?"
          );
          if (yes) {
            removeOrder(i);
          }
        };

        return (
          <Flex key={order.id} className="product">
            <Flex minWidth="20%" mr="4" flexDirection="column">
              <AspectRatio
                borderRadius="lg"
                borderWidth="1px"
                borderColor="gray.200"
                shadow="lg"
                ratio={72 / 82}
                minWidth="100%"
                borderStyle="solid"
                overflow="hidden"
              >
                <Image
                  layout="fill"
                  objectFit="cover"
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
                  onClick={handleRemove}
                />
              </Flex>
              <NumbersPanel
                alignSelf="flex-end"
                paddingTop="2"
                value={order.quantity}
                min={0}
                max={99}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
              />
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
