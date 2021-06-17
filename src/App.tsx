import React, { useState, useEffect } from 'react'
import './App.scss'
import axios from 'axios'

interface Ipost {
  id: number
  style: string
  flavor: string
}
const defaultPosts: Ipost[] = []

export function replaceCamelWithSpaces(colorName: string) {
  return colorName.replace(/\B([A-Z])\B/g, ' $1')
}

function App() {
  const API_URL = 'https://ga-doughnuts.herokuapp.com/donuts'

  const [posts, setPosts]: [Ipost[], (posts: Ipost[]) => void] =
    useState(defaultPosts)
  const [buttonColor, setButtonColor] = useState('MediumVioletRed')
  const [disabled, setDisabled] = useState(false)

  const newButtonColor =
    buttonColor === 'MediumVioletRed' ? 'MidnightBlue' : 'MediumVioletRed'

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
          Change to {replaceCamelWithSpaces(newButtonColor)}
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
