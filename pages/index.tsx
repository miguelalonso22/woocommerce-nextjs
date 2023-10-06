import Image from "next/image";
import Head from "next/head";
import { GetStaticProps } from "next";
import { Inter } from "next/font/google";
import { fetchWooCommerceProducts } from "../utils/wooCommerceApi";
import { Product } from "../utils/wooCommerceTypes";
import { Order } from "../utils/wooCommerceTypes";
import { createWooCommerceOrder } from "../utils/wooCommerceApi";
import { fetchWooCommerceOrders } from "../utils/wooCommerceApi";
import { ProductGrid } from "../features";
import { NavLayout } from "../layout";

const inter = Inter({ subsets: ["latin"] });

// declare types for the functional component props //
interface Props {
  products: Product[];
  orders: Order[];
}

export default function Home({ products, orders }: Props) {
  // destructure props //
  // const { products } = products;
  // const { orders } = orders;

  const orderData = {
    payment_method: "woo-mercado-pago-basic",
    payment_method_title:
      "Compras con tarjetas guardadas o saldo en Mercado Pago",
    set_paid: false,
    line_items: [
      {
        product_id: 17,
        quantity: 2,
      },
    ],
    meta_data: [
      {
        key: "is_production_mode",
        value: "no",
      },
    ],
  };

  // console.log("--WooCommerce Products: ", products);
  // console.log("--WooCommerce Orders: ", orders);

  function handleClick() {
    console.log("Click happened");

    fetch("/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Order created:", data.order);
      })
      .catch((error) => {
        console.error("Error creating order:", error);
      });
  }

  return (
    <NavLayout title="Menu" description="Menu page">
      <ProductGrid products={products} />
    </NavLayout>
  );
}
export const getStaticProps: GetStaticProps = async () => {
  const wooCommerceProducts = await fetchWooCommerceProducts().catch((error) =>
    console.error(error)
  );
  const wooCommerceOrders = await fetchWooCommerceOrders().catch((error) =>
    console.error(error)
  );

  if (!wooCommerceProducts || !wooCommerceOrders) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      products: wooCommerceProducts.data,
      orders: wooCommerceOrders.data,
    },
    // revalidate: 60 // regenerate page with new data fetch after 60 seconds
  };
};
