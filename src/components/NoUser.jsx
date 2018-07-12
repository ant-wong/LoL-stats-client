import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class NoUser extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>We could not find that summoner :(</h1>
        </header>
      </div>
    )
  }
}

export default withRouter(NoUser)