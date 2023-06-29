const AWS = require("aws-sdk");
const config = require("../../aws-config.json");

AWS.config.update({
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
});
const docClient = new AWS.DynamoDB.DocumentClient({ region: "ap-south-1" });
exports.removeFromCart = async (event, context) => {
  let response;
  let statusCode;
  try {
    statusCode = 200;
    const requestBody = event;
    const Item = await deleteBookFromList(requestBody.lineItemId);
    const updatedList = await getUpdatedList();
    response = { data: updatedList };
    console.log(response);
    return response;
  } catch (error) {
    return { error: error };
  }
};

async function getUpdatedList() {
  const params = {
    TableName: "Book_Cart",
  };
  const data = await docClient.scan(params).promise();
  return data.Items;
}
async function deleteBookFromList(lineItemId) {
  const params = {
    TableName: "Book_Cart",
    Key: {
      id: lineItemId,
    },
  };
  await docClient.delete(params).promise();
  return "Item with id : " + lineItemId + "is deleted";
}
