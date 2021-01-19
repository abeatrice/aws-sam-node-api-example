const {DynamoDBClient, DeleteItemCommand} = require('@aws-sdk/client-dynamodb')

exports.lambdaHandler = async (event, context) => {
    let id = event.pathParameters.id
    let item = {
        TableName: 'Recipes',
        Key: {
            'ID': {S: id}
        }
    }
    console.log(id)
    console.log(item)
    try {
        const client = new DynamoDBClient({region: 'us-east-1'})
        await client.send(new DeleteItemCommand(item))
    } catch (error) {
        console.log(error)
        return
    }
    return {
        statusCode: 200,
        body: `${id} deleted`
    }
}
