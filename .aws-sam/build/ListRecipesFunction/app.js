const {DynamoDBClient, ScanCommand} = require("@aws-sdk/client-dynamodb");
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
    try {
        const client = new DynamoDBClient({region: "us-east-1"});
        const data = await client.send(new ScanCommand({
            TableName: 'Recipes'
        }));
        const items = data.Items.map(element => {
            return {
                ID: element.ID.S,
                Name: element.Name.S,
                Description: element.Description.S
            }
        });
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                data: items,
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
