import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import PostComponent from './components/postComponent/postComponent';

let pageCount = 0;

var intObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      console.log(entry);
      console.log(entry.isIntersecting); // returns true if the target intersects the root element
    });
  },
  {
    // default options
  }
);

const PostPage = () => {
  const [post, setPost] = useState([]);
  const [showPastFromTo, setShowPastFromTo] = useState(20);
  const getPosts = () => {
    axios
      .get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageCount}`)
      .then(response => {
        setPost(post => [...post, response.data.hits].flat(Infinity));
        pageCount++;
      })
      .catch(e => console.error(e));
  };

  useEffect(() => {
    getPosts();
    const interval = setInterval(() => {
      getPosts();
    }, 10000);

    return () => clearInterval(interval);
  }, []);
  console.log('response', post);
  return (
    <div className='App'>
      <header className='App-header'>
        {post &&
          post.slice(0, showPastFromTo)?.map(el => (
            <div className='postWrapperList'>
              <PostComponent title={el.title} author={el.author} created_at={el.created_at} />
            </div>
          ))}
      </header>
    </div>
  );
};

export default PostPage;
