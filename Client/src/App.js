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
        const response = await axios.get("http://localhost:3001/items/table")
        setItems(response.data)

      } catch (err) {
        console.log(err)
      }
    })()
  }, [buttonPressed])

  const handleClick = async (statusChange, id) => {
    try {
      const response = await axios.put(`http://localhost:3001/items/${id}`, {
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
      const response = await axios.post("http://localhost:3001/items/", {
        entry: entry.current.value, status: "to-do".toLowerCase()
      })
    } catch (err) {
      console.log(err)
    }
  }
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3001/items/${id}`, {
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
            <form onSubmit={handleSubmit}>
              <input type="text" ref={entry} />
              <input type="submit" value="submit" />
            </form>
            <p>To do items:</p>
            <ul>
              {
                items["to-do"] ?
                  items["to-do"].map((item, idx) => {
                    return (
                      <>
                        <li>{item.entry}</li>
                        <button onClick={() => { handleClick("completed", item._id) }} className="button">Complete</button> </>
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
                      <div>
                        <li style={{ textDecoration: 'line-through' }}>{item.entry}</li>
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
        {/* <div id="pending" className="section">
          <h2>Pending</h2>
          <div className="list">
            {
              items["pending"] ?
                items["pending"].map((item, idx) => {
                  return (
                    <div className="task" key={idx}>
                      <Link to={`/${item._id}`}>{item.entry}</Link>
                      <div>
                        <button onClick={() => { handleClick("to-do", item._id) }} className="button">to-do</button>
                        <button onClick={() => { handleClick("completed", item._id) }} className="button">Completed</button>
                      </div>
                    </div>
                  )
                })
                :
                ""
            }
          </div>
        </div>
        <div id="completed" className="section">
          <h2>Completed</h2>
          <div className="list">
            {

              items["completed"] ?
                items["completed"].map((item, idx) => {
                  return (
                    <div className="task" key={idx}>
                      <Link style={{ textDecoration: 'line-through' }}to={`/${item._id}`}>{item.entry}</Link>
                      <div>
                        <button onClick={() => { handleClick("pending", item._id) }} className="button">Pending</button>
                        <button onClick={() => { handleClick("to-do", item._id) }} className="button">to-do</button>
                      </div>
                    </div>
                  )
                })
                :
                ""
            }
          </div>
        </div> */}
      </div>

    </div>
  );
}

export default App;