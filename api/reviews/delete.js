import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    Key: {
      PK: `USER#${event.requestContext.identity.cognitoIdentityId}`,
      SK: event.pathParameters.id
    }
  };

  await dynamoDb.delete(params);
  return { status: true };
});