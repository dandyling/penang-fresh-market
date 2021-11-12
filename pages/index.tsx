import { Flex, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import React, { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import useSWR from "swr";
import { PageWrapper } from "../components/PageWrapper";
import { CategoriesProducts } from "../features/product/CategoriesProducts";
import { Category } from "../features/product/Category";
import { IconsPanel } from "../features/product/IconsPanel";
import { Product } from "../features/product/Product";
import { ProductsPanel } from "../features/product/ProductsPanel";
import { SearchBar } from "../features/product/SearchBar";
import { useProgress } from "../hooks/useProgress";
import { API, fetcher } from "./_app";

const searchState = atom({
  key: "searchState",
  default: "",
});

const Home: NextPage = () => {
  const [search, setSearch] = useRecoilState(searchState);
  const { startProgress, stopProgress } = useProgress();
  const { data: categories, error: errorCategories } = useSWR<Category[]>(
    `${API}/categories`,
    fetcher
  );
  const { data: products, error: errorProducts } = useSWR<Product[]>(
    `${API}/products`,
    fetcher
  );

  useEffect(() => {
    if (!products || !categories) {
      startProgress();
    } else {
      stopProgress();
    }
  }, [products, categories, startProgress, stopProgress]);

  if (errorProducts || errorCategories) {
    return <Flex>An error has occurred.</Flex>;
  }
  if (!products || !categories) {
    return null;
  }
  const searchedProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageWrapper title="Penang Fresh Market">
      <Flex as="header" direction="column" width="100%" paddingY="3">
        <SearchBar
          padding="3"
          search={search}
          setSearch={setSearch}
          placeholder="Search Penang Fresh Market here"
        />
        <IconsPanel />
      </Flex>
      <Flex
        as="main"
        padding="3"
        flexDirection="column"
        backgroundColor="white"
        shadow="lg"
        borderRadius="2xl"
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
