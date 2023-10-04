export type AmplifyDependentResourcesAttributes = {
  "api": {
    "getSimulationOutput": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    },
    "kinetiksimulation": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string"
    }
  },
  "function": {
    "kinetikSimulationLambda": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    },
    "kinetikSimulationMarketingInputFileAlgorithm": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    },
    "kinetiksimulationsensitivityanalysis": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  }
}