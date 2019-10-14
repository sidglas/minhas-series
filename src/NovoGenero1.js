import React ,{ useState } from 'react'

const NovoGenero = () => {
	const[name, setName] = useState('')
	const onChange = evt => {
		console.log(evt.target.value)
	} 
    return (
      <div className='container'> 
        <h1> Novo Gênero </h1>
        <form>
  		    <div className='container'>
    		    <label htmlFor='name'> Nome </label>
    		    <input type='text'  value={name} className='form-control' onChange={onChange}  
              id='name' placeholder='Nome do Gênero' />
  		    </div>
  		    <button type='button' className='btn btn-primary'>Salvar</button>
        </form>
      </div>

    )
} 

export default NovoGenero