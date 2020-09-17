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
    e.preventDefault
    setSomeMovie({
        ...someMovie,
            [e.target.name]: e.target.value
    })
}

const submitChange = e => {
    e.preventDefault
    axios
        .put(`http://localhost:5000/api/movies/${id}`, someMovie)
        .then((res) => {
            history.push(`/movies/${id}`) //redirect to page with newly updated movie
        })

}

    return (
        <form>
            <input 
            type = 'text'
            name = 'title'
            onChange = {handleChanges}
            value = {Movie.title}
            />

            <input 
            type = 'text'
            name = 'director'
            onChange = {handleChanges}
            value = {Movie.director}
            />

            <input 
            type = 'text'
            name = 'metascore'
            onChange = {handleChanges}
            value = {Movie.metascore}
            />

            <input 
            type = 'text'
            name = 'stars'
            onChange = {handleChanges}
            value = {Movie.stars}
            />

            <button onClick = {submitChange}>Submit</button>
        </form>
    )
}