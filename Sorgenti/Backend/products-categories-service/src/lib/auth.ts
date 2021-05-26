export function isSeller(event: APIGatewayProxyEvent) {
  return event.requestContext.authorizer.claims['cognito:groups'].includes('sellers');
}
