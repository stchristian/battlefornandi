import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav () {
  return (
    <div className='nav'>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/popular/all'>Popular</Link>
          </li>
          <li>
            <Link to='/search'>Search</Link>
          </li>
          <li>
            <Link to='/Battle'>Battle</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
