import React, { useState, useEffect } from 'react'
import ButtonColor from './components/ButtonColor'
import Sundaes from './components/Sundaes'
import SummaryForm from './pages/summary/SummaryForm'
import './App.scss'

function App() {
  return (
    <section className='container'>
      <ButtonColor />
      <Sundaes />
      <main>
        <SummaryForm />
      </main>
    </section>
  )
}

export default App
