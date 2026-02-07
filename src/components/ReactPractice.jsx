import React, { useState } from 'react';

const StarRating = ({ totalStars = 5 }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return(
    <>
      <div style={{ fontSize: "30px", cursor: "pointer" }}>
        {
          [...Array(totalStars)].map((_, index) => {
            const starValue = index + 1;
            return(
              <span key={index} onClick={() => setRating(starValue)}
               onMouseEnter={() => setHover(starValue)}
               onMouseLeave={() => setHover(0)}
               style={{color: starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}}>
                ★
              </span>
            )
          })
        }
        <p>Rating: {rating}</p>
      </div>
    </>
  )
}
export default StarRating;

// import React, { useState } from 'react';
// function Typetext() {
//   const [showText, setShowText] = useState(false);
//   const [type, setType] = useState('');

//   const handleClick = () => {
//     setShowText(prev => !prev);
//   };

//   const textTyping = (e) => {
//     setType(e.target.value);
//   };

//   return (
//     <>
//       <div>Show text: {showText ? "Show" : "Hide"}</div>
//       <input
//         type="text"
//         value={type}
//         onChange={textTyping}
//       />
//       {showText && <div>Typed: {type}</div>}
//       <button onClick={handleClick}>Toggle Text</button>
//     </>
//   );
// }
// export default Typetext;

// import React, {useState, useEffect} from 'react';
// function Advise() {
// const [data, setData] = useState([]);
// const [page, setPage] = useState(1);
// const numberOfDatas = 3;

// useEffect(()=>{
//   fetch("https://jsonplaceholder.typicode.com/todos")
//   .then((res)=>res.json())
//   .then((data)=>setData(data))
//   .catch((err)=> console.error("Data not Showing", err))
// },[]);

// const lastIndexOfPage = page * numberOfDatas;
// const firstIndex = lastIndexOfPage - numberOfDatas;
// const currentData = data.slice(firstIndex, lastIndexOfPage);
// const totalPages = Math.ceil(data.length/numberOfDatas);

// const handleNext = () =>{
//   if(page < totalPages) setPage(page+1);
// }

// const handlePrevious = () =>{
//   if(page > 1) setPage(page-1);
// }

//   return(
//     <>
//     <div>Api Datas</div>
//     {currentData.map((user)=>(
//       <div key={user.id}>
//       {user.title} - {user.completed}
//       </div>
//     ))}
//     <button onClick={handlePrevious} disabled={page === 1}>Handle Next</button>
//     <button onClick={handleNext} disabled={page === totalPages}>Handle Previous</button>
//     </>
//   )
// }
// export default Advise;

// import React, { useState } from "react";
// function userDetails() {
//   const [value, setValue] = useState({ name: "magesh", age: 25 });
//   const handleClick = (e) => {
//     setValue({ ...value, [e.target.name]: e.target.value });
//   }
//   return (
//     <div>
//       <input type="text" value={value.name} name="name" onChange={handleClick} />
//       <input type="number" value={value.age} name="age" onChange={handleClick} />
//       <div>User name : {value.name}</div>
//       <div>User age : {value.age}</div>
//     </div>
//   );
// }
// export default userDetails;

// import React, { useState } from 'react';
// function Typetext(){
//   const [text, showText] = useState(false);
//   const [type, setType] = useState('');

//   const handleClick = () => {
//     showText(!text);
//   }
//   const textTyping = (e) => {
//     setType(e.target.value);
//   }
//   return(
//     <>
//       <div>Show text : {text ? "Show" : ""}</div>
//       <input type="text" onChange={textTyping}/>
//       <div>type {type}</div>
//       <button onClick={handleClick}>text show</button>
//     </>
//     )
// }
// export default Typetext;

// import React, { useState } from 'react';
// function ToDoList() {
//   const [task, setTask] = useState('');
//   const [tasks, setTasks] = useState([]);

//   const handleInputChange = (e) => {
//     setTask(e.target.value);
//   };

//   const addTask = () => {
//     if (task.trim() !== '') {
//       setTasks([...tasks, task]);
//       setTask('');
//     }
//   };

//   const deleteTask = (index) => {
//     const newTasks = tasks.filter((_, i) => i !== index);
//     setTasks(newTasks);
//   };

//   return (
//     <div style={{ textAlign: 'center', marginTop: '40px' }}>
//       <h2>📝 My To-Do List</h2>
//       <input
//         type="text"
//         value={task}
//         onChange={handleInputChange}
//         placeholder="Enter a task..."
//       />
//       <button onClick={addTask}>Add</button>

//       <ul style={{ listStyle: 'none', padding: 0 }}>
//         {tasks.map((t, index) => (
//           <li key={index} style={{ margin: '10px 0' }}>
//             {t}
//             <button
//               onClick={() => deleteTask(index)}
//               style={{ marginLeft: '10px', color: 'red' }}
//             >
//               x
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
// export default ToDoList;

