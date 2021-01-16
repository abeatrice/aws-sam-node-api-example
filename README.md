# Node REST API aws sam example

This is a rest api example for aws sam in nodejs

## Local Dev

```bash
$ sam build
$ sam local start-api
$ curl http://localhost:3000/recipes
$ curl http://localhost:3000/recipes/1
```

## Get Logs

```bash
sam-app$ sam logs -n ListRecipesFunction --tail
```

## Tests

 - Tests are defined in the `listRecipes/tests` folder. 
 - Use NPM to install the [Mocha test framework](https://mochajs.org/) and run tests.

```bash
$ cd listRecipes
$ npm install
$ npm run test
# Integration test, requiring deploying the stack first.
# Create the env variable AWS_SAM_STACK_NAME with the name of the stack we are testing
$ AWS_SAM_STACK_NAME=<stack-name> npm run integ-test
```

## Cleanup

```bash
$ aws cloudformation delete-stack --stack-name <stack-name>
```

## Deploy

```bash
$ sam build
$ sam deploy --guided
```
