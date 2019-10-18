import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {Badge} from 'reactstrap';

const InfoSerie = ({match}) => {

    const [form, setForm] = useState({});
    const [success, setSucces] = useState(false);
    const [mode, setMode] = useState('INFO');
    const [data, setData] = useState({});
    const [genres, setGenres] = useState([]);

    //Pega dados da série
    useEffect(()=>{
        axios
        .get('/api/series/'+match.params.id)
        .then(res=>{
            setData(res.data);
            setForm(res.data);
        })
    },[match.params.id])

    //Pega dados dos generos
    useEffect(()=>{
        axios
        .get('/api/genres')
        .then(res =>{
            setGenres(res.data.data)
        })

    },[])


    const onchange = field => evt =>{

        setForm({
            ...form,
            [field]: evt.target.value
        });        
    }
    const onchange1 = field => evt =>{


            if (field == 'genre_id') {
                console.log('SIMMMMMMMM')
                let elem = document.getElementById('genero')
                let item = elem.options[elem.selectedIndex]
                console.log(item)


                console.log(elem.options[elem.selectedIndex].text)

                console.log(item.text)

                setForm({
                    ...form,
                    genre: item.text
                })                        

                    
 
            } else {
                console.log('NÃOOOOOOOO') 
                console.log(field) 
            }        
    }

    const seleciona = value => () => {
        setForm({
            ...form,
            status: value
        })
    }
    
    const save = () =>{
        axios
        .put('/api/series/'+match.params.id, form)
        .then(res => {
            setSucces(true);
        })
    }

    const masterHeader = {
        height: '50vh',
        minHeight: '500px',
        backgroundImage: `url('${data.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }

    if(success){
        //Redirecionar para outra página
        return <Redirect to="/series" />
    }

    return (
        <div>
            <header style={masterHeader}>
                <div className="h-100" style={{background:'rgba(0,0,0,0.7)'}}>
                    <div className="h-100 container">
                        <div className="row h-100 align-items-center">
                            <div className="col-3">
                                <img alt={data.name} src={data.poster} className="img-fluid img-thumbnail"></img>
                            </div>
                            <div className="col-8">
                                <h1 className="font-wight-light text-white">{data.name}</h1>
                                <div className="lead text-white">
                                    {data.status === "ASSISTIDO" && 
                                    <Badge color="success">Assistido</Badge>}
                                    {data.status === "PARA_ASSISTIR" &&
                                    <Badge color="warning">Para Assistir</Badge>}
                                    <br/>
                                    Gênero: {data.genre} 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="container" style={{marginTop:'10px', marginBottom:'10px'}}>
                <button className="btn btn-primary" onClick={() => setMode('EDIT')}>EDITAR</button>
            </div>
            {mode === 'EDIT' &&
            <div className="container">
                <h1>Editar Série</h1>
                <pre> { JSON.stringify(form) } </pre>
                <button className="btn btn-primary" style={{marginTop:'10px', marginBottom:'10px'}} onClick={() => setMode('INFO')}>CANCELAR EDIÇÃO</button>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Nome</label>
                        <input value={form.name} onChange={onchange('name')} type="text" className="form-control" id="name" placeholder="Nome"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="comentario">Comentários</label>
                        <input value={form.comments} onChange={onchange('comments')} type="text" className="form-control" id="comments" placeholder="Comentário"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="genero">Gênero</label>
                        <select className="form-control" id="genero" onChange={onchange1('genre_id')} value={form.genre_id}>
                            <option key="0" value="0">Selecione</option>
                            { genres.map( genre => <option key={genre.id} value={genre.id} selected={genre.id === form.genre_id}>{genre.name}</option>) }
                        </select>
                    </div>
                    <div className="form-check">
                        <input checked={form.status === "ASSISTIDO"} className="form-check-input" type="radio" name="status" id="assistido" value="ASSISTIDO" onChange={seleciona('ASSISTIDO')} />
                        <label className="form-check-label" htmlFor="assistido">Assistido</label>
                    </div>
                    <div className="form-check">
                        <input checked={form.status === "PARA_ASSISTIR"} className="form-check-input" type="radio" name="status" id="paraAssistir" value="PARA_ASSISTIR" onChange={seleciona('PARA_ASSISTIR')} />
                        <label className="form-check-label" htmlFor="paraAssistir">Para Assistir</label>
                    </div>
                    <button type="button" style={{marginTop:'10px', marginBottom:'10px'}} onClick={save} className="btn btn-primary">Salvar</button>
                </form>
            </div>
            }
        </div>
    )
};

export default InfoSerie;