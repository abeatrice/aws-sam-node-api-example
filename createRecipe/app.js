const {DynamoDBClient, PutItemCommand} = require("@aws-sdk/client-dynamodb");
const {v4: uuidv4} = require("uuid");
const Joi = require("joi")

exports.lambdaHandler = async (event) => {

    // validate request body
    const body = JSON.parse(event.body);
    const schema = Joi.object({
        Name: Joi.string().required(),
        Description: Joi.string().required()
    });
    const { error, value } = schema.validate(body);
    if(error !== undefined) {
        return {
            statusCode: 400,
            body: error.message
        }
    }

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
        statusCode: 201,
        body: JSON.stringify({
            data: {
                ID: recipe.ID.S,
                Name: body.Name,
                Description: body.Description
            }
        })
    }
}
