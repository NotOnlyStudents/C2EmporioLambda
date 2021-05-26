interface TokenValidator {
  checkToken: () => boolean,
  checkTimout: () => boolean,
  checkHmac: () => boolean
}

export default TokenValidator;
