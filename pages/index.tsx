import { Flex, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import React from "react";
import { atom, useRecoilState } from "recoil";
import useSWR from "swr";
import { PageWrapper } from "../components/PageWrapper";
import { CategoriesProducts } from "../features/CategoriesProducts";
import { Category } from "../features/Category";
import { IconsPanel } from "../features/IconsPanel";
import { Product } from "../features/Product";
import { ProductsPanel } from "../features/ProductsPanel";
import { SearchBar } from "../features/SearchBar";
import { API, fetcher } from "./_app";

const searchState = atom({
  key: "searchState",
  default: "",
});

const Home: NextPage = () => {
  const [search, setSearch] = useRecoilState(searchState);
  const { data: categories, error: errorCategories } = useSWR<Category[]>(
    `${API}/categories`,
    fetcher
  );
  const { data: products, error: errorProducts } = useSWR<Product[]>(
    `${API}/products`,
    fetcher
  );
  if (errorProducts || errorCategories) {
    return <Flex>An error has occurred.</Flex>;
  }
  if (!products || !categories) {
    return <Flex>Loading...</Flex>;
  }
  const searchedProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <PageWrapper title="Penang Fresh Market">
      <Flex as="header" direction="column" width="100%" paddingTop="6">
        <SearchBar padding="3" search={search} setSearch={setSearch} />
        <IconsPanel />
      </Flex>
      <Flex
        as="main"
        padding="3"
        flexDirection="column"
        backgroundColor="white"
        flex={1}
      >
        {search === "" && (
          <CategoriesProducts
            products={products ?? []}
            categories={categories ?? []}
          />
        )}
        {search !== "" && (
          <Flex direction="column">
            <Heading pt="2" as="h3" fontSize="lg" fontWeight="semibold">
              Search Results
            </Heading>
            <ProductsPanel products={searchedProducts ?? []} />
          </Flex>
        )}
      </Flex>
    </PageWrapper>
  );
};

export default Home;
