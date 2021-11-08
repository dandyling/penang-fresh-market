import {
  Button,
  Flex,
  Grid,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { useRecoilValue } from "recoil";
import { BottomPanel } from "../../components/BottomPanel";
import { PageWrapper } from "../../components/PageWrapper";
import { NoOrdersPanel } from "../../features/NoOrdersPanel";
import { ProductOrdersPanel } from "../../features/ProductOrdersPanel";
import theme from "../../styles/theme";
import { ordersState } from "../product/[id]";

const ShoppingCartPage: NextPage = () => {
  const router = useRouter();
  const orders = useRecoilValue(ordersState);
  return (
    <PageWrapper title="Penang Fresh Market - Shopping Cart">
      <Flex
        flexDirection="column"
        overflowY="scroll"
        maxHeight="calc(100vh - 5.25rem)"
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
              <Input placeholder="Name"></Input>
              <InputGroup>
                <InputLeftAddon>+60</InputLeftAddon>
                <Input type="tel" placeholder="Phone Number" />
              </InputGroup>
              <Input placeholder="Street Address 1"></Input>
              <Input placeholder="Street Address 2"></Input>
              <Input placeholder="Notes"></Input>
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
        <Link href="/order-confirmed" passHref>
          <Button backgroundColor={theme.colors.brand} color="white" size="lg">
            Place Order
          </Button>
        </Link>
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
