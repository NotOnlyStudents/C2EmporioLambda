import {
  APIGatewayProxyEvent,
} from 'aws-lambda';

const getUsername = (event: APIGatewayProxyEvent): string => {
  if (process.env.IS_OFFLINE) {
    return '1';
  }

  return event.requestContext.authorizer.claims['cognito:username'];
};

export default getUsername;
