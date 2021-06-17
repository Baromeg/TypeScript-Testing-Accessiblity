import React, { useState, useEffect } from 'react'
import './App.scss'
import axios from 'axios'

interface Ipost {
  id: number
  style: string
  flavor: string
}
const defaultPosts: Ipost[] = []

function App() {
  const API_URL = 'https://ga-doughnuts.herokuapp.com/donuts'

  const [posts, setPosts]: [Ipost[], (posts: Ipost[]) => void] =
    useState(defaultPosts)
  const [buttonColor, setButtonColor] = useState('red')
  const [disabled, setDisabled] = useState(false)

  const newButtonColor = buttonColor === 'red' ? 'blue' : 'red'

  useEffect(() => {
    let isMounted = true
    axios
      .get<Ipost[]>(API_URL)
      .then((response) => {
        if (isMounted) setPosts(response.data)
      })
      .catch((ex) => {
        console.log(ex)
      })
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className='container'>
      <header className='header'>
        <h1>Donuts</h1>

        <button
          style={{ backgroundColor: disabled ? 'gray' : buttonColor }}
          onClick={() => setButtonColor(newButtonColor)}
          disabled={disabled}
        >
          Change to {newButtonColor}
        </button>
        <input
          type='checkbox'
          id='disable-button-checkbox'
          defaultChecked={disabled}
          aria-checked={disabled}
          onChange={(e) => setDisabled(e.target.checked)}
        />
        <label htmlFor='disable-button-checkbox'>Disable button</label>
      </header>

      {posts[0] && (
        <main>
          {' '}
          <div className='image'>
            <h3>{posts[0].style}</h3>
          </div>
          <div className='captation'>
            <h3>{posts[0].flavor}</h3>
          </div>
        </main>
      )}
    </section>
  )
}

export default App
