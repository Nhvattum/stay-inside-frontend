import React, { useState } from 'react'
import ShowComment from '../comments/ShowComment'
import axios from 'axios'
import { Redirect } from 'react-router-dom';

export default function NewComment() {
  let [commentCreated, setCreatedComment] = useState(false)
  let [inputs, setInputs] = useState({
    name: '',
    content: '',
  })

  let commentSubmit = e => {
    e.preventDefault()
      axios.post('http://localhost:3000/comments', inputs)
      .then(response => {
          console.log(response)
          setCreatedComment(true)
      })
      .catch(err => {
        console.log('🔥🔥🔥🔥')
        console.log(err)
      })
    }

  const handleInputChange = e => {
    e.persist()
    setInputs({...inputs, [e.target.name]: e.target.value})
  }

  if (commentCreated) {
    return <Redirect to='/' />
  }

  return (
    <div>
      <form onSubmit={commentSubmit}>
        <div class="form-group">
          <label for="exampleFormControlInput1">Name</label>
          <input type="text" name='name' class="form-control" id="exampleFormControlInput1" onChange={handleInputChange} />
        </div>
        <div class="form-group">
          <label for="exampleFormControlTextarea1">Comment</label>
          <input type="text" name='content' class="form-control" id="exampleFormControlInput1" onChange={handleInputChange} />
        </div>
        <button className='btn' type='submit'>Submit</button>
      </form>
      <ShowComment />
    </div>
  )
}