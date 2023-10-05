import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

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