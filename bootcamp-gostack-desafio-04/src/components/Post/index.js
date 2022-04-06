import React from  'react';

import './index.css'

function Post(props) {
  return  (
    <li className="Post">
      <div className="User">
        <img src={props.avatar} alt="Avatar User"/>
        <div className="Text">
          <h1>{props.name}</h1>      
          <p>{props.date}</p>
        </div>
      </div>
      <div className="Content">
        <p>{props.content}</p>
      </div>
      <ul className="Comment">
        {props.comment}
      </ul>
    </li>
  )
}

export default Post;