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
$ sam logs -n ListRecipesFunction --tail
```

## Tests

 - Tests are defined in the `listRecipes/tests` folder. 
 - Use NPM to install the [Mocha test framework](https://mochajs.org/) and run tests.

```bash
$ cd listRecipes
$ npm install
$ npm run test
```

## Deploy

```bash
$ sam build
$ sam deploy --guided
```

## Cleanup

```bash
$ aws cloudformation delete-stack --stack-name <stack-name>
```
