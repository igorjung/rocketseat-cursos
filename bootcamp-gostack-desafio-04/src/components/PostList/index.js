import React, { Component } from  'react';

import './index.css';

import Post from '../Post/index';
import Comment from '../Comment/index';

import Cap from '../../assets/Cap.jpg';
import Tony from '../../assets/Tony.jpeg';
import Thanos from '../../assets/Thanos.jpeg';
import Groot from '../../assets/Groot.jpg';
import Hodor from '../../assets/Hodor.jpg';



class PostList extends Component {
  state = {
    posts:
      [
        {
          id: 1,
          author: {
            name: "Steve Rogers",
            avatar: Cap
          },
          date: "04 Jun 2019",
          content: "Que batalha do caralh*, to me sentindo um idoso",
          comments:[
            {
              id: 1,
              author: {
                name: "Tony Stark",
                avatar: Tony
              },
              content: "Olha a lingua Cap!"
            }
          ]
        },
        {
          id: 2,
          author: {
            name: "Thanos",
            avatar: Thanos
          },
          date: "03 Jun 2019",
          content: "Eu sou inevitável.",
          comments:[
            {
              id: 1,
              author: {
                name: "Tony Stark",
                avatar: Tony
              },
              content: "E eu sou o homem de ferro."
            },
            {
              id: 2,
              author: {
                name: "Groot",
                avatar: Groot
              },
              content: "Eu sou Groot"
            },
            {
              id: 3,
              author: {
                name: "Steve Rogers",
                avatar: Cap
              },
              content: "Eu sou steve"
            },
            {
              id: 4,
              author: {
                name: "Hodor",
                avatar: Hodor
              },
              content: "Hodor"
            },
          ]
        },
      ],
  };

  render() {
    return (
      <ul className="postList">
        {
          this.state.posts.map(_post => (
            <Post
              key={_post.id} 
              name={_post.author.name} 
              avatar={_post.author.avatar} 
              date={_post.date} 
              content={_post.content}
              comment={
                _post.comments.map(_comment => (
                  <Comment 
                    key={_comment.id}
                    name={_comment.author.name}
                    avatar={_comment.author.avatar}
                    content={_comment.content}
                  />
                ))
              }
            />
          ))
        }
      </ul>
    )
  }
}

export default PostList;