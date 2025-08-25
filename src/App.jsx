import { Component } from 'react'
import './App.css'


// class component
export default class App extends Component {

  // react component에 상태를 등록한다.
  state = {
    todoData : [
      {
        id: '1',
        title : 'study',
        completed : true
      },
      {
        id: '2',
        title : 'clean up',
        completed : false
      }
    ],
    value: ''
  }

  // 고정된 스타일 생성
  btnStyle = {
    color: '#ffffff',
    border: 'none',
    padding: '5px 9px',
    borderRadius : '50%',
    cursor: 'pointer',
    float: 'right',
  }

  // style을 받아서 다이나믹하게 사용
  getStyle = (completed) => {
    return {
      padding: '10px',
      borderBottom : '1px #cccccc dotted',
      textDecoration : completed ? 'line-through' : 'none'
    }
  }

  handleClick = (id) => {
    // 얕은 복사본을 생성하고 필터링을 한다. 
    let newTodoData = this.state.todoData.filter((todo) => todo.id !== id)
    this.setState({todoData: newTodoData})
  }

  handleChange = (e) => {
    this.setState({value : e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault() // form 안에서 submit이 될 경우 page refresh를 막아주는 역할을 한다.

    let newTodo = {
      id : Date.now(),
      title : this.state.value,
      completed : false
    }
    this.setState({
      todoData : [...this.state.todoData, newTodo],
      value : ''
    }) // spread operator ... 사용
  }

  handleCompleteChange = (id) => {
    let newTodoData = this.state.todoData.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    })
    this.setState({todoData : newTodoData})
  }

  render() {
    return (
      <div className='container'>
        <div className='todoBlock'>
          <div className='title'>
            <h1>TODO LIST</h1>
          </div>
          {
            this.state.todoData.map((todo) => (
              <div key={todo.id} style={this.getStyle(todo.completed)}>
                <input 
                  type='checkbox' 
                  checked={todo.completed}
                  onChange={() => {this.handleCompleteChange(todo.id)}}
                />
                { todo.title }
                <button style={this.btnStyle} onClick={() => this.handleClick(todo.id)}>X</button>
              </div>
            ))
          }

          <form style={{display : 'flex', }} onSubmit={(e) => {this.handleSubmit(e)}}>
            <input 
              type='text' 
              name='value' 
              style={{flex : '10', padding : '5px'}}
              placeholder='할 일을 입력하세요'
              value={this.state.value}
              onChange={(e) => {this.handleChange(e)}}
            />
            <input 
              type='submit'
              value='입력'
              className='btn'
              style={{flex : '1'}}
            />
            
          </form>
        </div>
      </div>
    )
  }
}