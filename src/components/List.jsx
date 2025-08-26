import { useState } from "react"

export default function List({todo, todoData, setTodoData}) {

  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(todo.title)
  
  const btnStyle = {
    color: '#ffffff',
    border: 'none',
    padding: '5px 9px',
    borderRadius : '50%',
    cursor: 'pointer',
    float: 'right',
  }

  const getStyle = (completed) => {
    return {
        padding: '10px',
        borderBottom : '1px #cccccc dotted',
        textDecoration : completed ? 'line-through' : 'none'
    }
  }

  const handleClick = (id) => {
    // 얕은 복사본을 생성하고 필터링을 한다. 
    let newTodoData = todoData.filter((todo) => todo.id !== id)

    setTodoData(newTodoData)
    // 현재 newTodoData는 배열이므로 로컬 스토리지 사용시에는 text로 변환해야 한다.
    localStorage.setItem('todoData', JSON.stringify(newTodoData))
  }

  const handleCompleteChange = (id) => {
    let newTodoData = todoData.map((todo) => {
        if (todo.id === id) {
        todo.completed = !todo.completed
        }
        return todo;
    })
    setTodoData(newTodoData)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newTodoData = todoData.map((el) => {
      if (el.id === todo.id) {
        el.title = editedTitle
      }
      return el
    })
    setTodoData(newTodoData)
    localStorage.setItem('todoData', JSON.stringify(newTodoData))
    setIsEditing(false)
    
  }

  if (isEditing) {
  return (
      <form onSubmit={(e) => handleSubmit(e)}>
        <div key={todo.id} style={getStyle(todo.completed)} >
        <input 
          type='text' 
          autoFocus
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />
        <button type='submit' style={btnStyle}>저장</button>
        <button style={btnStyle} onClick={() => setIsEditing(false)}>X</button>
        </div>
      </form>
   )} 
   return (
      <div key={todo.id} style={getStyle(todo.completed)}>
        <input 
          type='checkbox' 
          checked={todo.completed}
          onChange={() => {handleCompleteChange(todo.id)}}
        />

          { todo.title }
        <button style={btnStyle} onClick={() => {setIsEditing(true)}}>수정</button>
        <button style={btnStyle} onClick={() => handleClick(todo.id)}>X</button>
      </div>
   )
}