import React, { useState, useEffect } from 'react'
import './App.scss'
import ButtonColor from './components/ButtonColor'
import Sundaes from './components/Sundaes'
function App() {
  return (
    <section className='container'>
      <ButtonColor />
      <Sundaes />
    </section>
  )
}

export default App
