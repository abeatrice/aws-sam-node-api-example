const {DynamoDBClient, GetItemCommand} = require("@aws-sdk/client-dynamodb");
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    console.log(event.pathParameters.id)
    try {
        const client = new DynamoDBClient({region: "us-east-1"});
        const data = await client.send(new GetItemCommand({
            TableName: "Recipes",
            Key: {
                ID: {S: event.pathParameters.id}
            }
        }));
        const item = {
            ID: data.Item.ID.S,
            Name: data.Item.Name.S,
            Description: data.Item.Description.S
        };
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                data: item,
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
