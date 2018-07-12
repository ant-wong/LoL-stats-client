import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class NotFound extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>You seem to be lost.</h1>
        </header>
      </div>
    )
  }
}

export default withRouter(NotFound)