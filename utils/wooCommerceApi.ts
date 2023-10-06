import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { Order } from "./wooCommerceTypes";


// initialise the WooCommerceRestApi //
const api = new WooCommerceRestApi({
  url: "https://www.to2beer.com",
  consumerKey: "ck_f2dbce08ed28533fcc5d0141b857329c0ce80b5d",
  consumerSecret: "cs_c0c91ffd21b5aca389f61e0434568f35d12bcd03",
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

