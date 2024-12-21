import './App.css';
import { useEffect, useState } from 'react';
import {Button ,EditableText, InputGroup} from '@blueprintjs/core'
function App() {
  const [User, Setuser] = useState([]);
  const [newname,Setnewname]=useState("")
  const [newEmail,SetnewEmail]=useState("");
  const [newPhone,SetnewPhone]=useState("")
  console.log(newname)
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((json) => Setuser(json));
  }, []);

  // add the user data 
  function Adddata(){
    const name = newname.trim();
    const email = newEmail.trim();
    const phone = newPhone.trim();
    if(name && email && phone){ 
      fetch("https://jsonplaceholder.typicode.com/users",{
        method:"POST",
        body:JSON.stringify({
          name,
          email,
          phone
        }),
        headers:{
          "Content-type":"application/json;charset=UTF-8"
        }
      })
      .then((res)=>res.json())
      .then((data)=>{
        Setuser([...User,data]);
        alert("Added successfully")
        SetnewEmail("")
        SetnewPhone("")
        Setnewname("")
      })
    }
  }
  function Addupdate(id,key,values){
    Setuser((users)=>{
     return  users.map(user=>{
       return user.id===id ? {...user,[key]:values}:user;
      })
    })
  }
  // update url is different you need to change that using "PUT" method
  function update(id){
    const user =User.find((user)=>user.id ===id);
    fetch(`https://jsonplaceholder.typicode.com/${id}`,{
      method:"PUT",
      body:JSON.stringify({
        user
      }),
      headers:{
        "Content-type":"application/json;charset=UTF-8"
      }
    })
    .then((res)=>res.json())
    .then((data)=>{
      // Setuser([...User,data]);
      if (window.confirm("Are you sure you want to delete this row?")) {
        alert("User Deleted Successfully");
      }
      
    })

  }
  function userdelete(id) {
    if (!window.confirm("Are you sure you want to delete this row?")) {
      return;
    }
  
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete user");
        }
        return res.json();
      })
      .then(() => {
        Setuser((users) => users.filter((user) => user.id !== id));
        alert("User Deleted Successfully");
      })
      .catch((err) => {
        console.error(err);
        alert("Error deleting user!");
      });
  }
  
  return (
    <div className="App">
      <table className="bp4-html-table modifier">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>operations</th>
          </tr>
        </thead>
        <tbody>
          {User.map((data, id) => (
            <tr key={id}>
              <td>{data.id}</td>
              <td><EditableText onChange={values=>Addupdate(data.id,'name',values)} value={data.name}/></td>
              <td><EditableText onChange={values=>Addupdate(data.id,'email',values)} value={data.email}/></td>
              <td><EditableText onChange={values=>Addupdate(data.id,'phone',values)} value={data.phone}/></td>
              <td><Button intent ="primary" className='actionbutton' onClick={()=>{update(data.id)}}>Update</Button>
              &nbsp;
                  <Button intent='danger' className='actionbutton' onClick={()=>{userdelete(data.id)}}>Delete</Button></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
          <td></td>
            <td>
              <InputGroup value={newname}
                onChange={(e)=>
                  Setnewname(e.target.value)}
                  placeholder="Enter your Name"
                />
            </td>
            <td>
              <InputGroup value={newEmail}
                onChange={(e)=>
                  SetnewEmail(e.target.value)}
                  placeholder="Enter your Email"
                />
            </td>
            <td>
              <InputGroup value={newPhone}
                onChange={(e)=>
                  SetnewPhone(e.target.value)}
                  placeholder="Enter your Number"
                />
            </td>
            <td>
              <Button intent='success' onClick={Adddata}>Add</Button>
            </td>
          </tr>
        </tfoot>   
      </table>
    </div>
  );
}

export default App;
