import { Flex, Heading } from "@chakra-ui/react";
import type { GetStaticProps } from "next";
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

interface HomeProps {
  categories: Category[];
  products: Product[];
}

const Home = ({ categories, products }: HomeProps) => {
  const [search, setSearch] = useRecoilState(searchState);
  const { startProgress, stopProgress } = useProgress();
  const { data, error } = useSWR<Product[]>(`${API}/products`, fetcher);

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
  if (!data) {
    return null;
  }

  const searchedProducts = data.filter(
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

export const getStaticProps: GetStaticProps = async () => {
  const resCategories = await fetch(`${API}/categories`);
  const categories: Category[] = await resCategories.json();
  const resProducts = await fetch(`${API}/products`);
  const products: Product[] = await resProducts.json();
  const props: HomeProps = {
    categories,
    products,
  };
  return {
    props,
  };
};
