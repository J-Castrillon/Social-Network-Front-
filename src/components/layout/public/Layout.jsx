import React from 'react'
import { PublicHeader } from './Header'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <div>
        <PublicHeader/> 

        <section className="layout__content">
            <Outlet/>
        </section>
    </div>
  )
}
