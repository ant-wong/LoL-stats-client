import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { Input, Row, Col } from 'antd'

const Search = Input.Search

class Home extends Component {
  render() {
    return (
      <div className="landing-page">
        <header className="welcome-message">
          <h1>Welcome to LoL Stats!</h1>
          <h3>Check out and compare your stats with friends or Strangers</h3>
        </header>
        <Row>
          <Col span={12} offset={6}>
          <section>
            <Search
              placeholder="Search for your favorite players or friends!"
              className="search-input"
              onSearch={(value) => {this.props.findSummoner(value)}}
            />
          </section>
          </Col>
        </Row>
      </div>
    )
  }
}

export default withRouter(Home)