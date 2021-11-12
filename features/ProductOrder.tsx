import { AspectRatio, Flex, useNumberInput } from "@chakra-ui/react";
import produce from "immer";
import Image from "next/image";
import React, { useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { NumbersPanel } from "../components/NumbersPanel";
import { ordersState } from "../pages/product/[id]";
import { API } from "../pages/_app";
import { ProductDescription } from "./ProductDescription";
import { PanelButton } from "./ProductOrdersPanel";

interface ProductOrderProps {
  index: number;
}

export const ProductOrder = (props: ProductOrderProps) => {
  const [orders, setOrders] = useRecoilState(ordersState);
  const { index } = props;

  const order = orders[index];

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: order.quantity,
      min: 1,
      max: 99,
      precision: 0,
    });
  const quantity = Number((getInputProps() as any).value);

  useEffect(() => {
    const newOrders = produce(orders, (draft) => {
      const selectedOrder = draft[index];
      selectedOrder.quantity = quantity;
    });
    setOrders(newOrders);
    localStorage.setItem("orders", JSON.stringify(newOrders));
  }, [index, orders, setOrders, quantity]);

  const removeOrder = (index: number) => {
    const newOrders = produce(orders, (draft) => {
      draft.splice(index, 1);
    });
    setOrders(newOrders);
    localStorage.setItem("orders", JSON.stringify(newOrders));
  };

  const handleRemove = () => {
    const yes = confirm(
      "Do you want to remove this product from the shopping cart?"
    );
    if (yes) {
      removeOrder(index);
    }
  };

  return (
    <Flex className="product">
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
          getIncrementButtonProps={getIncrementButtonProps}
          getDecrementButtonProps={getDecrementButtonProps}
          getInputProps={getInputProps}
        />
      </Flex>
    </Flex>
  );
};