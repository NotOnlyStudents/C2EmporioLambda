import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Category } from 'interfaces/categories/category';
import CategoryService from 'services/category-service';
import { makeStyles } from '@material-ui/core';

interface Props {
  selectedCategories: Category[],
  handleChangeCategories: (categories: Category[]) => void,
  helperText?: string
}

const useStyles = makeStyles({
  categories: {
    padding: '0.5em 0',
  },
});

function AutocompleteCategories({
  selectedCategories,
  helperText,
  handleChangeCategories,
}: Props) {
  const [options, setOptions] = React.useState<Category[]>([]);
  const classes = useStyles();

  const getallCategories = async () => {
    let categoriesOptions = [];

    try {
      categoriesOptions = await (new CategoryService()).getCategories();
    } catch (error) {
      console.error(error);
    }

    setOptions(categoriesOptions);
  };

  React.useEffect(() => {
    getallCategories();
  }, []);

  return (
    <Autocomplete
      multiple
      id="categories"
      className={classes.categories}
      options={options}
      onChange={(event, v: Category[]) => {
        handleChangeCategories(v);
      }}
      getOptionLabel={(option) => option.name}
      fullWidth
      value={selectedCategories}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          helperText={helperText}
          label="Categories value"
          placeholder="Insert categories"
        />
      )}
    />
  );
}

AutocompleteCategories.defaultProps = {
  helperText: '',
};

export default AutocompleteCategories;
