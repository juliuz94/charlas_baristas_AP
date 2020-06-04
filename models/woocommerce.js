const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const woocommerce = new WooCommerceRestApi({
  url: "https://www.cafeamorperfecto.com",
  consumerKey: "ck_fd34be9f5745faf54062c49f44414f3cce6c7044",
  consumerSecret: 'cs_3afac13f39577ae7a38f70773b12e64719702d9c',
  version: "wc/v3"
});

module.exports = woocommerce;