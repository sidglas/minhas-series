import React, {useState, useEffect} from 'react';
import axios from  'axios';
import {Link} from 'react-router-dom';

const Series = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios
        .get('api/series')
        .then(res =>{
            setData(res.data.data)
        })
    },[]);
    console.log(data)
    const renderizaLinha = record => {
        return (
            <tr key={record.id}>
                <th scope="row">{record.id}</th>
                <td>{record.name}</td>
                <td>
                    <button className="btn btn-danger" style={{marginRight:'10px'}} onClick={() => deleteSerie(record.id)}>Excluir</button>
                    <Link className="btn btn-warning" to={'/series/' + record.id}>Info</Link>
                </td>
            </tr>
        )
    }

    //Caso não exista nenhum genero cadastrado no BDS
    if(data.length === 0){
        return(
            <div className="container">
                <h1>Séries</h1>
                <Link to="/series/novo/" className="btn btn-primary">Nova Série</Link>
                <div className="alert alert-info" role="alert">
                Nenhuma série cadastrada!
                </div>
            </div>
        )
    }

    //Deletar Genero
    const deleteSerie = id =>{
        axios.delete('/api/series/'+id)
        .then(res=>{
            const filtrado = data.filter(item => item.id !== id);
            setData(filtrado);
        })
    }

    console.log(data);

    return (
    <div className="container">
        <h1>Séries</h1>
        <Link to="/series/novo/" style={{marginTop:'10px', marginBottom:'10px'}} className="btn btn-primary">Nova Série</Link>
        <table className="table table-dark">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">NOME</th>
                    <th scope="col">AÇÕES</th>
                </tr>
            </thead>
            <tbody>
                {data.map(renderizaLinha)}
            </tbody>
        </table>
    </div>);
}

export default Series;