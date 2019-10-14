import React, { useState, useEffect } from 'react';
import Header from './Header'
import Generos from './Generos'
import NovoGenero from './NovoGenero'
import EditarGenero from './EditarGenero'
import Funcao from './Funcao'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'


const Home = () => {

    return <h1> Home </h1>
}


function App() {
  const[data, setData] = useState({})
  useEffect (() => {
    axios.get('/api').then(res => {
      setData(res.data)
     
    })   
  }, [])


  return (
    <Router>
      <div>
        <Header />
        <Route path='/' exact component={Home} />
        <Route path='/generos' exact component={Generos} />
        <Route path='/generos/:id' component={EditarGenero} />
        <Route path='/generos/novo' component={NovoGenero} />
        <Route path='/funcion' component={Funcao} />
        <pre> {JSON.stringify(data)}</pre>
      </div>
    </Router>     
  )
}

export default App;
