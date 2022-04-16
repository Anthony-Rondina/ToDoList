import './App.css';
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function App() {
  const [items, setItems] = useState({})
  const [buttonPressed, setButtonPressed] = useState(false)
  const entry = useRef()
  const status = useRef()
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("https://anthonystodobackend.herokuapp.com/items/table")
        setItems(response.data)

      } catch (err) {
        console.log(err)
      }
    })()
  }, [buttonPressed])

  const handleClick = async (statusChange, id) => {
    try {
      const response = await axios.put(`https://anthonystodobackend.herokuapp.com/items/${id}`, {
        status: statusChange
      })

      if (response.status === 200) {
        setButtonPressed(!buttonPressed)
      } else {
        console.log('Something went wrong')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.post("https://anthonystodobackend.herokuapp.com/items/", {
        entry: entry.current.value, status: "to-do".toLowerCase()
      })
    } catch (err) {
      console.log(err)
    }
  }
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://anthonystodobackend.herokuapp.com/items/${id}`, {
      })
      if (response.status === 200) {
        setButtonPressed(!buttonPressed)
      } else {
        console.log('Something went wrong')
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="App">
      <div className="container">
        <div id="to-do" className="section">
          <div className="list">
            <h1>My To Do List:</h1>
            <p className='newItem'>New Item</p>
            <form onSubmit={handleSubmit}>
              <input placeholder='Enter new item' type="text" ref={entry} />
            </form>
            <p>To do items:</p>
            <ul>
              {
                items["to-do"] ?
                  items["to-do"].map((item, idx) => {
                    return (
                      <div className='listItem'>
                        <Link to={`/items/${item._id}`}><li>{item.entry}</li></Link>
                        <button onClick={() => { handleClick("completed", item._id) }} className="button">Complete</button>
                        <button onClick={() => { handleDelete(item._id) }} className="button">Delete</button> </div>
                    )
                  })
                  :
                  ""
              }
            </ul>
            <p>Completed Items:</p>
            <ul>
              {
                items["completed"] ?
                  items["completed"].map((item, idx) => {
                    return (
                      <div className='listItem'>
                        <Link to={`/items/${item._id}`}><li style={{ textDecoration: 'line-through' }}>{item.entry}</li></Link>
                        <button className='button' onClick={() => { handleClick("to-do", item._id) }}>Undo</button>
                        <button onClick={() => { handleDelete(item._id) }} className="button">Delete</button>
                      </div>
                    )
                  })
                  :
                  ""
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;