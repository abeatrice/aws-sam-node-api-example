const {DynamoDBClient, PutItemCommand} = require("@aws-sdk/client-dynamodb");

exports.lambdaHandler = async (event, context) => {
    const id = event.pathParameters.id;
    const body = JSON.parse(event.body);
    const recipe = {
        ID: {S: id},
        Name: {S: body.Name},
        Description: {S: body.Description},
    };
    try {
        const client = new DynamoDBClient({region: "us-east-1"});
        await client.send(new PutItemCommand({
            TableName: "Recipes",
            Item: recipe
        }));
    } catch (error) {
        console.log(error);
        return error;
    }
    return {
        'statusCode': 200,
        'body': JSON.stringify({
            data: {
                ID: id,
                Name: body.Name,
                Description: body.Description
            }
        })
    }
}
