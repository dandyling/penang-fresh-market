import { AspectRatio, Flex } from "@chakra-ui/react";
import produce from "immer";
import Image from "next/image";
import React, { useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { NumbersPanel } from "../../components/NumbersPanel";
import { API } from "../../pages/_app";
import { ordersState } from "./Order";
import { ProductDescription } from "../product/ProductDescription";
import { PanelButton } from "./ProductOrdersPanel";
import { useNumbersPanel } from "../product/useNumbersPanel";

interface ProductOrderProps {
  index: number;
}

export const ProductOrder = (props: ProductOrderProps) => {
  const [orders, setOrders] = useRecoilState(ordersState);
  const { index } = props;

  const order = orders[index];

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumbersPanel({
      unit: order.attributes.unit,
      defaultValue: order.quantity,
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
            src={`${API}${order.attributes.picture?.data.attributes.formats?.thumbnail.url}`}
            alt={order.attributes.name}
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
          unit={order.attributes.unit}
          getIncrementButtonProps={getIncrementButtonProps}
          getDecrementButtonProps={getDecrementButtonProps}
          getInputProps={getInputProps}
        />
      </Flex>
    </Flex>
  );
};
