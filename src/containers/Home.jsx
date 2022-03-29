import React, { useContext } from 'react';
import Products from '../components/Products';
import { AppContext } from '../context/AppContext';

const Home = () => {
  const { state } = useContext(AppContext);

  return <Products products={state.products} />;
};

export default Home;
