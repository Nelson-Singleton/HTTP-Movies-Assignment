import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useHistory, useParams} from 'react-router-dom'
import Movie from './Movie'

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const UpdateMovieForm = (props) => {
    const history = useHistory()
    const {id} = useParams()
    const [someMovie, setSomeMovie] =  useState(initialMovie)

const handleChanges = (e) => {
    e.preventDefault()
    setSomeMovie({
        ...someMovie,
            [e.target.name]: e.target.value
    })
}

useEffect(() => {
    axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then((res) => {
            console.log(res, "Get response works")
            setSomeMovie(res.data)
        })
},[id])

const submitChange = e => {
    e.preventDefault()
    axios
        .put(`http://localhost:5000/api/movies/${id}`, someMovie)
        .then((res) => {
            console.log(res)
            setSomeMovie(initialMovie)//resets state to initial values
            history.push(`/movies/${id}`) //redirects to page with newly updated movie
        })
        .catch(err => {
            console.log(err)
        })
        //.finally(res => {

        //})
}

    return (
        <form>
            <input 
            type = 'text'
            name = 'title'
            onChange = {handleChanges}
            value = {Movie.title}
            placeholder = "Movie Name"
            />

            <input 
            type = 'text'
            name = 'director'
            onChange = {handleChanges}
            value = {Movie.director}
            placeholder = "Movie Director"
            />

            <input 
            type = 'text'
            name = 'metascore'
            onChange = {handleChanges}
            value = {Movie.metascore}
            placeholder = "Movie Metascore"
            />

            <input 
            type = 'text'
            name = 'stars'
            onChange = {handleChanges}
            value = {Movie.stars}
            placeholder = "Starring"
            />

            <button onClick = {submitChange}>Submit</button>
        </form>
    )
}

export default UpdateMovieForm