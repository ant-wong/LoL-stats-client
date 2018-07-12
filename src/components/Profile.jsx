import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { Row, Col } from 'antd'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      loading: true
    }
  }

  async componentDidMount() {
    await this.props.getUserInfo(this.props.match.params.id)
    await this.props.playerGames.map(element => {
      return this.props.getMatchDetails(element.gameId)
    })
    /* LOADING FLAG */
    await this.setState({
      loading: false
    })
  }

  render() {

    const reducer = (accumulator, currentValue) => accumulator + currentValue

    const matchesJSX = this.props.filteredData.map((game) => {
      if(this.state.loading === false) {
        return <Col span={8}>
          <div key={game.gameId} className={(game.win === "true") ? "win-stats" : "loss-stats"}>
            <h1>{this.props.player.name}</h1>
            <h2>Champion-Id: {game.champion}</h2>
            <p>Level: {game.champLvl}</p>
            <p className="win-lose">{(game.win === "true") ? "WIN" : "LOSE"}</p>
            <h3>KDA : {String((game.kda).toFixed(2))}</h3>
            <div className="lists">
              SPELLS
              <ul>
                <li>Spell: {game.spells.spell1}</li>
                <li>Spell: {game.spells.spell2}</li>
              </ul>
            </div>
            <div className="lists">
              ITEMS USED
              <ul>
                {Object.values(game.items).map(item => {
                  if(item === 0) {
                    return <li>N/A</li>
                  } else {
                    return <li>{item}</li>
                  }
                })}
              </ul>
            </div>
            <p>Game Length: {game.length} minutes</p>
            <h3>Total Creep Score: {((game.totalCreep.reduce(reducer) * game.creepPerMin)).toFixed(2)}</h3>
            <h4>Creep Score/Min: {(((game.totalCreep.reduce(reducer) * game.creepPerMin)).toFixed(2) / game.length)}</h4>
          </div>
        </Col>
      } else {
        return <div key={game.gameId}>
          <h1>LOADING</h1>
        </div>
      }
    })
    return (
      <div>
        <header>
          <h1 className="player-name">{this.props.player.name}</h1>
        </header>
        <Row>
          {matchesJSX}
        </Row>
      </div>
    )
  }
}

export default withRouter(Profile)