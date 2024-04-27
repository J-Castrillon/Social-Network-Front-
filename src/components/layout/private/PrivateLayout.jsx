import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import {Sidebar} from './Sidebar'; 

export const PrivateLayout = () => {
  return (
    <div>
        <Header/> 

        <div className='feed__content'>
          <section className="layout__content">
              <Outlet/>
          </section>

          <Sidebar />
        </div>

    </div>
  )
}