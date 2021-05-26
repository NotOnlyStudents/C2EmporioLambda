interface SNSProductInfo {
  id: string
  quantity: number
}

interface SNSMessageInfo {
  cartId: string
  products: SNSProductInfo[]
}

export { SNSMessageInfo, SNSProductInfo };
