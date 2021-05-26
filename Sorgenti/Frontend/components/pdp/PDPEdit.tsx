import Head from 'next/head';
import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import {
  Box, Button, InputAdornment, TextField, Typography,
} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckIcon from '@material-ui/icons/Check';
import ImagesUploader from 'components/images-uploader/ImagesUploader';
import TextFieldValidation from 'components/validation/TextFieldValidation';
import { Product, ProductValidation } from 'interfaces/products/product';
import { NextRouter, withRouter } from 'next/router';
import ProductService from 'services/product-service';
import ProductServiceType from 'services/product-service/ProductService';
import AutocompleteCategories from 'components/autocomplete/autocompleteCategories';
import { Category } from 'interfaces/categories/category';
import { getViewProductLink } from 'lib/links';
import { SnackbarContext, Snackbars } from 'lib/SnackbarContext';
import { getAuthToken } from 'lib/authContext';
import PDPEvidence from './PDPEvidence';

interface Props {
  router: NextRouter;
  product: Product;
  title: string;
  creation?: boolean;
}
interface State {
  product: Product;
  validation: ProductValidation;
}

class PDPEdit extends React.Component<Props, State> {
  readonly imageLimit = 4;

  constructor(props: Props) {
    super(props);

    this.state = {
      product: props.product,
      validation: {
        name: false,
        images: props.product.images.length === 0,
        quantity: false,
        price: false,
        discount: false,
        evidence: false,
      },
    };
  }

  handleChangeName = (value: string) => {
    this.setState((state: State) => {
      const newState = state;

      newState.product.name = value;

      return newState;
    });
  };

  handleChangeEvidence = async (evidence: boolean) => {
    this.setState((state: State) => {
      const newState = state;

      newState.product.evidence = evidence;

      return newState;
    });
  };

  handleChangePrice = (value: number) => {
    this.setState((state: State) => {
      const newState = state;

      newState.product.price = value;

      return newState;
    });
  };

  handleChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState((state: State) => {
      const newState = state;

      newState.product.description = event.target.value;

      return newState;
    });
  };

  handleChangeQuantity = (value: string) => {
    this.setState((state: State) => {
      const newState = state;

      newState.product.quantity = value;

      return newState;
    });
  };

  handleChangeCategories = (categories: Category[]) => {
    this.setState((state: State) => {
      const newState = state;
      newState.product.categories = categories.map((cat) => cat.name);
      return newState;
    });
  };

  handleChangeDiscount = (discount: number) => {
    this.setState((state: State) => {
      const newState = state;

      newState.product.discount = discount;

      return newState;
    });
  };

  setError = (id: string, error: boolean) => {
    this.setState((state: State) => {
      const newState = state;

      newState.validation[id] = error;

      return newState;
    });
  };

  handleAddImage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!this.reachedImageLimit()) {
      const reader = new FileReader();
      const file = event.target.files[0];

      if (file) {
        reader.readAsDataURL(file);

        reader.onloadend = () => {
          this.setState((state: State) => {
            const newState = state;

            newState.product.images.push(reader.result as string);

            newState.validation.images = newState.product.images.length === 0;

            return newState;
          });
        };
      }
    }
  };

  handleRemoveImage = (image: string) => {
    this.setState((state: State) => {
      const newState = state;

      newState.product.images.splice(newState.product.images.indexOf(image), 1);
      newState.validation.images = newState.product.images.length === 0;

      return newState;
    });
  };

  reachedImageLimit = () => this.state.product.images.length === this.imageLimit;

  checkValidation = () => {
    const { validation } = this.state;

    return Object.values(validation).every(
      (val: boolean) => (!val),
    );
  };

  goToViewProductPage = (newProduct: Product) => {
    this.props.router.push({
      pathname: getViewProductLink(newProduct.id, true),
    });
  };

  handleClickCancel = () => {
    const { router } = this.props;

    router.back();
  };

  handleClickSave = async () => {
    const { openSnackbar } = this.context;

    if (this.checkValidation()) {
      const { creation } = this.props;
      const { product } = this.state;

      let newProduct: Product;

      const ps: ProductServiceType = new ProductService();

      if (!creation) {
        try {
          const token: string = await getAuthToken();

          newProduct = await ps.editProduct(token, product.id, product);
          openSnackbar(Snackbars.productEditSuccessId);
          this.goToViewProductPage(newProduct);
        } catch (e) {
          openSnackbar(Snackbars.productEditErrorId);
        }
      } else {
        try {
          const token: string = await getAuthToken();

          newProduct = await ps.createProduct(token, product);

          openSnackbar(Snackbars.productCreateSuccessId);

          this.goToViewProductPage(newProduct);
        } catch (e) {
          openSnackbar(Snackbars.productCreateErrorId);
        }
      }
    } else {
      openSnackbar(Snackbars.productNotValidId);
    }
  };

  render() {
    const { title, creation } = this.props;
    const { product, validation } = this.state;

    const renderEvidenceIfCreation = () => (creation ? (
      <PDPEvidence
        evidence={product.evidence}
        handleChangeEvidence={this.handleChangeEvidence}
      />
    ) : <></>);

    const renderQuantityManagerIfCreation = () => (
      creation
        ? (
          <TextFieldValidation
            id="quantity"
            label="Product quantity"
            placeholder="Insert product quantity"
            value={product.quantity}
            type="number"
            margin="normal"
            error={validation.quantity}
            setError={this.setError}
            handleChange={this.handleChangeQuantity}
            rules="required|integer"
            helperText="Product quantity is required and must be an integer"
          />
        ) : <></>
    );

    const selectedCategories = product.categories.map((name) => ({ name }));

    return (
      <Box>
        <Head>
          <title>{`${title} | EmporioLambda`}</title>
        </Head>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h4" component="h2">
            {title}
          </Typography>
          { renderEvidenceIfCreation() }
        </Box>
        <TextFieldValidation
          id="name"
          label="Product name"
          placeholder="Insert product name"
          helperText="required name up to 100 characters long"
          value={product.name}
          fullWidth
          margin="normal"
          handleChange={this.handleChangeName}
          setError={this.setError}
          error={validation.name}
          rules="required|max:100"
        />
        <TextField
          id="description"
          label="Product description"
          placeholder="Insert product description"
          value={product.description}
          fullWidth
          multiline
          variant="outlined"
          margin="normal"
          onChange={this.handleChangeDescription}
        />
        <AutocompleteCategories
          selectedCategories={selectedCategories}
          handleChangeCategories={this.handleChangeCategories}
        />
        <Box display="flex" justifyContent="space-between">
          <TextFieldValidation
            id="price"
            label="Product price"
            placeholder="Insert product price"
            value={product.price}
            type="number"
            margin="normal"
            helperText="Product price is required"
            InputProps={{
              startAdornment: <InputAdornment position="start">€</InputAdornment>,
            }}
            error={validation.price}
            setError={this.setError}
            handleChange={this.handleChangePrice}
            rules="required|numeric|min:0"
          />
          { renderQuantityManagerIfCreation() }
          <TextFieldValidation
            id="discount"
            label="Product discount"
            placeholder="Insert product discount"
            value={product.discount}
            type="number"
            margin="normal"
            error={validation.discount}
            setError={this.setError}
            handleChange={this.handleChangeDiscount}
            rules="integer|min:0|max:100"
            helperText="Product price must be an integer between 0 and 100"
          />
        </Box>
        <ImagesUploader
          images={product.images}
          handleAddImage={this.handleAddImage}
          handleRemoveImage={this.handleRemoveImage}
          error={validation.images}
          disabled={this.reachedImageLimit()}
        />
        <Box
          position="relative"
          display="flex"
          marginTop={10}
          justifyContent="space-between"
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={this.handleClickCancel}
          >
            <HighlightOffIcon />
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleClickSave}
          >
            <CheckIcon />
            Save
          </Button>
        </Box>
      </Box>
    );
  }
}

PDPEdit.contextType = SnackbarContext;

export default withRouter(PDPEdit);
