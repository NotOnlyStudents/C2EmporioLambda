import React from 'react';
import { ProductFilter, SortType } from 'interfaces/products/product';
import { Category } from 'interfaces/categories/category';
import CheckboxEvidence from 'components/checkboxes/checkboxEvidence';
import CheckboxAvailable from 'components/checkboxes/checkboxAvailable';
import AutocompleteCategories from 'components/autocomplete/autocompleteCategories';
import TextfieldMaxPrice from 'components/textfield/textfieldMaxPrice';
import TextfieldMinPrice from 'components/textfield/textfieldMinPrice';
import SortProducts from 'components/sort-products/SortProducts';
import { Box } from '@material-ui/core';

interface Props {
  filter: ProductFilter;
  seller: boolean;
  handleChangeFilter: (filter: ProductFilter) => void;
}

function PLPFilter({ filter, seller, handleChangeFilter }: Props) {
  const handleChangeCategories = (categories: Category[]) => {
    const filterCategories: ProductFilter = { ...filter };
    filterCategories.categories = categories.map((cat) => (cat.name));
    handleChangeFilter(filterCategories);
  };

  const handleChangeEvidence = (evidence: boolean) => {
    const filterEvidence: ProductFilter = { ...filter };
    filterEvidence.evidence = evidence;
    handleChangeFilter(filterEvidence);
  };

  const handleChangeMinPrice = (minPrice: number) => {
    if (minPrice >= 0) {
      const filterMinPrice: ProductFilter = { ...filter };
      filterMinPrice.priceMin = minPrice;
      handleChangeFilter(filterMinPrice);
    }
  };

  const handleChangeMaxPrice = (maxPrice: number) => {
    if (maxPrice >= 0) {
      const filterMaxPrice: ProductFilter = { ...filter };
      filterMaxPrice.priceMax = maxPrice;
      handleChangeFilter(filterMaxPrice);
    }
  };

  const handleChangeAvailable = (available: boolean) => {
    const filterAvailable: ProductFilter = { ...filter };
    filterAvailable.available = available;
    handleChangeFilter(filterAvailable);
  };

  const handleChangeSort = (sort: SortType) => {
    const filterSort: ProductFilter = { ...filter };
    filterSort.sort = sort;
    handleChangeFilter(filterSort);
  };

  const renderCheckboxEvidenceIfSeller = () => (seller
    ? (
      <CheckboxEvidence
        selectedEvidence={filter.evidence}
        handleChangeEvidence={handleChangeEvidence}
      />
    )
    : <></>);

  const selectedCategories = filter.categories.map((name): Category => ({ name }));

  return (
    <Box p={2}>
      <Box display="flex">
        <AutocompleteCategories
          selectedCategories={selectedCategories}
          handleChangeCategories={handleChangeCategories}
        />
        { renderCheckboxEvidenceIfSeller() }
        <CheckboxAvailable
          selectedAvailable={filter.available}
          handleChangeAvailable={handleChangeAvailable}
        />
      </Box>
      <Box display="flex">
        <TextfieldMinPrice
          selectedMinPrice={filter.priceMin}
          selectedMaxPrice={filter.priceMax}
          handleChangeMinPrice={handleChangeMinPrice}
        />
        <TextfieldMaxPrice
          selectedMaxPrice={filter.priceMax}
          selectedMinPrice={filter.priceMin}
          handleChangeMaxPrice={handleChangeMaxPrice}
        />
        <Box flexGrow={1} />
        <SortProducts
          sort={filter.sort}
          handleChangeSort={handleChangeSort}
        />
      </Box>
    </Box>
  );
}

export default PLPFilter;
