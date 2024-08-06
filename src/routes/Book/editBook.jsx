
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import NoImageSelected from '../../assets/no-image-selected.jpg'



function EditBook() {

    const navigate = useNavigate()

    const urlSlug = useParams();
    const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/books/${urlSlug.slug}`;
    console.log(baseUrl)

    const [bookId, setBookId] = useState("");
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [stars, setStars] = useState(0);
    const [thumbnail, setThumbnail] = useState(null);
    const [category, setCategory] = useState([]);
    const [submitted, setSubmitted] = useState("");
    const [image, setImage] = useState("");

    const fetchData = async () => {
        try {
            const response = await fetch(baseUrl)
            if (!response.ok) {
                throw new Error("Failed to fetch Data")
            }

            const data = await response.json()
            // setThumbnail(data._id);
            setTitle(data.title)
            setSlug(data.slug)
            setDescription(data.description)
            setCategory(data.category)
            setStars(data.stars)
            setThumbnail(data.thumbnail)
            setBookId(data._id)





        } catch (error) {

        }


    }
    useEffect(() => {
        fetchData();
    }, []);


    const createBook = async (e) => {
        e.preventDefault();
        console.table([title, slug, stars, category, description]);


        const formData = new FormData();
        formData.append("bookId", bookId);

        formData.append("title", title);
        formData.append("slug", slug);
        formData.append("description", description);
        formData.append("stars", stars);
        // formData.append("thumbnail", thumbnail);
        formData.append("category", category);

        if (thumbnail)
            formData.append("thumbnail", thumbnail);



        try {

            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/books`, {
                method: "PUT",
                body: formData

            })

            //FormData interface provides a way to construct a set of key/value pairs
            // representing form fields and their values, which can be sent using the fetch()




            if (response.ok) {
                setTitle("");
                setSlug("");
                // setTitle("");
                // setTitle("");
                setSubmitted(true);

            }
            else console.log("error: failed to take data")

        } catch (error) {
            console.log(error)

        }

    }
    const handleCategoryChange = (e) => {
        setCategory(e.target.value.split(",").map((category) => category.trim()));
    }


    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
            setThumbnail(e.target.files[0])
        }
    }

    const removeBook = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_URL}/api/books` + bookId,
                {
                    method: "DELETE"
                }
            )
            if (response.ok) {
                navigate("/books");
                console.log("book deleted")
            }

        } catch (error) {

            console.log(error)
        }

    }



    return (
        <div>
            <h1>Edit Book</h1>
            <p>the data below is pulled from a MongoDB database</p>

            <button onClick={removeBook} className="delete"> Delete Book</button>



            {
                submitted ? (
                    <p>
                        Data submitted successfully!
                    </p>
                ) : (

                    <form onSubmit={createBook} className ="bookdetails">
                        {/* <div className="bookdetails"> */}

                            <div className="col1">
                                <label>Upload Thumbnail</label>

                                {image ? (
                                    <img src={`${image}` } alt="preview" />
                                ):
                                <img src={`${import.meta.env.VITE_SERVER_URL}/uploads/${thumbnail}`} alt="Preview-image" />

                                }
                                <input
                                    onChange={onImageChange}
                                    type="file" accept='image/gif, image/jpeg, image/png' />

                            </div>
                            <div className="col2">

                                <div>
                                    <label >Title</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label>Slug</label>
                                    <input
                                        type="text"
                                        value={slug}
                                        onChange={(e) => setSlug(e.target.value)}
                                    />
                                </div>



                                <div>
                                    <label>Stars</label>
                                    <input
                                        type="text"
                                        value={stars}
                                        onChange={(e) => setStars(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label>Description</label>
                                    <textarea
                                        rows="4"
                                        cols="100"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label>Categories (comma-separated)</label>
                                    <input
                                        type="text"
                                        value={category}
                                        onChange={handleCategoryChange}
                                    />
                                </div>


                                <input type='submit' />

                            </div>
                        {/* </div> */}

                    </form>
                )
            }
        </div>
    )
}

export default EditBook 