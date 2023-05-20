import React, { useContext } from 'react';
import TableContext from '../context/TableContext';
import Search from './Search';

function Header() {
  const {
    onChangeFilterValues,
    filterDataByValues,
    filterByNumericValues,
    filterColumns,
    onChangeSort,
    sortList,
    filterButtonsData,
    removeFilter,
    removeAllFilters,
  } = useContext(TableContext);

  return (
    <header>
      <Search />
      <select name="column" onChange={ onChangeFilterValues } data-testid="column-filter">
        {filterColumns.map((column) => (
          <option key={ column } value={ column }>{column}</option>
        ))}
      </select>
      <select
        name="comparison"
        onChange={ onChangeFilterValues }
        data-testid="comparison-filter"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        name="value"
        onChange={ onChangeFilterValues }
        data-testid="value-filter"
        value={ filterByNumericValues.value }
      />
      <button
        type="button"
        onClick={ filterDataByValues }
        data-testid="button-filter"
      >
        filtrar

      </button>
      <h3>Ordernar</h3>
      <select
        data-testid="column-sort"
        onChange={ onChangeSort }
        name="orderColumn"
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <div>
        <label htmlFor="asc">
          Ascendente
          <input
            type="radio"
            name="sort"
            data-testid="column-sort-input-asc"
            value="ASC"
            onChange={ onChangeSort }
          />
        </label>
        <label htmlFor="desc">
          Descendente
          <input
            type="radio"
            name="sort"
            data-testid="column-sort-input-desc"
            value="DESC"
            onChange={ onChangeSort }
          />
        </label>
      </div>
      <button type="button" data-testid="column-sort-button" onClick={ sortList }>
        Ordernar
      </button>
      {filterButtonsData.map(({ column, comparison, value }, index) => (
        <div key={ index } data-testid="filter">
          {column}
          {' '}
          {comparison}
          {' '}
          {value}
          <button type="button" id={ index } onClick={ () => removeFilter(index) }>
            X
          </button>
        </div>
      ))}
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ removeAllFilters }
      >
        Remover filtros
      </button>
    </header>
  );
}

export default Header;
