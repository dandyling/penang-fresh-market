import {
  Button,
  Flex,
  FormControl,
  Grid,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  useToast,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLeft } from "react-icons/ai";
import { useRecoilState, useRecoilValue } from "recoil";
import { BottomPanel } from "../../components/BottomPanel";
import { PageWrapper } from "../../components/PageWrapper";
import { NoOrdersPanel } from "../../features/shopping-cart/NoOrdersPanel";
import {
  ordersState,
  ordersTotalState,
} from "../../features/shopping-cart/Order";
import { ProductOrdersPanel } from "../../features/shopping-cart/ProductOrdersPanel";
import { useProgress } from "../../hooks/useProgress";
import theme from "../../styles/theme";
import { API } from "../_app";

interface DeliveryDetails {
  name: string;
  phoneNumber: string;
  address1: string;
  address2: string;
  notes: string;
}

const ShoppingCartPage: NextPage = () => {
  const router = useRouter();
  const [orders, setOrders] = useRecoilState(ordersState);
  const ordersTotal = useRecoilValue(ordersTotalState);
  const { register, handleSubmit } = useForm();
  const { startProgress } = useProgress();
  const toast = useToast();

  const handleOrder = async (data: DeliveryDetails) => {
    try {
      const response = await fetch(`${API}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            phone_number: data.phoneNumber,
            notes: data.notes,
            status: "new",
            products: orders.map((order) => ({
              code: order.attributes.label,
              name: order.attributes.name,
              quantity: order.quantity,
              unit: order.attributes.unit,
            })),
            name: data.name,
            address_line_1: data.address1,
            address_line_2: data.address2,
          },
        }),
      });
      if (response.ok) {
        router.push("/order-confirmed");
        startProgress();
        setOrders([]);
        localStorage.setItem("orders", "[]");
      } else {
        console.error(await response.json());
        toast({
          title: "Error",
          description: "Unable to complete order",
          status: "error",
          duration: 2000,
          position: "top",
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <PageWrapper title="Penang Fresh Market - Shopping Cart">
      <Flex
        flexDirection="column"
        overflowY="scroll"
        maxHeight="calc(100% - 5.25rem)"
      >
        <Flex minHeight="10" width="100%" backgroundColor="white" />
        <Grid
          gridTemplateColumns="3.25rem 1fr 3.25rem"
          gridAutoRows="auto"
          backgroundColor="white"
          paddingY="2"
        >
          <IconButton
            paddingLeft="3"
            aria-label="Back"
            icon={<AiOutlineLeft />}
            variant="ghost"
            color={theme.colors.brand}
            onClick={router.back}
          />
          <Flex
            height="100%"
            width="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Heading
              as="h1"
              fontSize="2xl"
              fontWeight="medium"
              textAlign="center"
            >
              Checkout
            </Heading>
          </Flex>
        </Grid>
        <Flex paddingX="3" paddingY="3" width="100%">
          <Flex
            backgroundColor="white"
            width="100%"
            borderRadius="lg"
            padding="3"
            flexDirection="column"
          >
            <Heading
              as="h2"
              marginBottom="3"
              fontSize="xl"
              fontWeight="semibold"
            >
              Delivery Details
            </Heading>
            <Container>
              <FormControl isRequired>
                <Input
                  placeholder="Name"
                  {...register("name", { required: true })}
                />
              </FormControl>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftAddon>+60</InputLeftAddon>
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    {...register("phoneNumber", {
                      required: true,
                      minLength: 9,
                    })}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <Input
                  placeholder="Street Address 1"
                  {...register("address1", { required: true })}
                />
              </FormControl>
              <FormControl isRequired>
                <Input
                  placeholder="Street Address 2"
                  {...register("address2", { required: true })}
                />
              </FormControl>
              <FormControl>
                <Input placeholder="Notes" {...register("notes")} />
              </FormControl>
            </Container>
          </Flex>
        </Flex>
        <Flex paddingX="3" paddingY="3" width="100%">
          <Flex
            backgroundColor="white"
            width="100%"
            borderRadius="lg"
            padding="3"
            flexDirection="column"
          >
            <Heading as="h2" fontSize="xl" fontWeight="semibold">
              My Bucket
            </Heading>
            <ProductOrdersPanel />
            {orders.length === 0 && <NoOrdersPanel />}
          </Flex>
        </Flex>
      </Flex>
      <BottomPanel>
        <Button
          backgroundColor={theme.colors.brand}
          color="white"
          size="lg"
          justifyContent="space-between"
          onClick={handleSubmit(handleOrder)}
        >
          <Text fontWeight="500">Place Order</Text>
          <Text fontWeight="normal">RM {ordersTotal.toFixed(2)}</Text>
        </Button>
      </BottomPanel>
    </PageWrapper>
  );
};

const Container = styled(Flex)`
  flex-direction: column;
  > *:not(:last-child) {
    margin-bottom: 0.75rem;
  }
`;

export default ShoppingCartPage;
