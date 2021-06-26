import dynamoDb from "../../libs/dynamodb-lib";

export default async function findContent(contentId) {
  const PK = `ART#1`;
  const SK = `CONT#${contentId}`;

  const params = {
    TableName: process.env.tableName,
    Key: {
      PK,
      SK
    }
  };

  return await dynamoDb.get(params);
}
