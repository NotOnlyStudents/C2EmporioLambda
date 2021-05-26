import React from 'react';
import {
  Box,
  Dialog, FormControlLabel, IconButton, Radio, Typography,
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import CategoryService from 'services/category-service/CategoryService';
import { Category } from 'interfaces/categories/category';
import CategoryRemove from './CategoryRemove';
import CategoryEdit from './CategoryEdit';

interface Props {
  category: Category,
  index?: number,
  handleChangeCategory?: () => void,
  handleRemoveCategory?: (index: number) => void,
}

function CategoryView({
  category, handleChangeCategory, index, handleRemoveCategory,
}: Props) {
  const [edit, setEdit] = React.useState(false);

  const handleCloseDialog = () => {
    setEdit(false);
  };

  const onChangeCategory = () => {
    handleChangeCategory();
    handleCloseDialog();
  };

  const handleClickEditButton = () => {
    setEdit(true);
  };

  const handleCloseEdit = () => {
    setEdit(false);
  };

  return (
    <Box width="100%" display="flex" justifyContent="space-between">
      <Typography>
        { category.name }
      </Typography>
      <Box>
        <IconButton color="primary" onClick={handleClickEditButton}>
          <Edit />
        </IconButton>
        <CategoryRemove id={category.id} onRemove={() => handleRemoveCategory(index)} />
      </Box>
      <Dialog open={edit} onClose={handleCloseEdit}>
        <CategoryEdit
          category={category}
          handleChangeCategory={onChangeCategory}
          handleCloseDialog={handleCloseDialog}
        />
      </Dialog>
    </Box>
  );
}

export default CategoryView;
