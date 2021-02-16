import React, { Component } from 'react';
import SearchBox from '../components/SearchBox.js';
import Scroll from '../components/Scroll.js';
import CardList from '../components/CardList.js';
import ErrorBoundry from '../components/ErrorBoundry.js';
import './App.css';
import './SEGA.woff'

class App extends Component {

  constructor() {
    super()
    this.state = {
      robots: [],
      searchField: ''
    }
  }


  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value });
  }

  componentDidMount() {
    fetch('http://jsonplaceholder.typicode.com/users')
    .then(resp => resp.json()
    .then(users => this.setState({ robots: users })
      )
    )
  }

  render() {
      const {robots, searchField} = this.state;
      const filteredRobot = robots.filter(robot => {
        return(
          robot.name.toLowerCase()
          .includes(searchField.toLowerCase()));
        });
      return !robots.length ?
        <h1 className='tc'>LOADING</h1> :
        (
          <div className='tc'>
            <h1 className='f1'>ROBOFRIENDS</h1>
            <SearchBox searchChange={this.onSearchChange}/>
            <Scroll>
              <ErrorBoundry>
                <CardList robots={filteredRobot}/>
              </ErrorBoundry>
            </Scroll>
          </div>
        );
  }
}

export default App;
