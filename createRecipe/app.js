const {DynamoDBClient, PutItemCommand} = require("@aws-sdk/client-dynamodb");
const {v4: uuidv4} = require("uuid");

exports.lambdaHandler = async (event, context) => {
    const body = JSON.parse(event.body);
    const recipe = {
        ID: {S: uuidv4()},
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
        'statusCode': 201,
        'body': JSON.stringify(recipe)
    }
}
