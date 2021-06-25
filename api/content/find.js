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
  
  const result = await dynamoDb.get(params);
}
