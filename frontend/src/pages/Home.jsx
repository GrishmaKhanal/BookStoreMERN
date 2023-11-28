import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BooksTable from '../components/home/BooksTable'
import BooksCard from '../components/home/BooksCard'

const Home =  () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState(true);

  const fetchData = async () => {
    const response = await axios.get('http://localhost:5555/book');
    setBooks(response.data.data);
  }
  useEffect(() => {
    try {
      setLoading(true);
      fetchData();
      setLoading(false);
    } catch(error) {
      console.log(error);
      setLoading(false);
    }
  }, []);


return (
  <div className="p-4">
    <div className="flex justify-between items-center">
      <h1 className="text-3xl my-8 br">Books List</h1>
      <div className="flex justify-between items-center gap-x-4">
      <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType(true)}
        >
          Table
        </button>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType(false)}
        >
          Card
        </button>
    </div>
      <Link to="/book/create">
        <MdOutlineAddBox className="text-sky-800 text-4x1" />
      </Link>
    </div>
    {loading ?
      <Spinner /> : showType === true?
    (<BooksTable books={books} />) :
    (<BooksCard books={books} />)
  }
  </div>
);
};

export default Home;
