import { useState } from 'react'
import './App.css'
import Lists from './components/Lists'
import Form from './components/Form'


// Function component
export default function App() {

  // 로컬스토리지의 데이터로 초기화
  const [todoData, setTodoData] = useState(
    localStorage.getItem('todoData') == undefined ? 
    JSON.parse(localStorage.getItem('todoData')) : 
    [{'id' : 1, 'title' : 'hello world', completed : false}]
  )
  const [value, setValue] = useState('')
  
    const handleSubmit = (e) => {
      e.preventDefault() // form 안에서 submit이 될 경우 page refresh를 막아주는 역할을 한다.
  
      let newTodo = {
        id : Date.now(),
        title : value,
        completed : false
      }
  
      setTodoData([...todoData, newTodo])
      setValue('')
      
    }

  return (
    <div className='container'>
      <div className='todoBlock'>
        <div className='title'>
          <h1>TODO LIST</h1>
        </div>
        <Lists
          todoData = {todoData}
          setTodoData = {setTodoData}
        />
        <Form 
          value = {value}
          setValue = {setValue}
          handleSubmit = {handleSubmit}
        />
      </div>
    </div>
  ) 
}