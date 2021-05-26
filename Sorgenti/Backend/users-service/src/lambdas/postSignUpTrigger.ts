import { PostConfirmationConfirmSignUpTriggerEvent } from 'aws-lambda';
import { CognitoIdentityServiceProvider } from 'aws-sdk';

const postSignUpTrigger = async (
  event: PostConfirmationConfirmSignUpTriggerEvent,
): Promise<string> => new Promise((resolve, reject) => {
  const cognitoISP = new CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });
  const { userName, userPoolId } = event;

  const userGroupParams = {
    GroupName: 'buyers',
    UserPoolId: userPoolId,
    Username: userName,
  };

  cognitoISP
    .adminAddUserToGroup(userGroupParams)
    .promise()
    .then(() => resolve(userName))
    .catch((error) => reject(error));
});

export default postSignUpTrigger;
