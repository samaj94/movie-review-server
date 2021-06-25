import dynamoDb from "../../libs/dynamodb-lib";
import * as uuid from "uuid";

export default async function findOrCreateMovie({
  contentTitle,
  contentType,
  imdbId,
  poster
}) {
  const PK = 'ART#1';
  const data = `CONT#${contentTitle}`;

  const search = {
    TableName: process.env.tableName,
    IndexName: 'sort-by-data',
    KeyConditionExpression: '#PK = :PK and begins_with(#data, :data)',
    ExpressionAttributeNames: {
      '#PK': 'PK',
      '#data': 'data'
    },
    ExpressionAttributeValues: {
      ':PK': PK,
      ':data': data
    }
  };

  const result = await dynamoDb.query(search);

  if (result.Items.length > 0) {
    console.log('FOUND', result);
    return result.Items[0];
  }

  const contentId = uuid.v4();
  const SK = `CONT#${contentId}`;
  const now = Date.now();

  const params = {
    TableName: process.env.tableName,
    Item: {
      PK,
      SK,
      artType: '1',
      data,
      contentId,
      contentType,
      contentTitle,
      imdbId,
      poster,
      createdAt: now,
      updatedAt: now
    }
  };

  await dynamoDb.put(params);

  return params.Item;
};