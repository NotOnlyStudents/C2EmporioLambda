export function getHomeLink(seller: boolean = false) {
  return seller ? '/seller?status=new' : '/';
}

export function getLoginLink() {
  return '/login';
}

export function getCartLink() {
  return '/cart';
}

export function getPaymentLink() {
  return '/cart/payment';
}

export function getPersonalAreaLink(seller: boolean = false) {
  return seller ? '/seller/personal-area' : '/personal-area';
}

export function getEditPersonalAreaLink(seller: boolean = false) {
  return seller ? '/seller/personal-area/edit' : '/personal-area/edit';
}

export function getPLPLink(seller: boolean = false) {
  return seller ? '/seller/plp' : '/plp';
}

export function getOrderLink(seller: boolean = false) {
  return seller ? '/seller/orders' : '/orders';
}

export function getViewProductLink(id: string, seller: boolean = false) {
  return seller ? `/seller/pdp/${id}` : `/pdp/${id}`;
}

export function getEditProductLink(id: string) {
  return `/seller/pdp/edit/${id}`;
}

export function getNewProductLink() {
  return '/seller/pdp/new';
}

export function getCategoriesLink() {
  return '/seller/categories';
}
