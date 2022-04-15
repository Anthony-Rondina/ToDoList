import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

function Show() {
  const { id } = useParams()
  const [show, setShow] = useState({})

  useEffect(() => {
    ( async () => {
      try {
        const response = await axios.get(`http://localhost:3001/items/${id}`)
        setShow(response.data.foundItem)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [])


  return (
    <div className="showPage">
      <Link to="/">Home</Link>
      <div className="list"> 
        <h1>Entry: {show.entry}</h1>
        <p>Status: {show.status}</p>
       
      </div>
    </div>
  )
  }

export default Show;