import React, {useState} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

const NovoGenero = () => {

    const [name, setName] = useState('');
    const [success, setSucces] = useState(false);

    const onchange = evt =>{
        setName(evt.target.value);
    }
    
    const save = () =>{
        axios
//        .post('/api/genres', {name:name})
        .post('api/genres', {name})
        .then(res => {
            console.log(res)
           //setSucces(true);
        })
    }

    if(success){
        //Redirecionar para outra página
        return <Redirect to="/generos" />
    }

    return (
        <div className="container">
            <h1>Novo Genêro</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Nome</label>
                    <input value={name} onChange={onchange} type="text" className="form-control" id="name" placeholder="Nome"></input>
                </div>
                <button type="button" onClick={save} className="btn btn-primary">Salvar</button>
            </form>
        </div>
    )
};

export default NovoGenero;