import SnackbarAddressNotValid, { addressNotValidId } from 'components/snackbar/address/SnackbarAddressNotValid';
import SnackbarCreateAddressError, { addressCreateErrorId } from 'components/snackbar/address/SnackbarCreateAddressError';
import SnackbarCreateAddressSuccess, { addressCreateSuccessId } from 'components/snackbar/address/SnackbarCreateAddressSuccess';
import SnackbarDeleteAddressError, { addressDeleteErrorId } from 'components/snackbar/address/SnackbarDeleteAddressError';
import SnackbarDeleteAddressSuccess, { addressDeleteSuccessId } from 'components/snackbar/address/SnackbarDeleteAddressSuccess';
import SnackbarEditAddressError, { addressEditErrorId } from 'components/snackbar/address/SnackbarEditAddressError';
import SnackbarEditAddressSuccess, { addressEditSuccessId } from 'components/snackbar/address/SnackbarEditAddressSuccess';
import SnackbarAddToCartError, { addToCartErrorId } from 'components/snackbar/cart/SnackbarAddToCartError';
import SnackbarAddToCartSuccess, { addToCartSuccessId } from 'components/snackbar/cart/SnackbarAddToCartSuccess';
import SnackbarRemoveFromCartError, { removedFromCartErrorId } from 'components/snackbar/cart/SnackbarRemoveFromCartError';
import SnackbarRemoveFromCartSuccess, { removedFromCartSuccessId } from 'components/snackbar/cart/SnackbarRemoveFromCartSuccess';
import SnackbarCategoryNotValid, { categoryNotValidId } from 'components/snackbar/categories/SnackbarCategoryNotValid';
import SnackbarCreateCategoryError, { categoryCreateErrorId } from 'components/snackbar/categories/SnackbarCreateCategoryError';
import SnackbarCreateCategorySuccess, { categoryCreateSuccessId } from 'components/snackbar/categories/SnackbarCreateCategorySuccess';
import SnackbarDeleteCategoryError, { categoryDeleteErrorId } from 'components/snackbar/categories/SnackbarDeleteCategoryError';
import SnackbarDeleteCategorySuccess, { categoryDeleteSuccessId } from 'components/snackbar/categories/SnackbarDeleteCategorySuccess';
import SnackbarEditCategoryError, { categoryEditErrorId } from 'components/snackbar/categories/SnackbarEditCategoryError';
import SnackbarEditCategorySuccess, { categoryEditSuccessId } from 'components/snackbar/categories/SnackbarEditCategorySuccess';
import SnackbarErrorRetrievingData, { errorRetrievingDataId } from 'components/snackbar/common-snackbar/SnackbarErrorRetrievingData';
import SnackbarChangeEvidenceError, { changeEvidenceErrorId } from 'components/snackbar/evidence/SnackbarChangeEvidenceError';
import SnackbarChangeEvidenceSuccess, { changeEvidenceSuccessId } from 'components/snackbar/evidence/SnackbarChangeEvidenceSuccess';
import SnackbarStatusModified, { statusModifiedId } from 'components/snackbar/orders/SnackbarStatusModified';
import SnackbarStatusModifiedError, { statusModifiedErrorId } from 'components/snackbar/orders/SnackbarStatusModifiedError';
import SnackbarPaymentError, { paymentErrorId } from 'components/snackbar/payment/SnackbarPaymentError';
import SnackbarCreateProductError, { productCreateErrorId } from 'components/snackbar/product/SnackbarCreateProductError';
import SnackbarCreateProductSuccess, { productCreateSuccessId } from 'components/snackbar/product/SnackbarCreateProductSuccess';
import SnackbarDeleteProductError, { productDeleteErrorId } from 'components/snackbar/product/SnackbarDeleteProductError';
import SnackbarDeleteProductSuccess, { productDeleteSuccessId } from 'components/snackbar/product/SnackbarDeleteProductSuccess';
import SnackbarEditProductError, { productEditErrorId } from 'components/snackbar/product/SnackbarEditProductError';
import SnackbarEditProductSuccess, { productEditSuccessId } from 'components/snackbar/product/SnackbarEditProductSuccess';
import SnackbarProductNotValid, { productNotValidId } from 'components/snackbar/product/SnackbarProductNotValid';
import SnackbarChangeQuantityError, { changeQuantityErrorId } from 'components/snackbar/quantity/SnackbarChangeQuantityError';
import SnackbarChangeQuantitySuccess, { changeQuantitySuccessId } from 'components/snackbar/quantity/SnackbarChangeQuantitySuccess';
import SnackbarDeleteUserError, { userDeleteErrorId } from 'components/snackbar/user/SnackbarDeleteUserError';
import SnackbarDeleteUserSuccess, { userDeleteSuccessId } from 'components/snackbar/user/SnackbarDeleteUserSuccess';
import React, { createContext, useContext } from 'react';

