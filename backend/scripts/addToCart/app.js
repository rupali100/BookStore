const AWS = require("aws-sdk");
const config = require("../../aws-config.json");

AWS.config.update({
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
});
const docClient = new AWS.DynamoDB.DocumentClient({ region: "ap-south-1" });
exports.addBookToCart = async (event, context) => {
  console.log("dedew")
  event = { productId: "9", quantity: 1 };
  let response;
  let statusCode;
  let total_items;
  try {
    const requestBody = event;
    const Item = await getBookDetails(requestBody.productId);
    console.log("Item",Item)
    const bookInCart = await createBookInCart(requestBody.productId, Item);
    const cartList = await getCartList();
    const addedItemCount = await getItemCount();
    total_items = { total_items: addedItemCount, line_items: cartList };
    return (response = total_items);
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

async function getBookDetails(productId) {
  console.log("productId", productId)
  const params = {
    TableName: "Books_List",
    Key: {
      id: productId,
    },
  };

  const data = await docClient.get(params).promise();
  return data.Item;
}

async function getItemCount(productId) {
  const params = {
    TableName: "Books_List",
  };

  const data = await docClient.scan(params).promise();
  return data.Items.length;
}

async function createBookInCart(productId, item) {
  const params = {
    TableName: "Book_Cart",
    Key: {
      id: productId,
    },
    UpdateExpression:
      "set   media= :media, #name= :name, price = :price, rating = :rating",
    ExpressionAttributeValues: {
      ":media": item.media,
      ":name": item.name,
      ":price": item.price,
      ":rating": item.rating,
    },
    ExpressionAttributeNames: { "#name": "name" },
    ReturnValues: "ALL_NEW",
  };

  const data = await docClient.update(params).promise();
  return data.Attributes;
}
