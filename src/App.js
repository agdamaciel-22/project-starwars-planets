import React from 'react';
import './App.css';
import TableProvider from './context/TableProvider';
import Table from './components/Table';
import Header from './components/Header';

function App() {
  return (
    <TableProvider>
      <Header />
      <Table />
    </TableProvider>
  );
}

export default App;
