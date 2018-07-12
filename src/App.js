import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import axios from 'axios'
import './styles/style.css'

/* COMPONENTS */
import Navbar from './components/Navbar'
import Home from './components/Home'
import Profile from './components/Profile'
import NotFound from './components/NotFound';
import NoUser from './components/NoUser';


class App extends Component {
  constructor() {
    super()
    this.state = {
      player: {},
      playerGames: [],
      filteredData: []
    }
  }

  /*** CLIENT SIDE API CALLS TO SERVER ***/

  /* GET UNIQUE ID */
  findSummoner = async (value) => {
    let response = await axios.post('https://league-stats-api.herokuapp.com/summonerName', {
      user: value
    })
    this.setState({
      player: response.data.summoner,
      playerGames: response.data.matches
    })
    response.status === 200 ? await this.props.history.push(`/summoner/${response.data.summoner.accountId}`) : await this.props.history.push('/notfound')
  }

  /* FOR WHEN USER REFRESHES */
  getUserInfo = async (id) => {
    let response = await axios.get(`https://league-stats-api.herokuapp.com/summoner/${id}`)
    this.setState({
      player: response.data.summoner,
      playerGames: response.data.matches
    })
  }

  /* MATCH DETAILS */
  getMatchDetails = async (id) => {
    let response = await axios.post('https://league-stats-api.herokuapp.com/matchDetails', {
      id: id
    })
    /* CONSTRUCTOR */
    function Game(name, win, length, spells, champion, kda, items, champLvl, totalCreep, creepPerMin) {
      this.name = name
      this.win = win
      this.length = length
      this.spells = spells
      this.champion = champion
      this.kda = kda
      this.items = items
      this.champLvl = champLvl
      this.totalCreep = totalCreep
      this.creepPerMin = creepPerMin
    }

    let newGame = new Game()

    newGame.name = this.state.player.name

    Object.values(response.data).map((value) => {
      this.state.playerGames.forEach(function(game) {
        if(value.gameId === game.gameId) {
          newGame.length = Math.floor(value.gameDuration / 60)
          value.participants.forEach(function(player) {
            if(player.championId === game.champion) {
              newGame.win = String(player.stats.win)
              newGame.spells = { spell1: player.spell1Id, spell2: player.spell2Id }
              newGame.champion = player.championId
              newGame.kda = player.stats.kills / player.stats.deaths
              newGame.items = { item0: player.stats.item0, item1: player.stats.item1, item2: player.stats.item2, item3: player.stats.item3, item4: player.stats.item4, item5: player.stats.item5 }
              newGame.champLvl = player.stats.champLevel
              newGame.totalCreep = Object.values(player.timeline.creepsPerMinDeltas).map((score) => {
                return score
              })
              newGame.creepPerMin = Math.floor(value.gameDuration / 60)
            }
          })
        }
      })
    })
    this.setState({
      filteredData: this.state.filteredData.concat(newGame)
    })
    return await response.data
  }

  /*** STATUS CODE 429, WANTED TO REFACTOR THIS INTO CODE THAT IS MORE DRY ***/

  // /* GET CHAMPION */
  getChampion = async (id) => {
    let response = await axios.post('https://league-stats-api.herokuapp.com/champion', {
      id: id
    })
    return await response.data
  }

  /* GET SPELLS */
  getSpells = async (id) => {
    let response = await axios.post('https://league-stats-api.herokuapp.com/spells', {
      id: id
    })
    return await response.data
  }

  /* GET ITEMS */
  getItems = async (id) => {
    let response = await axios.post('https://league-stats-api.herokuapp.com/items', {
      id: id
    })
    return await response.data
  }


  render() {
    return (
      <div className="main">

        {/* NAVIGATION AND SEARCH */}
        <Navbar />

        {/* ROUTES */}
        <Switch>
          <Route exact path="/" render={() => {
            return <Home findSummoner={this.findSummoner}/>
          }} />

          <Route path="/summoner/:id" render={() => {
            return <Profile 
                      {...this.state} 
                      getUserInfo={this.getUserInfo}
                      getMatchDetails={this.getMatchDetails}
                      getChampion={this.getChampion}
                      // getSpells={this.getSpells}
                      // getItems={this.getItems}
                  />
          }} />
          {/* 404 */}
          <Route path="/notfound" component={NoUser} />
          <Route path="*" component={NotFound} />
        </Switch>

      </div>
    )
  }
}

export default withRouter(App)
