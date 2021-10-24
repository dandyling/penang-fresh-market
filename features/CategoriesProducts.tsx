import {
  Flex,
  Heading,
  Tab,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";
import { atom, useRecoilState } from "recoil";
import { Category } from "./Category";
import { Product } from "./Product";
import { ProductsPanel } from "./ProductsPanel";
import { TabBar } from "./TabBar";

interface CategoriesProductsProps {
  categories: Category[];
  products: Product[];
}

const tabState = atom({
  key: "tabState",
  default: 0,
});

export const CategoriesProducts = (props: CategoriesProductsProps) => {
  const { products, categories } = props;
  const [tab, setTab] = useRecoilState(tabState);

  return (
    <Tabs index={tab} onChange={(index) => setTab(index)}>
      <TabBar>
        {categories.map((category: Category) => {
          return (
            <Tab key={category.id}>
              <Flex>
                <Heading as="h3">{category.name}</Heading>
              </Flex>
            </Tab>
          );
        })}
      </TabBar>
      <TabPanels>
        {categories.map((category: Category) => {
          const categoryProducts = products.filter(
            (product) => product.category.id === category.id
          );
          return (
            <TabPanel key={category.id} padding="0">
              <ProductsPanel products={categoryProducts} />
            </TabPanel>
          );
        })}
      </TabPanels>
    </Tabs>
  );
};
