import React, { useState, useEffect } from 'react';
import axios from "axios"

function Jokes() {
    const [jokes, setJokes] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/jokes')
            .then((response) => {
                setJokes(response.data)
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }, []);


    return (
        <>
            <p>Jokes {jokes.length}</p>
            {
                jokes?.map((joke) => {
                   return <div id={joke.id}>
                        <h3>{joke.question}</h3>
                        <p>{joke.answer}</p>
                    </div>
                })
            }
        </>
    );
}

export default Jokes;