// import { useState } from "react";

// const RegFrm = () => {
//   const [user, setUser] = useState({
//     name: "",
//     age: "",
//     gender: "",
//     isMarried: false,
//     country: "",
//     bio: "",
//   });

//   const [errors, setErrors] = useState({});

//   function changeHandler(e) {
//     const { name, type, value, checked } = e.target;

//     setUser((prev) => ({
//       ...prev,
//       [name]:
//         type === "checkbox"
//           ? checked
//           : type === "number"
//           ? Number(value)
//           : value,
//     }));

//     // Clear error while typing
//     setErrors((prev) => ({
//       ...prev,
//       [name]: "",
//     }));
//   }

//   function validate(values) {
//     const err = {};

//     if (!values.name.trim()) {
//       err.name = "Name is required";
//     }

//     if (values.age === "" || values.age === 0) {
//       err.age = "Age is required";
//     } else if (values.age < 18) {
//       err.age = "Age must be at least 18";
//     }

//     if (!values.gender) {
//       err.gender = "Gender is required";
//     }

//     if (!values.country) {
//       err.country = "Country is required";
//     }

//     if (!values.bio.trim()) {
//       err.bio = "Bio is required";
//     } else if (values.bio.length < 10) {
//       err.bio = "Bio must be at least 10 characters";
//     }

//     return err;
//   }

//   function submitHandler(e) {
//     e.preventDefault();
//     const validationErrors = validate(user);
//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length === 0) {
//       alert("Form submitted successfully!");
//       console.log(user);
//     }
//   }

//   return (
//     <>
//       {/* Preview Table */}
//       <table className="reg-table">
//         <tbody>
//           <tr>
//             <td>User Name</td>
//             <td>{user.name}</td>
//           </tr>
//           <tr>
//             <td>User Age</td>
//             <td>{user.age}</td>
//           </tr>
//           <tr>
//             <td>User Gender</td>
//             <td>{user.gender}</td>
//           </tr>
//           <tr>
//             <td>Married Status</td>
//             <td>{user.isMarried ? "Married" : "Unmarried"}</td>
//           </tr>
//           <tr>
//             <td>User Country</td>
//             <td>{user.country}</td>
//           </tr>
//           <tr>
//             <td>User Bio</td>
//             <td>{user.bio}</td>
//           </tr>
//         </tbody>
//       </table>

//       {/* Form */}
//       <form className="reg-form" onSubmit={submitHandler}>
//         {/* Name */}
//         <div className="field">
//           <label htmlFor="name">Full Name</label>
//           <input
//             id="name"
//             name="name"
//             type="text"
//             value={user.name}
//             onChange={changeHandler}
//           />
//           {errors.name && <small className="error">{errors.name}</small>}
//         </div>

//         {/* Age */}
//         <div className="field">
//           <label htmlFor="age">Age</label>
//           <input
//             id="age"
//             name="age"
//             type="number"
//             value={user.age}
//             onChange={changeHandler}
//           />
//           {errors.age && <small className="error">{errors.age}</small>}
//         </div>

//         {/* Gender */}
//         <div className="field">
//           <label>Gender</label>
//           <label>
//             <input
//               type="radio"
//               name="gender"
//               value="Male"
//               checked={user.gender === "Male"}
//               onChange={changeHandler}
//             />
//             Male
//           </label>
//           <label>
//             <input
//               type="radio"
//               name="gender"
//               value="Female"
//               checked={user.gender === "Female"}
//               onChange={changeHandler}
//             />
//             Female
//           </label>
//           {errors.gender && <small className="error">{errors.gender}</small>}
//         </div>

//         {/* Married */}
//         <div className="field">
//           <label>
//             <input
//               type="checkbox"
//               name="isMarried"
//               checked={user.isMarried}
//               onChange={changeHandler}
//             />
//             Married
//           </label>
//         </div>

//         {/* Country */}
//         <div className="field">
//           <label htmlFor="country">Country</label>
//           <select
//             name="country"
//             id="country"
//             value={user.country}
//             onChange={changeHandler}
//           >
//             <option value="">-- Select Country --</option>
//             <option value="India">India</option>
//             <option value="USA">USA</option>
//             <option value="UK">UK</option>
//             <option value="Canada">Canada</option>
//           </select>
//           {errors.country && <small className="error">{errors.country}</small>}
//         </div>

//         {/* Bio */}
//         <div className="field">
//           <label htmlFor="bio">Bio</label>
//           <textarea
//             id="bio"
//             name="bio"
//             value={user.bio}
//             onChange={changeHandler}
//           />
//           {errors.bio && <small className="error">{errors.bio}</small>}
//         </div>

//         <button type="submit">Submit</button>
//       </form>
//     </>
//   );
// };
// export default RegFrm;
