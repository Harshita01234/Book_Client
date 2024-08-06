import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

function Book() {
  const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/books`;

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");



  useEffect(() => {
    const fetchData = async () => {
      try {

        let url = baseUrl;
        if(selectedCategory){
          url+=`?category=${selectedCategory}`
        }


        const response = await fetch(url);

        if (!response.ok) throw new Error("Failed to fetch data")

        const jsonData = await response.json();
        setData(jsonData);
        setIsLoading(false);


      } catch (error) {
        console.log("Error fetching data. Please try again later");
        setIsLoading(false);


      }
    }
    fetchData();
  }, [selectedCategory])



  return (
    <div>
      <h1>Books</h1>
      <p> Minature Vite + React demo website</p>

      <Link to ="/createBook">+ Add New Book</Link>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

      <div className="filters">
        <label > Categories</label>
        <select onChange={(e)=> setSelectedCategory(e.target.value)}>
          <option value ="">All</option>
          <option value ="romance">Romance</option>
          <option value ="science">Science</option>
          <option value ="crime">Crime</option>


        </select>

      </div>


      {isLoading ?
        (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ):(

          <ul className="books">
            {
              data.map((item) => (
                <li key={item._id}>
                  <Link to={`/books/${item.slug}`}>
                    <img src={`${import.meta.env.VITE_SERVER_URL}/uploads/${item.thumbnail}`} alt={item.title} />
                    <h3>{item.title}</h3>
                  </Link>

                </li>
              ))
            }

          </ul>

        )}

    </div>
  )
}

export default Book