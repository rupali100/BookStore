const AWS = require("aws-sdk");
const config = require("../../aws-config.json");

AWS.config.update({
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
});
const docClient = new AWS.DynamoDB.DocumentClient({ region: "ap-south-1" });
exports.getBookDetails = async (event, context) => {
  let response;
  let statusCode;
  try {
    statusCode = 200;
    const Item = await listBook();
    response = { data: Item };
    console.log(response);
    return response;
  } catch (error) {
    return { error: error };
  }
};
async function listBook() {
  const params = {
    TableName: "Books_List",
  };

  const data = await docClient.scan(params).promise();
  return data.Items;
}
