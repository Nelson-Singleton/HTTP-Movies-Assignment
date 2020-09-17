import Axios from 'axios'
import React, { useState } from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const initialMovie = {
    id: new Date(),
    title: '',
    director: '',
    metascore: '',
    stars: ["someStar"]
}

const AddMovie = () => {    

    const [addedMovie, setAddedMovie] = useState(initialMovie)
    const history = useHistory()

    const handleChanges = (e) => {
        e.preventDefault()
        setAddedMovie({
            ...addedMovie,
                [e.target.name]: (e.target.value)
        })
    }
    const handleChangesToString = (e) => { //used to handle changes on title, strings and director
        e.preventDefault()
        setAddedMovie({
            ...addedMovie,
                [e.target.name]: String(e.target.value)
        })
    }

    const submitMovie = (e) => {
        e.preventDefault()
        axios
            .post(`http://localhost:5000/api/movies`, addedMovie)
            .then(res => {
                setAddedMovie(initialMovie)
                history.push('/')
            })

    }
    return(
        <div>
            <h1>Add a movie</h1>
            <form>
            <input 
            type = 'text'
            name = 'title'
            onChange = {handleChangesToString}
            value = {addedMovie.title}
            placeholder = "Movie Name"
            />

            <input 
            type = 'text'
            name = 'director'
            onChange = {handleChangesToString}
            value = {addedMovie.director}
            placeholder = "Movie Director"
            />

            <input 
            type = 'text'
            name = 'metascore'
            onChange = {handleChanges}
            value = {addedMovie.metascore}
            placeholder = "Movie Metascore"
            />

            <input 
            type = 'text'
            name = 'stars'
            onChange = {handleChangesToString}
            value = {addedMovie.stars}
            placeholder = "Starring"
            />

            <button onClick = {submitMovie}>Submit</button>
        </form>
        </div>
    )
}

export default AddMovie