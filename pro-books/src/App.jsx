import React from "react";
import axios from "axios"
import { useEffect } from "react";
import { useState } from "react";
const App = () => { 
  const [books, setBooks] = useState(null)
  // const [errors, seterrors] = useState(null)
  
  useEffect(() => {
    const fetchData = async() => {
      try {
        let parsedData = await axios.get("https://reactnd-books-api.udacity.com/books", { headers: { 'Authorization': 'whatever-you-want' } })
        // let parsedData = await axios.get("https://reactnd-books-api.udacity.com/book", { headers: { 'Authorization': 'whatever-you-want' } })
        setBooks(parsedData.data.books)
        console.log(parsedData.data.books)
      } catch (error) {
        if(error.response.status === 404)
          console.log(`Status code ${error.response.status} \nNo website found`)
        else
        console.log("error", error)
      }
    }
    fetchData()
  }, [])
  return (
    <>
    { books &&

      books.map((book, index) => (
        <div
        style={
          {borderBottom: "3px solid white"

          }
        }
         key={index + 1}>
          <h1>{book.title}</h1>
          <div
          style={
            {display: "flex",
            fontSize: "15px",
            // border: "3px solid white",
            width: "90vw",
            padding: "10px",
            justifyContent: "space-between",
            }
          }
          className="box">
            <img src={book.imageLinks.thumbnail}/>
            <p style={{ padding: '20px' }}>{book.description}</p>

          </div>
          <p>{book.authors.map(author => author, ",")}</p>
        </div>
      ))
    }
    </>
  )
}

export default App;