enum PaymentStatus {
  success = 'payment_intent.succeeded',
}

interface PaymentEvent {
  type: PaymentStatus,
  data: {
    object: {
      id: string
    }
  }
}

export { PaymentEvent, PaymentStatus };
