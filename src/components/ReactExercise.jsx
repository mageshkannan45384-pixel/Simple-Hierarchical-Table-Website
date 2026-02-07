import React, { useState } from "react";

const ToDoList = () => {
  const [task, setTask] = useState("");
  const [newTask, setNewTask] = useState([]);

  const handleTask = (e) => {
    const content = e.target.value;
    setTask(content);
  };

  const addTasks = () => {
    if (task.trim() !== "") {
      setNewTask([...newTask, task]);
      setTask("");
    }
  };

  const deleteTasks = (index) => {
    const removeTask = newTask.filter((_, i) => i !== index);
    setNewTask(removeTask);
  };

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <h2>📝 My To-Do List</h2>
        <input
          value={task}
          type="text"
          onChange={handleTask}
          placeholder="Enter your task"
        />
        <button onClick={addTasks}>Add</button>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {newTask.map((t, index) => (
            <li key={index} style={{ margin: "10px 0" }}>
              {t}
              <button onClick={() => deleteTasks(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ToDoList;

// import React, { useState } from "react";
// import useFetch from "./useFetch";

// const LoadData = () => {
//   const URL = "https://jsonplaceholder.typicode.com/todos";
//   const [apiData, loading, error] = useFetch(URL);
//   const [page, setPage] = useState(1);
//   const numberOfDatas = 10;
//   const lastIndex = page * numberOfDatas;
//   const firstIndex = lastIndex - numberOfDatas;
//   const currentData = apiData.slice(firstIndex, lastIndex);
//   const totalPages = Math.ceil(apiData.length / numberOfDatas);
//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;
//   return (
//     <>
//       <h3>API Data</h3>
//       {currentData.map((user) => (
//         <div key={user.id}>
//           {user.title} - {String(user.completed)}
//         </div>
//       ))}
//       <button style={{border: '2px solid red'}}
//       onClick={() => setPage(p => p - 1)} disabled={page === 1}>
//         Previous
//       </button>
//       <button style={{border: '2px solid red'}}
//         onClick={() => setPage(p => p + 1)}
//         disabled={page === totalPages}
//       >
//         Next
//       </button>
//     </>
//   );
// };
// export default LoadData;

//Custom component:
// import { useState, useEffect } from "react";

// const useFetch = (url) => {
//   const [apiData, setApiData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!url) return;
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await fetch(url);
//         if (!res.ok) throw new Error("Data not showing");
//         const data = await res.json();
//         setApiData(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [url]);
//   return [apiData, loading, error];
// };

// export default useFetch;

// Use Transition with program:
// import React, { useState, useTransition, useEffect } from 'react';

// const UseTransitionP = () => {
//   const [text, setText] = useState('');
//   const [count, setCount] = useState(0);
//   const [isPending, startTransition] = useTransition();
//   const [showLoading, setShowLoading] = useState(false);

//   const handleChange = (e) => {
//     const value = e.target.value;
//     setText(value);
//     setShowLoading(true);
//     startTransition(() => {
//       setCount(prev => prev + 1);
//     });
//   };

//   useEffect(() => {
//     if (!isPending && showLoading) {
//       const timer = setTimeout(() => {
//         setShowLoading(false);
//       }, 2000);
//       return () => clearTimeout(timer);
//     }
//   }, [isPending, showLoading]);

//   return (
//     <>
//       <div>Count value: {count}</div>
//       {showLoading && <p>Loading...</p>}
//       <input
//         type="text"
//         value={text}
//         onChange={handleChange}
//       />
//     </>
//   );
// };
// export default UseTransitionP;

// const StarRating = ({ totalStars = 5 }) => {
//   const [rating, setRating] = useState(0);
//   const [hover, setHover] = useState(0);

//   return(
//     <>
//       <div style={{ fontSize: "30px", cursor: "pointer" }}>
//         {
//           [...Array(totalStars)].map((_, index) => {
//             const starValue = index + 1;
//             return(
//               <span key={index} onClick={() => setRating(starValue)}
//                onMouseEnter={() => setHover(starValue)}
//                onMouseLeave={() => setHover(0)}
//                style={{color: starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}}>
//                 ★
//               </span>
//             )
//           })
//         }
//         <p>Rating: {rating}</p>
//       </div>
//     </>
//   )
// }
// export default StarRating;
