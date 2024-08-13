import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { IoMdAdd } from "react-icons/io";   //react icon for add button
import { FaEdit } from "react-icons/fa";   //react icon for edit button
import { MdDelete } from "react-icons/md";   //react icon for delete button

//uuid --> used to create a unique id (first install npm package = npm i uuid and then copy paste these 2 lines from website https://www.npmjs.com/package/uuid)
import { v4 as uuidv4 } from 'uuid';


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  }, [])
  

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  
  const handleEdit = (e, id)=>{ 
    let t = todos.filter(i=>i.id === id) 
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    saveToLS()
  }

  const handleDelete= (e, id)=>{  
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    saveToLS()
  }

  const handleAdd= ()=>{
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("") 
    saveToLS()
  }
  
  const handleChange= (e)=>{ 
    setTodo(e.target.value)
  }
  
  const handleCheckbox = (e) => { 
    let id = e.target.name;  
    let index = todos.findIndex(item=>{
      return item.id === id;
    }) 
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }

  return (
    <>
      <Navbar/>
      <div className="container w-3/5 mx-auto my-5 rounded-xl p-5 bg-stone-600 min-h-[80vh] justify-between">
      <h1 className='font-bold text-center text-3xl text-slate-50'>TaskTick - Plan it. Do it. Achieve it.</h1>
        <div className="addTodo my-5">
          <h2 className='text-xl font-bold text-white my-3'>Add a To-Do</h2>
          <div className='flex'>
          <input onChange={handleChange} value={todo} type="text" className='flex w-4/5 rounded-3xl px-2 py-1 font-medium'/>
          <button onClick={handleAdd} disabled={todo.length<=1} className='flex gap-1 items-center ml-6 p-8 py-1 rounded-full bg-slate-100 font-bold hover:bg-slate-300 hover:cursor-pointer '> <IoMdAdd />Add</button>
          </div>
        </div>
        <div className='flex gap-3 items-center justify-center text-center'>
        <input className='flex text-center' onChange={toggleFinished} type="checkbox" checked = {showFinished}/> <div className='flex rounded-md text-xl bg-slate-100 bg-opacity-70 w-64 px-4 py-2 font-extrabold'>Show Finished To-Dos</div> </div>
        <h2 className='text-white text-lg font-bold'>Your To-dos</h2>
        <div className="todos">
          {todos.length ===0 && <div className='text-center items-center font-semibold text-2xl bg-neutral-300 rounded-lg my-3 py-3'>No To-dos to display</div>}
          {todos.map(item =>{

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex items-center justify-between my-3">
              <div className="flex gap-5">
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
              <div className={`bg-white rounded-lg p-3 py-1 from-neutral-600 font-semibold ${item.isCompleted ? "line-through" : ""}`}> {item.todo} </div>


            </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>handleEdit(e, item.id)} className='flex items-center gap-1 p-3 py-1 rounded-md bg-slate-100 font-semibold hover:bg-slate-300 mx-1'> <FaEdit /> Edit</button>
                <button onClick= {(e)=>{handleDelete (e, item.id)}} className='flex items-center gap-1 p-3 py-1 rounded-md bg-slate-100 font-semibold hover:bg-slate-300 mx-1'> <MdDelete /> Delete</button>
              </div>
          </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