interface SnackbarContextProps {
  openSnackbar: (id: string) => void
}

export const SnackbarContext = createContext<Partial<SnackbarContextProps>>({});

export const Snackbars = {
  addToCartSuccessId,
  addToCartErrorId,
  removedFromCartSuccessId,
  removedFromCartErrorId,
  changeQuantitySuccessId,
  changeQuantityErrorId,
  addressNotValidId,
  addressCreateSuccessId,
  addressCreateErrorId,
  addressEditSuccessId,
  addressEditErrorId,
  addressDeleteSuccessId,
  addressDeleteErrorId,
  categoryNotValidId,
  categoryCreateSuccessId,
  categoryCreateErrorId,
  categoryDeleteSuccessId,
  categoryDeleteErrorId,
  categoryEditSuccessId,
  categoryEditErrorId,
  changeEvidenceSuccessId,
  changeEvidenceErrorId,
  productCreateSuccessId,
  productCreateErrorId,
  productEditSuccessId,
  productEditErrorId,
  productDeleteSuccessId,
  productDeleteErrorId,
  productNotValidId,
  userDeleteSuccessId,
  userDeleteErrorId,
  errorRetrievingDataId,
  statusModifiedId,
  statusModifiedErrorId,
  paymentErrorId,
};

interface Props {
  children: React.ReactElement;
}

