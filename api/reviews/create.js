import * as uuid from "uuid";
import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import findOrCreateMovie from '../content/find_or_create';

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);

  const reviewId = uuid.v4();
  const now = Date.now();
  const { description, rating} = data;

  const content = await findOrCreateMovie(data);

  const params = {
    TableName: process.env.tableName, // change to new table
    Item: {
      // The attributes of the item to be created
      PK: `USER#${event.requestContext.identity.cognitoIdentityId}`,
      SK: `REV#${reviewId}`,
      userId: event.requestContext.identity.cognitoIdentityId,
      reviewId, // A unique uuid
      description, // Parsed from request body
      contentId: content.contentId,
      contentTitle: content.contentTitle,
      rating,
      createdAt: now, // Current Unix timestamp
      updatedAt: now, // Current Unix timestamp
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});