import { GridProps } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import { useRecoilValue } from "recoil";
import { FloatButton } from "../../components/FloatButton";
import theme from "../../styles/theme";
import { Order, ordersState } from "./Order";
import { ProductOrder } from "./ProductOrder";
import { Container } from "../product/ProductsPanel";

export const ProductOrdersPanel = (props: GridProps) => {
  const orders = useRecoilValue(ordersState);
  const { ...rest } = props;

  return (
    <Container
      width="100%"
      gridTemplateColumns="1fr"
      gridAutoRows="auto"
      {...rest}
    >
      {orders.map((order: Order, i) => {
        return <ProductOrder key={order.id} index={i} />;
      })}
    </Container>
  );
};

export const PanelButton = styled(FloatButton)`
  box-shadow: ${theme.shadows.lg};
  border: 1px solid ${theme.colors.gray[100]};
`;
