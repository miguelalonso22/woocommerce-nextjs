import Image from "next/image";
import Head from "next/head";
import {SimpleSlider} from "../features/Slider/slider";

import { GetStaticProps } from "next";
import { Inter } from "next/font/google";
import { fetchWooCommerceProducts } from "../utils/wooCommerceApi";
import { Product } from "../utils/wooCommerceTypes";
import { ProductGrid } from "../features";
import { NavLayout } from "../layout";

const inter = Inter({ subsets: ["latin"] });

// declare types for the functional component props //
interface Props {
  products: Product[];
}

export default function Home({ products }: Props) {

  console.log("--WooCommerce Products: ", products);

  return (
    <NavLayout title="Menu" description="Menu page">
      <ProductGrid products={products} />
      <div style={
        {
          position: "relative",
          padding: "50px",
        }
      }>
      <SimpleSlider products={products}/>
      </div>
    </NavLayout>
  );
}
export const getStaticProps: GetStaticProps = async () => {
  const wooCommerceProducts = await fetchWooCommerceProducts().catch((error) =>
    console.error(error)
);

  if (!wooCommerceProducts) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      products: wooCommerceProducts.data,
    },
    revalidate: 60 // regenerate page with new data fetch after 60 seconds
  };
};
