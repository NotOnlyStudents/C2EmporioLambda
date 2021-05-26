import {
  CartProduct,
  PLPProductItem,
  OrderProductItem,
  Product,
} from './product';

export function productToPLPProductItem(
  product: Product,
): PLPProductItem {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.images[0],
    evidence: product.evidence,
    discount: product.discount,
    discountedPrice: product.discountedPrice,
    quantity: product.quantity as number,
  };
}

export function productToCartProduct(
  product: any,
): CartProduct {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.images[0],
    discount: product.discount,
    discountedPrice: product.discountedPrice === undefined
      ? (Math.round((product.price - (product.price * product.discount) / (100)) * 100) / 100)
      : product.discountedPrice,
    quantity: product.quantity as number,
  };
}

export function productToOrderProductItem(
  product: any,
): OrderProductItem {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.images[0],
    discount: product.discount,
    discountedPrice: product.discountedPrice === undefined
      ? (Math.round((product.price - (product.price * product.discount) / (100)) * 100) / 100)
      : product.discountedPrice,
    quantity: product.quantity as number,
  };
}
