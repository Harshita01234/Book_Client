import React, { useState } from 'react'
import NoImageSelected from '../../assets/no-image-selected.jpg'



function createBook() {

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [stars, setStars] = useState(0);
    const [thumbnail, setThumbnail] = useState(null);
    const [category, setCategory] = useState([]);
    const [submitted, setSubmitted] = useState("");
    const[image, setImage] = useState(NoImageSelected);




    const createBook = async (e) => {
        e.preventDefault();
        console.table([title, slug, stars, category, description]);


        const formData = new FormData();
        formData.append("title", title);
        formData.append("slug", slug);
        formData.append("description", description);
        formData.append("stars", stars);
        formData.append("thumbnail", thumbnail);
        formData.append("category", category);


        try {

            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/books`, {
                method: "POST",
                body: formData

        })

        //FormData interface provides a way to construct a set of key/value pairs
        // representing form fields and their values, which can be sent using the fetch()





            // const response = await fetch("http://localhost:3001/api/books", {
            //     method: "POST",
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         title: title,
            //         slug: slug,
            //         stars: stars,
            //         description:description,
            //         category: category,
            //         // slug: slug,
            //     })
            // })

             
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
    const handleCategoryChange=(e)=>{
        setCategory(e.target.value.split(",").map((category) => category.trim()));
    }


    const onImageChange = (e) => {
        if(e.target.files && e.target.files[0]){
            setImage(URL.createObjectURL(e.target.files[0]));
            setThumbnail(e.target.files[0])
        }
    }
    









    return (
        <div>
            <h1>createBook</h1>
            <p>the data below is pulled from a MongoDB database</p>
            {
                submitted ? (
                    <p>
                        Data submitted successfully!
                    </p>
                ) : (

                    <form onSubmit={createBook}>
                        <div className="bookdetails">

                            <div className="col1">
                                <label>Upload Thumbnail</label>
                                <img src={image} alt="Preview image" />
                                <input
                                onChange ={onImageChange}
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
                        </div>

                    </form>
                )
            }
        </div>
    )
}

export default createBook