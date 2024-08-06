import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"

function SingleBook() {

    const urlSlug = useParams();
    const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/books/${urlSlug.slug}`;
    const [data, setData] = useState([]);
    
    // let a = urlSlug.slug
    // console.log(urlSlug)
    console.log(baseUrl)
    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await fetch(baseUrl);

                if (!response.ok) throw new Error("Failed to fetch data")

                const jsonData = await response.json();
                setData(jsonData);


            } catch (error) {
                console.log("Error fetching data. Please try again later");


            }
        }
        fetchData();
    }, [])

    return (
        <div>
            <Link to={"/books"}>Back</Link>
            <div className="bookdetails">
                <div className="col1">

                    {/* The optional chaining (?.) - accesses an objects property or calls a fn.
                if the object accesses or function called using this operator is undefined or null,
                the expression short circuits and evaluates to undefined instead of throwing an error */}

                    <img src={`${import.meta.env.VITE_SERVER_URL}/uploads/${data?.thumbnail}`} alt={data.title} />
                    
                    <Link to={`/editBook/${data?.slug}`}>Edit Book</Link>
                </div>

                <div className="col2">

                    <h1>{data?.title}</h1>
                    <p>{data?.description}</p>
                    <p>Stars : {data?.stars}

                    </p>


                    <p>Categories</p>
                    <ul>
                        {data?.category?.map((item, index) => (
                            <li key={index}> {item} </li>
                        )

                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}


export default SingleBook



