import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../client';
import MasonryLayout from './MasonryLayout.jsx'
import Spinner from './Spinner'
import { searchQuery } from '../utils/data';

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();
  useEffect(() => {
    setLoading(true);
    if(categoryId) {
      const query = searchQuery(categoryId);

      client.fetch(query)


    } else {


    }

  }, [categoryId])

  if(loading) return <Spinner message="We are adding new ideas to your feed!" />

  return (
    <div>
      
    </div>
  )
}

export default Feed;