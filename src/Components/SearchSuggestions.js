import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const SearchSuggestions = ({ suggestions, anchorEl }) => {
  return (
    <Menu
        anchorEl={anchorEl}
        open={Boolean(suggestions.length)}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
    >
        {suggestions.map((suggestion) => (
            <MenuItem key={suggestion}>{suggestion}</MenuItem>
        ))}
        {console.log('suggestions', suggestions)}
        {console.log('anchorEl', anchorEl)}
    </Menu>
  );
};

export default SearchSuggestions;
