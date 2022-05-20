
import {useState, useEffect, useCallback} from 'react'

import "./App.css"

import Form from "./components/Form"
import TodoList from "./components/TodoList"


function App() {

  const getLocalTodos = () => {
    if(localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]))
    } else {
     let todoLocal =  JSON.parse(localStorage.getItem('todos'))
     setTodos(todoLocal)
    }
  }


  //Run once when the app starts
  useEffect(() => {
    getLocalTodos()
  }, [])
  
  //State
  const [inputText, setInputText] = useState("")
  const [todos, setTodos] = useState([])
  const [status, setStatus] = useState('all')
  const [filteredTodos, setFilterTodos] = useState([])

  //save to local

  const saveLocalTodos =  useCallback(() => {
   
    localStorage.setItem('todos', JSON.stringify(todos))
  
  }, [todos])


  
  const filterHandler = useCallback(() => {
    switch(status) {
      case 'completed':
        setFilterTodos(todos.filter(todo => todo.completed === true))
        break;
      case 'uncompleted':
        setFilterTodos(todos.filter(todo => todo.completed === false))
        break;

      default:
        setFilterTodos(todos)
        break;
    }
  }, [todos,status ])


  //Use Effect
  useEffect(()=> {
    // getLocalTodos()
    filterHandler()
    saveLocalTodos()
  }, [todos, status,   saveLocalTodos, filterHandler])
  //Functions
 

  // useEffect(() => {
    
  // }, [filterHandler])

  
  return (
    <div className="App">
      <header>
      <h1>Will's To Do List</h1>
      </header>
      
      <Form todos={todos} setTodos={setTodos}  setInputText={setInputText} inputText={inputText} setStatus={setStatus} />
      <TodoList todos={todos} setTodos={setTodos} filteredTodos={filteredTodos}/>
    </div>
  )
}
export default App