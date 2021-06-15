import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    KeyConditionExpression: "PK = :PK",
    ExpressionAttributeValues: {
      ":PK": `USER#${event.requestContext.identity.cognitoIdentityId}`
    },
  };

  const results = await dynamoDb.query(params);

  return results.Items;
});