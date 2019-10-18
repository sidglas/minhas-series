import React , { useState , useEffect} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'




const NovaSerie = () => {
  const[name, setName] = useState('')
  const[success, setSuccess] = useState(false)
  const[form, setForm] = useState([])
  const[genres, setGenres] = useState([])

  useEffect(() => {

    axios
    .get('/api/genres')
    .then(res =>{
        setGenres(res.data.data)
    })  
  }, [])


  const onChange = evt => {
    setName(evt.target.value)
  }


  const onChange1 = field => evt => {

    console.log('CAMPO CAMPO', field)

    if (field !== 'genre_id') {

      console.log('Realmente nao estou em Gênero...')
      setForm({
        ...form,
        [field]: evt.target.value })

    } else {

      let elem = document.getElementById('genero')
      let item = elem.options[elem.selectedIndex]

      console.log(item, 'AA')
      console.log(elem.options[elem.selectedIndex].text, 'BB')
      console.log(item.text, 'CC')

      setForm({
        ...form,
        [field]: evt.target.value , 
        genre: item.text
      })



      console.log('form form form', form)
    }
  }

  
  const save = () => {

      console.log('Vamos ver  form ', {form})
      let elem = document.getElementById('genero')
      let item = elem.options[elem.selectedIndex]

  axios
    .post('/api/series', form)
    .then(res => { 
      setSuccess(true) 
    })

  }
  if (success) {
     return <Redirect to='/series' />
  }

  return (
//.then(setSuccess(true))
    <div className='container'>
    <h1>Nova Série </h1>

      <form>
        <div className='form-group'>
          <label htmlFor='name'>Nome</label>
          <input type='text' value={form.name} onChange={onChange1('name')} className='form-control' 
            id='name' placeholder='Nome da Série' />  
        </div>

        <div className='form-group'>
          <label htmlFor='name'>Gênero</label>
          <select className='form-control' id="genero" onChange={onChange1('genre_id')} value={form.genre_id}>
            { genres.map(genre => <option key={genre.id} value={genre.id} selected={genre.id === form.genre}>{genre.name}</option>) }
          </select>
        </div>

        <button type='button' onClick={save} className='btn btn-primary'>Salvar</button>
      </form>

    </div>  
  )
}

export default NovaSerie