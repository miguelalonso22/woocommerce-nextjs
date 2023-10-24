import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { Order } from "./wooCommerceTypes";


// initialise the WooCommerceRestApi //
const api = new WooCommerceRestApi({
  url: "https://www.to2beer.com",
  consumerKey: process.env.WOOCOMMERCE_KEY!,
  consumerSecret: process.env.WOOCOMMERCE_SECRET!,
  version: "wc/v3",
});

export async function fetchWooCommerceProducts() {
  try {
    const response = await api.get("products");
    return response;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function fetchWooCommerceOrders(){
  try {
    const response = await api.get("orders");
    return response;
  } catch (error) {
    throw new Error(error as string);
  }
}

// create new WooCommerce order by passing in required data object //
export async function createWooCommerceOrder(data: Order) {
  try {
    const response = await api.post("orders", data);
    return response;
  } catch (error) {
    throw new Error(error as string);
  }
}

