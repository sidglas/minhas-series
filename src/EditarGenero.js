import React , { useState , useEffect} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

//const EditarGenero = (props) => {
 // const match = props.match

const EditarGenero = ({ match }) => {  
 
  const { id } = match.params 
  const[name, setName] = useState('')
  const[success, setSuccess] = useState(false)

  useEffect(() => {

    axios
      .get('/api/genres/' + id)
      .then(res=> {
        setName(res.data.name)
      })

  }, [id])


  const onChange = evt => {
    setName(evt.target.value)
  }

  const save = () => {
    axios
    .put('/api/genres/' + id, { name })

    .then(setSuccess(true))

   }
   if (success) {

      return <Redirect to='/generos' />
   }

  return (

    <div className='container'>
    <h1>Editar Gênero </h1>

      <form>
        <div className='form-group'>
          <label htmlFor='name'>Nome</label>
          <input type='text' value={name} onChange={onChange} className='form-control' 
            id='name' placeholder='Nome do Gênero' />  
        </div>
        <button type='button' onClick={save} className='btn btn-primary'>Salvar</button>
      </form>

    </div>  
  )
}

export default EditarGenero