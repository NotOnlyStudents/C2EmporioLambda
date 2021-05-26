import { SNSQuantityEditedPayload } from 'src/models/product-responses';
import { validateSNSQuantity } from 'src/validation/validate-product';

describe('Validate quantity to update', () => {
  test('Valid quantity payload', () => {
    const payload: SNSQuantityEditedPayload = {
      id: '1',
      quantity: 12345,
    };

    expect(validateSNSQuantity(payload)).toBeTruthy();
  });

  test('Invalid id is empty', () => {
    const payload: SNSQuantityEditedPayload = {
      id: '',
      quantity: 12345,
    };

    expect(validateSNSQuantity(payload)).toBeFalsy();
  });
});
