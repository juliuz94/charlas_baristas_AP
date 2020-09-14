const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const woocommerce = new WooCommerceRestApi({
  url: "https://cafeamorperfecto.com/",
  consumerKey: "ck_9fe77857a7fbe8be87f51e28605267982f3c60b7",
  consumerSecret: 'cs_9814c80a24810f947ad1e4eae3cb44828b53474b',
  version: "wc/v3"
});

module.exports = woocommerce;