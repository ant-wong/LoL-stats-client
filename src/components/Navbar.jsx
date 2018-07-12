import React, { Component } from 'react'
import { Row, Col, Button } from 'antd'
import { Link } from 'react-router-dom'

import Logo from '../img/league-logo.png'


export default class Navbar extends Component {
	render() {
		return (
			<nav>
				<Row type="flex" align="middle">
					<Col span={4} offset={2}>
						<header>
							<Link to='/'>
								<img src={Logo} alt="logo"/>
							</Link>
						</header>
					</Col>
					<Col span={6}>
						<ul>
							<li>PUGB</li>
							<li>OVERWATCH</li>
							<li>SUPER SMASH</li>
						</ul>
					</Col>
					<Col span={1} offset={8}>
						<Button>Log In</Button>
					</Col>
				</Row>
			</nav>
		)
	}
}