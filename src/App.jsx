import { useState } from 'react'
import { Header } from './components/layout/private/Header'
import { PublicHeader } from './components/layout/public/Header'; 
import { Routing } from './routers/Routing';

function App() {

  return (
    <div className=''>
      <Routing/>
    </div>
  )
}

export default App
