import * as uuid from "uuid";
import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);

  const reviewId = uuid.v1();
  const now = Date.now();
  const { description, contentType, contentTitle, rating} = data;

  const params = {
    TableName: process.env.tableName, // change to new table
    Item: {
      // The attributes of the item to be created
      PK: `USER#${event.requestContext.identity.cognitoIdentityId}`,
      SK: `REV#${reviewId}`,
      userId: event.requestContext.identity.cognitoIdentityId,
      reviewId, // A unique uuid
      description, // Parsed from request body
      contentType,
      contentTitle,
      rating,
      // movieId: data.movieId, // Parsed from request body
      createdAt: now, // Current Unix timestamp
      updatedAt: now, // Current Unix timestamp
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});