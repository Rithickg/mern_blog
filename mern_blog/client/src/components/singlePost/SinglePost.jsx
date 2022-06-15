import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../../context/Context';
import "./singlepost.css";

export default function SinglePost() {
  const location = useLocation()
  const path =location.pathname.split("/")[2];
  const [post,setPost] = useState({});
  const {user} = useContext(Context);
  const [title,setTitle] = useState("");
  const [desc,setDesc]=useState("");
  const [updateMode,setUpdateMode]=useState(false);

  useEffect(()=>{
const getPost = async()=>{
  const res =await axios.get("http://localhost:2002/api/posts/" + path)
  setPost(res.data)
  setTitle(res.data.title)
  setDesc(res.data.desc)
}
getPost()
  },[path])

  const PF ="http://localhost:2002/images/";

  const handleDelete =async ()=>{
    try {
      await axios.delete(`http://localhost:2002/api/posts/${post._id}`,{
        data:{username:user.username}
      });
      window.location.replace("http://localhost:3000");
    } catch (err) {
    }
  }

  const handleUpdate =async ()=>{
    try {
      await axios.put(`http://localhost:2002/api/posts/${post._id}`,{
      username: user.username,title,desc
      });
     setUpdateMode(false)
    } catch (err) {
    }
  }
  return (
    <div className='singlePost'>
        <div className="singlePost">
          <div className="singlePostWrapper">
            {post.photo && <img src={PF + post.photo} 
            alt='work' className='singlePostImg' />}
            {
              updateMode ? (<input type="text" value={title} className="singlePostTitleInput"
              onChange={(e)=>setTitle(e.target.value)}  autoFocus/>)
              :(
            <h1 className='singlePostTitle'>
              {title}
              {post.username === user?.username &&(
                <div className="singlePostEdit">
                  <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={()=>setUpdateMode(true)}></i>
                  <i className="singlePostIcon fa-solid fa-trash-can" onClick={handleDelete}></i>
                </div>
              )}
            </h1>
            )}

            <div className="singlePostInfo">
              <span className='singlePostAuthor'>Author: 
              <Link to={`/?user=${post.username}`} className="link">
              <b>{post.username}</b>
              </Link>
              </span>
              <span className='singlePostDate'>{new Date(post.createdAt).toDateString()}</span>
            </div>
            {
              updateMode ? (
              <textarea type="text" value={desc} onChange={(e)=>setDesc(e.target.value)} classname="singlePostDescInput"/>
              ) :
              ( <p className='singlePostDesc'>
              {desc}
            </p>
            )}
            {updateMode &&
                (<button className="singlePostButton" onClick={handleUpdate}>Update</button> )
            }
        
          </div>
        </div>
        </div>
  )
}
