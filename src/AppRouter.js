import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import HomePage from './HomePage'
import Battle from './Battle'
import SearchPage from './SearchPage'
import PopularPage from './PopularPage'
import Nav from './Nav'

function AppRouter () {
  return (
    <Router>
      <div>
        <header>
          <Nav />
        </header>
        <main>
          <Route path='/' exact component={HomePage} />
          <Route path='/popular/:lang' component={PopularPage} />
          <Route path='/search' component={SearchPage} />
          <Route path='/battle' component={Battle} />
        </main>
      </div>
    </Router>
  )
}

export default AppRouter
