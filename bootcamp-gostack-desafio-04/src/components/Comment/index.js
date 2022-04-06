import React from  'react';

import './index.css';

function Comment(props) {
  return (
    <li className="Comment">
      <img src={props.avatar} alt="User Avatar"/>
      <div className="Content">
        <p>
        <strong>{props.name}</strong> {props.content}
        </p>
      </div>
    </li>
  )
}

export default Comment;