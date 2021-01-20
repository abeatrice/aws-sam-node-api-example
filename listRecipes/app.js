const {DynamoDBClient, ScanCommand} = require("@aws-sdk/client-dynamodb");
let response;

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
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET"
            },
            body: JSON.stringify({
                data: items
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
