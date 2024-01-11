// import { useState } from 'react'
// // import   from 'App.css'


// function App() {
//   const [text, setText] = useState("")
//   const [todo, setTodo] = useState([])

//   function addtodo(e){
//     e.preventDefault();
//     todo.push(text)
//     setTodo([...todo])
//     console.log(todo);
//     setText("")

//   }
//   function deletetodo(index){
//     const newarr = [...todo]
//     newarr.splice(index , 1)
//     console.log(newarr);    
//     setTodo(newarr)

//   }

//   function edittodo(index){
//     const newarr = [...todo]
//     let edit = prompt("enter your todo")
//     if(edit === ""){
//       alert("enter any value")
//       return;
//     }
//     newarr[index]= edit
//     setTodo(newarr)
//   }



//   return (
//     <>
//       <h1 class="heading">Todo-App</h1>
//       <form class="form" onSubmit={addtodo}>
//         <input onChange={(e)=> setText(e.target.value)} value={text} type="text" placeholder='Enter your todo' class="user_input" />
//         <button type='submit' class="submit-btn">Submit</button>
//       </form>
//       <ul class="li-div">
//         {todo.map((item , index)=>{
//           return (
//             <li key={index} class="todo-li">  {item} <button class="del" onClick={()=>{deletetodo(index)}}>Delete</button><button class="edit" onClick={()=>{edittodo(index)}}>Edit</button></li>
//           )
//         })}
//       </ul>
//     </>
//   )
// }

// export default App








// src/App.js
import React, { useState, useEffect } from 'react';
import { auth, firestore } from './firebase';

function App() {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const todosRef = firestore.collection('todos').where('uid', '==', user.uid);

      const unsubscribe = todosRef.onSnapshot((snapshot) => {
        const newTodos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTodos(newTodos);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const handleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);
  };

  const handleLogout = () => {
    auth.signOut();
  };

  const addTodo = async () => {
    if (newTodo.trim() !== '') {
      await firestore.collection('todos').add({
        text: newTodo,
        uid: user.uid,
      });
      setNewTodo('');
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Hello, {user.displayName || user.email}!</p>
          <button onClick={handleLogout}>Logout</button>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>{todo.text}</li>
            ))}
          </ul>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button onClick={addTodo}>Add Todo</button>
        </div>
      ) : (
        <div>
          <p>Please log in to access the Todo app.</p>
          <button onClick={handleLogin}>Login with Google</button>
        </div>
      )}
    </div>
  );
}

export default App;
