import { useEffect, useState } from 'react';
import './App.css';
import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';


function App() {
  const [isCompletescreen,setIsCompleteScreen]=useState(false);

  const [allToDos,setAllTodos]=useState([]);
  const [newTitle,setNewTitle]=useState("");
  const [newDescription,setNewDescription]=useState("");
  const [completedToDos,setCompletedToDos]=useState([]);

  const handleAddToDo=()=>{
    let newtoDoItem={
      title:newTitle,
      description:newDescription
    };

    let updatedToDoArr=[...allToDos];
    updatedToDoArr.push(newtoDoItem);
    setAllTodos(updatedToDoArr);
    localStorage.setItem('todolist',JSON.stringify(updatedToDoArr))
  };

  useEffect(()=>{
    let savedtoDo =JSON.parse(localStorage.getItem('todolist'));
    let savedComletedToDo=JSON.parse(localStorage.getItem('completedToDos'))
    if(savedtoDo){
      setAllTodos(savedtoDo);
    }
    if(savedComletedToDo){
      setCompletedToDos(savedComletedToDo);
    }
  },[]);

  const handleDeleteTodo=(index)=>{
    let reducedToDo=[...allToDos];
    reducedToDo.splice(index);
    localStorage.setItem('todolist',JSON.stringify(reducedToDo));
    setAllTodos(reducedToDo);
  }

  const handleComplete=(index)=>{
    let now=new Date();
    let dd= now .getDate();
    let mm=now.getMonth()+1;
    let yyyy=now.getFullYear();
    let h=now.getHours();
    let m=now.getMinutes();
    let s=now.getSeconds();
    let completedOn=dd+ '-'+mm +'-'+ yyyy+ 'at'+ h + ':' +m +':' +s ;
    let filteredItem ={
      ...allToDos[index],
      completedOn:completedOn
    }

    let updatedCompletedArr=[...completedToDos];
    updatedCompletedArr.push(filteredItem);
    setCompletedToDos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedToDos',JSON.stringify(updatedCompletedArr));
  };

  const handleDeleteCompletedTodo=(index)=>{
    let reducedToDo=[...completedToDos];
    reducedToDo.splice(index);
    localStorage.setItem('completedToDos',JSON.stringify(reducedToDo));
    setCompletedToDos(reducedToDo);
  }

  return (
    <div className="App">
      <h1>To-Do App </h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className="todo-input-item">
            <label>Title</label>
            <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="what is the Task?" />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder="what is the Description" />
          </div>
          <div className="todo-input-item">
            <button className="primary-btn" onClick={handleAddToDo} type='button'>Add</button>
          </div>
        </div>
        <div className="btn-area">
        <button className={`secondary-btn ${isCompletescreen===false&&'active'}`} onClick={()=>setIsCompleteScreen(false)}>To-Do</button>
        <button className={`secondary-btn ${isCompletescreen===true&&'active'}`} onClick={()=>setIsCompleteScreen(true)}>Completed</button>
        </div>
        <div className="to-do-list">
          {isCompletescreen===false && allToDos.map((items,index)=>{
            return(
              <div className="to-do-list-item" key={index}>
            <div>
              <h3>{items.title}</h3>
              <p>{items.description}</p>
            </div>
            <div>
              <AiOutlineDelete className='icons' onClick={()=>handleDeleteTodo(index)} title='Delete?'/>
              <BsCheckLg className='check-icon' onClick={()=>handleComplete(index)} title='Complete'/>
            </div>
          </div>
            )
          })}

          {isCompletescreen===true && completedToDos.map((items,index)=>{
            return(
              <div className="to-do-list-item" key={index}>
            <div>
              <h3>{items.title}</h3>
              <p>{items.description}</p>
              <p><small>Completed On : {items.completedOn}</small></p>
            </div>
            <div>
              <AiOutlineDelete className='icons' onClick={()=>handleDeleteCompletedTodo(index)} title='Delete?'/>
              
            </div>
          </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
