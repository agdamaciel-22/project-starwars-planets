import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TableContext from './TableContext';

function TableProvider({ children }) {
  const [data, setData] = useState(null);
  const [name, setName] = useState('');
  const [filteredData, setFilteredData] = useState(null);
  const [isAlreadyFiltered, changeAlreadyFilter] = useState(false);
  const [filterButtonsData, setFilterButtonsData] = useState([]);
  const [filterColumns, setFilterColumns] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water']);
  const [filterByNumericValues, setFilteredValues] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [order, setOrder] = useState({
    orderColumn: 'population',
    sort: 'ASC',
  });

  const sortAlphabetically = (a, b) => a.name.localeCompare(b.name);
  const fetchDataFromApi = async () => {
    const request = await fetch(
      'https://swapi-trybe.herokuapp.com/api/planets/?format=json',
    );
    const response = await request.json();
    const result = await response.results.map((planet) => {
      delete planet.residents;
      return planet;
    });
    setData(result.sort(sortAlphabetically));
    setFilteredData(result.sort(sortAlphabetically));
  };
  useEffect(() => {
    fetchDataFromApi();
  });
  useEffect(() => {
    setFilteredValues((prevState) => ({
      ...prevState,
      column: filterColumns[0],
    }));
  }, [filterColumns]);

  const returnFilterExpression = (elem) => {
    const { column, comparison, value } = filterByNumericValues;
    switch (comparison) {
    case 'maior que':
      return Number(elem[column]) > value;
    case 'menor que':
      return Number(elem[column]) < value;
    default:
      return elem[column] === value;
    }
  };
  const removeSelectedColumn = () => {
    const { column } = filterByNumericValues;
    setFilterColumns(filterColumns.filter((value) => value !== column));
  };

  const sendDataToButton = () => {
    const { column, comparison, value } = filterByNumericValues;
    setFilterButtonsData([...filterButtonsData, { column, comparison, value }]);
  };

  const filterDataByValues = () => {
    removeSelectedColumn();
    sendDataToButton();
    const dataToFilter = isAlreadyFiltered ? filteredData : data;
    const filteredDataByValues = dataToFilter.filter(returnFilterExpression);
    console.log(filteredDataByValues);
    setFilteredData(filteredDataByValues);
    changeAlreadyFilter(true);
  };

  const removeFilter = (elementIndex) => {
    const itemsToFilter = filterButtonsData.filter((el, i) => i !== elementIndex);
    let filteredItems = [];
    itemsToFilter.forEach(({ column, comparison, value }) => {
      filteredItems = [...filteredItems, ...data.filter((el) => {
        switch (comparison) {
        case 'maior que':
          return Number(el[column]) > value;
        case 'menor que':
          return Number(el[column]) < value;
        default:
          return el[column] === value;
        }
      })];
    });
    console.log(filteredItems);
    const { column } = filterButtonsData[elementIndex];
    const nonSelectedBtn = filterButtonsData.filter((b, index) => index !== elementIndex);
    if (filterButtonsData.length === 1) {
      setFilteredData(data);
    } else {
      setFilteredData(filteredItems);
    }
    setFilterButtonsData(nonSelectedBtn);
    setFilterColumns([...filterColumns, column]);
  };

  const removeAllFilters = () => {
    changeAlreadyFilter(false);
    setFilterButtonsData([]);
    setFilterColumns([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water']);
  };

  const sortList = () => {
    const { sort, orderColumn } = order;
    const isUnknown = (planet) => planet[orderColumn] === 'unknown';
    const unknownElements = data.filter(isUnknown);
    const sortedElements = data.filter((p) => !isUnknown(p)).sort((a, b) => (
      sort === 'ASC' ? a[orderColumn] - b[orderColumn] : b[orderColumn] - a[orderColumn]
    ));
    setData([...sortedElements, ...unknownElements]);
  };

  const onChangeFilterValues = ({ target }) => {
    setFilteredValues({
      ...filterByNumericValues,
      [target.name]: target.value,
    });
  };
  const onChangeSort = ({ target }) => {
    setOrder({
      ...order,
      [target.name]: target.value,
    });
  };

  const onChangeName = ({ target }) => {
    setName(target.value);
  };

  return (
    <TableContext.Provider
      value={ {
        data,
        filterByName: name,
        onChangeName,
        onChangeFilterValues,
        filterByNumericValues,
        filterDataByValues,
        filteredData,
        isAlreadyFiltered,
        filterColumns,
        onChangeSort,
        order,
        sortList,
        filterButtonsData,
        removeFilter,
        removeAllFilters,
      } }
    >
      {children}
    </TableContext.Provider>
  );
}
TableProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default TableProvider;
