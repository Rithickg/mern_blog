import React, { useContext } from 'react'
import "./settings.css"
import Sidebar from "../../components/sidebar/Sidebar"
import { Context } from "../../context/Context";
import { useState } from 'react';
import axios from "axios";

export default function Settings() {
    const{user, dispatch}=useContext(Context);
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const PF ="http://localhost:2002/images/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type:"UPDATE_START"})
        const updatedUser = {
            userId: user._id, username,email,password,
        };
        if (file) {
            const data =new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedUser.profilePic = filename;
            try {
            await axios.post("http://localhost:2002/api/upload", data);
            } catch (err) {}
        }
        try {
            const res =  await axios.put("http://localhost:2002/api/users/"+user._id, updatedUser);
            setSuccess(true);
            dispatch({type:"UPDATE_SUCCESS", payload:res.data});
        } catch (err) {
            dispatch({type:"UPDATE_FAILURE"})
        }
};

return (
    <div className='settings'>
        <div className="settingsWrapper">
        <div className="settingsTitle">
            <span className="settingsUpdateTitle">Update your Account</span>
            <span className="settingsDeleteTitle">Delete Account</span>
        </div>
        <form className='settingsForm' onSubmit={handleSubmit}>
            <label>Profile Picture</label>
            <div className="settingsPP">
                <img src={file ? URL.createObjectURL(file) : PF+user.profilePic} alt='love' />
                <label htmlFor="fileInput">
                    <i className="settingsPPIcon fa-solid fa-circle-user"></i>
                </label>
                <input type="file" id="fileInput" style={{display:"none"}} onChange={(e)=>setFile(e.target.files[0])}/>
            </div>
            <label>UserName</label>
            <input type="text" placeholder="username" onChange={(e)=>setUsername(e.target.value)}/>
            <label>Email</label>
            <input type="text" placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
            <label>Password</label>
            <input type="password" onChange={(e)=>setPassword(e.target.value)}/>
            <button className="settingsSubmit" type='submit'>Update</button>
            {success && <span style={{color:"green",textAlign:"center",marginTop:"20px"}}>Profile has been updated...</span>}

        </form>
        </div>
        <Sidebar />
    </div>
)
}
