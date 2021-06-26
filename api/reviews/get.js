import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import findContent from "../content/find";

export const main = handler(async (event, context) => {
  const PK = `USER#${event.requestContext.identity.cognitoIdentityId}`;
  const SK = `REV#${event.pathParameters.id}`;

  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    Key: {
      PK, // The id of the author
      SK // The id of the note from the path
    },
  };

  const result = await dynamoDb.get(params);
  const contentInfo = await findContent(result.Item.contentId);

  if (!result.Item) {
    throw new Error("Item not found.");
  }

  // Return the retrieved item
  return {
    review: result.Item,
    content: contentInfo.Item
  };
});