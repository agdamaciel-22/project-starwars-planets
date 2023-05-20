import React, { useContext } from 'react';
import TableContext from '../context/TableContext';

function Table() {
  const { data,
    filterByName,
    filteredData,
    isAlreadyFiltered } = useContext(TableContext);
  console.log(data);
  if (data === null) {
    return null;
  }

  const dataToRender = isAlreadyFiltered
    ? filteredData.filter((el) => el.name.includes(filterByName))
    : data.filter((el) => el.name.includes(filterByName));
  return (
    <table>
      <thead>
        <tr>
          {Object.keys(data[0]).map((prop, index) => (<th key={ index }>{prop}</th>))}
        </tr>
      </thead>
      <tbody>

        {dataToRender.map((planet, index) => (
          <tr key={ index }>
            <td data-testid="planet-name">{planet.name}</td>
            <td>{planet.rotation_period}</td>
            <td>{planet.orbital_period}</td>
            <td>{planet.diameter}</td>
            <td>{planet.climate}</td>
            <td>{planet.gravity}</td>
            <td>{planet.terrain}</td>
            <td>{planet.surface_water}</td>
            <td>{planet.population}</td>
            <td>{planet.films}</td>
            <td>{planet.created}</td>
            <td>{planet.edite}</td>
            <td>{planet.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
