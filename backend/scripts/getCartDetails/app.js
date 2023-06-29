const AWS = require("aws-sdk");
const config = require("../../aws-config.json");

AWS.config.update({
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
});
const docClient = new AWS.DynamoDB.DocumentClient({ region: "ap-south-1" });
exports.getCartDetails = async (event, context) => {
  let response;
  let statusCode;
  try {
    statusCode = 200;
    const addedItemCount = await getItemCount();
    const cartList = await getCartList();
    let totalValue = 0;
    for (let i = 0; i > cartList.length; i++) {
      totalValue = totalValue + cartList[i].price;
    }
    response = {
      total_items: addedItemCount,
      line_items: cartList,
      totalValue: totalValue,
    };
    console.log(response);
    return response;
  } catch (error) {
    return { error: error };
  }
};

async function getCartList() {
  const params = {
    TableName: "Book_Cart",
  };
  const data = await docClient.scan(params).promise();
  return data.Items;
}

async function getItemCount(productId) {
  const params = {
    TableName: "Book_Cart",
  };

  const data = await docClient.scan(params).promise();
  return data.Items.length;
}