function SnackbarContextProvider({ children }: Props) {
  const alertObj = Object.values(Snackbars)
    .map((snackbar) => ({ [snackbar]: false }))
    .reduce((obj, currentObj) => ({ ...currentObj, ...obj }), {});

  const [alert, setAlert] = React.useState(alertObj);

  const changeAlert = (id: string, show: boolean) => {
    const newAlert = { ...alert };

    newAlert[id] = show;

    setAlert(newAlert);
  };

  const openSnackbar = (id: string) => {
    changeAlert(id, true);
  };

  const closeSnackbar = (id: string) => {
    changeAlert(id, false);
  };

  return (
    <SnackbarContext.Provider value={{
      openSnackbar,
    }}
    >
      {children}

      <SnackbarAddToCartSuccess
        open={alert[addToCartSuccessId]}
        handleClose={closeSnackbar}
      />

      <SnackbarAddToCartError
        open={alert[addToCartErrorId]}
        handleClose={closeSnackbar}
      />

      <SnackbarRemoveFromCartSuccess
        open={alert[removedFromCartSuccessId]}
        handleClose={closeSnackbar}
      />

      <SnackbarRemoveFromCartError
        open={alert[removedFromCartErrorId]}
        handleClose={closeSnackbar}
      />

      <SnackbarChangeQuantitySuccess
        open={alert[changeQuantitySuccessId]}
        handleClose={closeSnackbar}
      />

      <SnackbarChangeQuantityError
        open={alert[changeQuantityErrorId]}
        handleClose={closeSnackbar}
      />

      <SnackbarAddressNotValid
        open={alert[addressNotValidId]}
        handleClose={closeSnackbar}
      />

      <SnackbarCreateAddressSuccess
        open={alert[addressCreateSuccessId]}
        handleClose={closeSnackbar}
      />

      <SnackbarCreateAddressError
        open={alert[addressCreateErrorId]}
        handleClose={closeSnackbar}
      />

      <SnackbarDeleteAddressSuccess
        open={alert[addressDeleteSuccessId]}
        handleClose={closeSnackbar}
      />

      <SnackbarDeleteAddressError
        open={alert[addressDeleteErrorId]}
        handleClose={closeSnackbar}
      />

      <SnackbarEditAddressSuccess
        open={alert[addressEditSuccessId]}
        handleClose={closeSnackbar}
      />

      <SnackbarEditAddressError
        open={alert[addressEditErrorId]}
        handleClose={closeSnackbar}
      />

      <SnackbarCategoryNotValid
        open={alert[categoryNotValidId]}
        handleClose={closeSnackbar}
      />

      <SnackbarCreateCategorySuccess
        open={alert[categoryCreateSuccessId]}
        handleClose={closeSnackbar}
      />

      <SnackbarCreateCategoryError
        open={alert[categoryCreateErrorId]}
        handleClose={closeSnackbar}
      />

      <SnackbarDeleteCategorySuccess
        open={alert[categoryDeleteSuccessId]}
        handleClose={closeSnackbar}
      />

      <SnackbarDeleteCategoryError
        open={alert[categoryDeleteErrorId]}
        handleClose={closeSnackbar}
      />

      <SnackbarEditCategorySuccess
        open={alert[categoryEditSuccessId]}
        handleClose={closeSnackbar}
      />

      <SnackbarEditCategoryError
        open={alert[categoryEditErrorId]}
        handleClose={closeSnackbar}
      />

      <SnackbarChangeEvidenceSuccess
        open={alert[changeEvidenceSuccessId]}
        handleClose={closeSnackbar}
      />

      <SnackbarChangeEvidenceError
        open={alert[changeEvidenceErrorId]}
        handleClose={closeSnackbar}
      />

      <SnackbarCreateProductSuccess
        open={alert[productCreateSuccessId]}
        handleClose={closeSnackbar}
      />

      <SnackbarCreateProductError
        open={alert[productCreateErrorId]}
        handleClose={closeSnackbar}
      />

      <SnackbarDeleteProductSuccess
        open={alert[productDeleteSuccessId]}
        handleClose={closeSnackbar}
      />

      <SnackbarDeleteProductError
        open={alert[productDeleteErrorId]}
        handleClose={closeSnackbar}
      />

      <SnackbarEditProductSuccess
        open={alert[productEditSuccessId]}
        handleClose={closeSnackbar}
      />

      <SnackbarEditProductError
        open={alert[productEditErrorId]}
        handleClose={closeSnackbar}
      />

      <SnackbarProductNotValid
        open={alert[productNotValidId]}
        handleClose={closeSnackbar}
      />

      <SnackbarDeleteUserError
        open={alert[userDeleteErrorId]}
        handleClose={closeSnackbar}
      />

      <SnackbarDeleteUserSuccess
        open={alert[userDeleteSuccessId]}
        handleClose={closeSnackbar}
      />

      <SnackbarErrorRetrievingData
        open={alert[errorRetrievingDataId]}
        handleClose={closeSnackbar}
      />

      <SnackbarStatusModified
        open={alert[statusModifiedId]}
        handleClose={closeSnackbar}
      />

      <SnackbarStatusModifiedError
        open={alert[statusModifiedErrorId]}
        handleClose={closeSnackbar}
      />

      <SnackbarPaymentError
        open={alert[paymentErrorId]}
        handleClose={closeSnackbar}
      />

    </SnackbarContext.Provider>
  );
}

export function useSnackbarContext() {
  return useContext(SnackbarContext);
}

export default SnackbarContextProvider;
