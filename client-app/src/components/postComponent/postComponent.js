import './postComponent.css';
import {useEffect, useState} from 'react';
import axios from 'axios';

const PostComponent = ({title, post, author, created_at}) => {
  return (
    <div className='postWrapper'>
      <div className='TitlePost'>{title}</div>
      <div className='authorPost'>{author}</div>
      <div className='postDate'>{created_at}</div>
    </div>
  );
};

export default PostComponent;
