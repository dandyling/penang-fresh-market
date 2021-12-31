import { Flex, Heading } from "@chakra-ui/react";
import type { GetStaticProps } from "next";
import React, { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import useSWR from "swr";
import { PageWrapper } from "../components/PageWrapper";
import { CategoriesProducts } from "../features/product/CategoriesProducts";
import { CategoryResponse } from "../features/product/Category";
import { IconsPanel } from "../features/product/IconsPanel";
import { ProductResponse } from "../features/product/Product";
import { ProductsPanel } from "../features/product/ProductsPanel";
import { SearchBar } from "../features/product/SearchBar";
import { useProgress } from "../hooks/useProgress";
import { API, fetcher } from "./_app";

const searchState = atom({
  key: "searchState",
  default: "",
});

interface HomeProps {
  categories: CategoryResponse;
  products: ProductResponse;
}

const Home = ({ categories, products }: HomeProps) => {
  const [search, setSearch] = useRecoilState(searchState);
  const { startProgress, stopProgress } = useProgress();
  const { data: productData, error } = useSWR<ProductResponse>(
    `${API}/api/products?populate=*`,
    fetcher
  );

  useEffect(() => {
    if (!products || !categories) {
      startProgress();
    } else {
      stopProgress();
    }
  }, [products, categories, startProgress, stopProgress]);

  if (error) {
    return <Flex>An error has occurred.</Flex>;
  }
  const data = productData?.data ?? [];
  if (!data) {
    return null;
  }

  const searchedProducts = data.filter(
    (product) =>
      product.attributes.name.toLowerCase().includes(search.toLowerCase()) ||
      product.attributes.category.data.attributes.name
        .toLowerCase()
        .includes(search.toLowerCase())
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
            products={products.data ?? []}
            categories={categories.data ?? []}
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

export const getStaticProps: GetStaticProps = async () => {
  const resCategories = await fetch(`${API}/api/categories?populate=*`);
  const categories: CategoryResponse = await resCategories.json();
  const resProducts = await fetch(`${API}/api/products?populate=*`);
  const products: ProductResponse = await resProducts.json();
  const props: HomeProps = {
    categories,
    products,
  };
  return {
    props,
  };
};
