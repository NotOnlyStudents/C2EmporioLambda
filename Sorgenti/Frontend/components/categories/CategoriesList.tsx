import React from 'react';
import CategoryView from 'components/categories/CategoryView';
import { Category } from 'interfaces/categories/category';
import {
  Box, Button, Dialog,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import TextFieldValidation from 'components/validation/TextFieldValidation';
import CategoryService from 'services/category-service';
import { NextRouter, withRouter } from 'next/router';
import NoResultCategory from 'components/noresult/NoResultCategory';
import { ParsedUrlQueryInput } from 'querystring';
import CategoryEdit from './CategoryEdit';

interface Props {
  router: NextRouter,
  categories: Category[],
  searchName: string
}

interface State{
  categories: Category[],
  openNew: boolean,
  searchName: string
}

class CategoriesList extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      categories: props.categories,
      openNew: false,
      searchName: props.searchName,
    };
  }

  handleAddCategory = () => {
    this.fetchAllCategories(this.state.searchName);
    this.handleCloseNewCategoryDialog();
  };

  handleChangeCategory = () => {
    this.fetchAllCategories(this.state.searchName);
  };

  handleRemoveCategory = (index: number) => {
    this.setState((state: State) => {
      const newState = state;

      newState.categories.splice(index, 1);

      return newState;
    });
  };

  handleClickNewCategory = () => {
    this.setState({ openNew: true });
  };

  handleCloseNewCategoryDialog = () => {
    this.setState({ openNew: false });
  };

  handleChangeSearch = (searchName: string) => {
    const { router } = this.props;

    this.setState({ searchName });

    const query: ParsedUrlQueryInput = { };

    if (searchName) {
      query.text = searchName;
    }

    router.push({
      pathname: '',
      query,
    });

    this.fetchAllCategories(searchName);
  };

  fetchAllCategories = async (searchName: string) => {
    const categories = await (new CategoryService()).getCategories(searchName);

    this.setState({ categories });
  };

  renderItems = (): React.ReactElement[] => this.state.categories.map(
    (category: Category, index: number): React.ReactElement => (
      <CategoryView
        key={category.id}
        category={category}
        index={index}
        handleRemoveCategory={this.handleRemoveCategory}
        handleChangeCategory={this.handleChangeCategory}
      />
    ),
  );

  renderItemsIfPresent = (): React.ReactElement => (
    this.state.categories.length
      ? <>{ this.renderItems() }</>
      : <NoResultCategory />);

  render(): React.ReactElement {
    const { openNew, searchName } = this.state;

    return (
      <>
        <Box display="flex" justifyContent="flex-end">
          <Button
            onClick={this.handleClickNewCategory}
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          >
            Add a new category
          </Button>
        </Box>
        <Box display="flex" justifyContent="center">
          <TextFieldValidation
            id="search"
            label="Search category"
            placeholder="Insert category name to search"
            margin="normal"
            fullWidth
            handleChange={this.handleChangeSearch}
            value={searchName}
          />
        </Box>
        { this.renderItemsIfPresent() }
        <Dialog open={openNew} onClose={this.handleCloseNewCategoryDialog}>
          <CategoryEdit
            handleAddCategory={this.handleAddCategory}
            handleCloseDialog={this.handleCloseNewCategoryDialog}
            creation
          />
        </Dialog>
      </>
    );
  }
}

export default withRouter(CategoriesList);
