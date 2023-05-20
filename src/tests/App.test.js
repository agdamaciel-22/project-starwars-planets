import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

const response = {results:
  [{climate: "arid",
  created: "2014-12-09T13:50:49.641000Z",
  diameter: "10465",
  edited: "2014-12-20T20:58:18.411000Z",
  films: ['https://swapi-trybe.herokuapp.com/api/films/1/', 'https://swapi-trybe.herokuapp.com/api/films/3/', 'https://swapi-trybe.herokuapp.com/api/films/4/', 'https://swapi-trybe.herokuapp.com/api/films/5/', 'https://swapi-trybe.herokuapp.com/api/films/6/'],
  gravity: "1 standard",
  name: "Tatooine",
  orbital_period: "304",
  population: "200000",
  rotation_period: "23",
  surface_water: "1",
  terrain: "desert",
  url: "https://swapi-trybe.herokuapp.com/api/planets/1/"},
  {climate: "temperate",
  created: "2014-12-10T11:35:48.479000Z",
  diameter: "12500",
  edited: "2014-12-20T20:58:18.420000Z",
  films: ['https://swapi-trybe.herokuapp.com/api/films/1/', 'https://swapi-trybe.herokuapp.com/api/films/6/'],
  gravity: "1 standard",
  name: "Alderaan",
  orbital_period: "364",
  population: "2000000000",
  rotation_period: "24",
  surface_water: "40",
  terrain: "grasslands, mountains",
  url: "https://swapi-trybe.herokuapp.com/api/planets/2/"},
 {climate: "temperate, tropical",
  created: "2014-12-10T11:37:19.144000Z",
  diameter: "10200",
  edited: "2014-12-20T20:58:18.421000Z",
  films: ['https://swapi-trybe.herokuapp.com/api/films/1/'],
  gravity: "1 standard",
  name: "Yavin IV",
  orbital_period: "4818",
  population: "1000",
  rotation_period: "24",
  surface_water: "8",
  terrain: "jungle, rainforests",
  url: "https://swapi-trybe.herokuapp.com/api/planets/3/"}
  ]}
test('Testa se o tudo é renderizado de forma correta no header', async () => {
  render(<App />);
  const tittle = screen.getByText( /Star Wars/i)
  expect(tittle).toBeInTheDocument();
  const inputText = screen.getByTestId('name-filter')
  expect(inputText).toBeInTheDocument();
  const selectColum = screen.getByTestId('column-filter')
  expect(selectColum).toBeInTheDocument()
  const selectComparasion = screen.getByTestId('comparison-filter')
  expect(selectComparasion).toBeInTheDocument()
  const selectValue = screen.getByTestId('value-filter')
  expect(selectValue).toBeInTheDocument()
});
test('Testa o botão de remover todos os Filtros', async () => {
  render(<App />)
  const column = screen.getByTestId('column-filter')
  const comparison = screen.getByTestId('comparison-filter')
  const inputValue = screen.getByTestId('value-filter')
  const buttonFilter = await screen.findByTestId('button-filter', '', {timeout: 5000})
  const buttonRemoveAllFilters = screen.findByTestId('button-remove-filters')
  userEvent.selectOptions(column, 'population')
  userEvent.selectOptions(comparison, 'maior que')
  userEvent.clear(inputValue)
  userEvent.type(inputValue, '2000000')
  userEvent.click(buttonFilter)
  const planets = await screen.findAllByTestId('planet-name', '', {timeout: 5000})
  expect(planets).toHaveLength(6)
  expect(column).toHaveLength(4)
  userEvent.click(buttonRemoveAllFilters)
  const planets1 = await screen.findAllByTestId('planet-name', '', {timeout: 5000})
  expect(planets1).toHaveLength(10)
  expect(column).toHaveLength(5)
});
test('Testa o input de Ordenar por Ascendente', async () => {
  render(<App />);
  const planetList = ['Yavin IV', 'Tatooine', 'Bespin', 'Endor', 'Kamino', 'Alderaan', 'Naboo', 'Coruscant', 'Dagobah', 'Hoth'];
  const buttonOrder = await screen.findByTestId('column-sort-button', '', {timeout: 5000})
    const column = screen.getByTestId('column-sort')
    const radio = screen.getByTestId('column-sort-input-asc')
    userEvent.selectOptions(column, 'population')
    userEvent.click(radio)
    userEvent.click(buttonOrder)
    const planets = await screen.findAllByTestId('planet-name', '', {timeout: 5000})
    expect(planets).toHaveLength(10)
    planets.forEach((planet, index) => expect(planet).toHaveTextContent(planetList[index]))
});
test('Testa o input de Ordenar por Descendente', async () => {
  render(<App />);
  const planetList = ['Coruscant', 'Naboo', 'Alderaan', 'Kamino', 'Endor', 'Bespin', 'Tatooine', 'Yavin IV', 'Dagobah', 'Hoth'];
  const buttonOrder = await screen.findByTestId('column-sort-button', '', {timeout: 5000})
    const column = screen.getByTestId('column-sort')
    const radio = screen.getByTestId('column-sort-input-desc')
    userEvent.selectOptions(column, 'population')
    userEvent.click(radio)
    userEvent.click(buttonOrder)
    const planets = await screen.findAllByTestId('planet-name', '', {timeout: 5000})
    expect(planets).toHaveLength(10)
    planets.forEach((planet, index) => expect(planet).toHaveTextContent(planetList[index]))
});
test('Testa o filtro de igual', async () => {
  jest.useFakeTimers();
  jest.spyOn(global, 'fetch')
    .mockResolvedValue({
      json: jest.fn().mockResolvedValue(response),
    });
  render(<App />);
  const btFilter = screen.getByTestId('button-filter');
  const selectComparasion = screen.getByTestId('comparison-filter');
  userEvent.selectOptions(selectComparasion, ['igual a']);
  const input = screen.getByRole('spinbutton');
  const colunmSelect = screen.getByTestId('column-filter')
  userEvent.selectOptions(colunmSelect, ['population']);
  userEvent.type(input, "1000");
  userEvent.click(btFilter);
});
test('Testa se os filtros funcionam corretamente', async () => {
  jest.useFakeTimers();
  jest.spyOn(global, 'fetch')
    .mockResolvedValue({
      json: jest.fn().mockResolvedValue(response),
    });
  render(<App />);
  const tabela =  await screen.findByRole('cell', { name: /Yavin IV/i})
  expect(tabela).toBeInTheDocument()
  const btFilter = screen.getByTestId('button-filter');
  userEvent.click(btFilter);
  const deletar = screen.getByText("x");
  userEvent.click(deletar)
  const selectComparasion = screen.getByTestId('comparison-filter');
  userEvent.selectOptions(selectComparasion, ['menor que']);
  userEvent.click(btFilter);
  const deletar2 = screen.getByText("x");
  userEvent.click(deletar2);
  const escrever = screen.getByTestId("name-filter");
  userEvent.type(escrever, "Tatooine")
  userEvent.click(btFilter);
  const deletarTudo = screen.getByTestId("button-remove-filters")
  userEvent.click(deletarTudo)
  const escreverTexto = screen.getByTestId("value-filter")
  userEvent.type(escreverTexto, "123");
  const coluna = screen.getByTestId("column-filter")
  userEvent.selectOptions(coluna, ["diameter"]);
  userEvent.type(escreverTexto, "7200");
  userEvent.selectOptions(selectComparasion, ['menor que']);
  userEvent.click(btFilter);
    expect(global.fetch).toBeCalledTimes(1);
});
