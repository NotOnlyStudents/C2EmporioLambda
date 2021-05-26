import {
  PostConfirmationConfirmSignUpTriggerEvent,
  PostConfirmationTriggerHandler,
  Context,
  Callback,
} from 'aws-lambda';
import postSignUpTrigger from '../lambdas/postSignUpTrigger';

const handler: PostConfirmationTriggerHandler = async (
  event: PostConfirmationConfirmSignUpTriggerEvent,
  _context: Context,
  callback: Callback,
) => {
  try {
    await postSignUpTrigger(event);

    callback(null, event);
  } catch (error) {
    console.error(event, error);
    callback(error, event);
  }
};

export default handler;
