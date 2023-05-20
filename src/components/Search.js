import React, { useContext } from 'react';
import TableContext from '../context/TableContext';

function Search() {
  const { filterName, onChangeName } = useContext(TableContext);

  return (
    <input
      data-testid="name-filter"
      type="text"
      value={ filterName }
      onChange={ onChangeName }
    />

  );
}

export default Search;
