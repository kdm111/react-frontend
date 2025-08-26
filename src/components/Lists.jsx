import List from "./List"

export default function Lists({todoData, setTodoData}) {

  return (
      <div>
        {
          todoData.map((todo) => (
            <List 
              todo = {todo}
              todoData = {todoData}
              setTodoData = {setTodoData}
            />
          ))
        }
      </div>
  )
}