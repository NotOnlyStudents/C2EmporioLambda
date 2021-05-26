import { OrderStatus } from './Order';

interface OrderFilter {
  status?: OrderStatus
  email?: string
  start?: Date
  end?: Date
}

const emailRegex = /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

function isEmailValid(email: string) {
  if (!email) return false;

  if (email.length > 254) return false;

  const valid = emailRegex.test(email);
  if (!valid) return false;

  // Further checking of some things regex can't handle
  const parts = email.split('@');
  if (parts[0].length > 64) return false;

  const domainParts = parts[1].split('.');
  if (domainParts.some((part) => part.length > 63)) return false;

  return true;
}

const isFilter = (f: OrderFilter): boolean => !(
  ('status' in f && !Object.values(OrderStatus).includes(f.status))
  || ('email' in f && !isEmailValid(f.email))
);

export { OrderFilter, isFilter };
