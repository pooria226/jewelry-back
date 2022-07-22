const { goldPrice } = require("./goldPrice");
module.exports.currentPrice = async (id) => {
  const result = await goldPrice();
  if (result?.data?.data.status == 200) {
    const goldPrice = result?.data?.data?.prices?.geram18.current;
    console.log("goldPrice", goldPrice);
    return goldPrice?.slice(0, goldPrice.length - 1);
  }
};
