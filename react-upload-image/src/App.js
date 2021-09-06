import React, {useState} from 'react'

import './App.css'
import axios, {post} from 'axios'

function App() {
  const [file, setFile] = useState(null)
  const onFormSubmit = (e) => {
    e.preventDefault() // Stop form submit
    fileUpload(file).then((response) => {
      console.log(response.data)
    })
  }
  const onChange = (e) => {
    setFile(e.target.files[0])
    console.log('file', e.target.files[0])
  }
  const fileUpload = (file) => {
    console.log('file1', file)
    const url = 'http://localhost:5000/user/register'
    const formData = new FormData()
    const person = {email: 'test@tes.com', password: '123456', lastName: 'med'}

    formData.append('user', JSON.stringify(person))
    formData.append('file', file)
   /*  const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    } */
    return post(url, formData)
  }
  return (
    <div className='App'>
      <form onSubmit={onFormSubmit}>
        <h1>File Upload</h1>
        <input type='file' onChange={onChange} />
        <button type='submit'>Upload</button>
      </form>
    </div>
  )
}

export default App
