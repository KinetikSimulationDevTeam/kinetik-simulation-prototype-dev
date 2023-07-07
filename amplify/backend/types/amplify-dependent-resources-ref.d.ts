export type AmplifyDependentResourcesAttributes = {
  "api": {
    "getSimulationOutput": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    },
    "kinetiksimulation": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string",
      "GraphQLAPIKeyOutput": "string"
    }
  },
  "function": {
    "kinetikSimulationLambda": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  }
}