interface Token<T> {
  readonly token: {
    data: T;
    timeout: Date;
  },
  readonly hmac: string,
  signToken: () => string
}

export default Token;
