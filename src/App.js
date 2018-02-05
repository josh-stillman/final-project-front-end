import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import NavBar from './NavBar'
import TransactionsContainer from './containers/TransactionsContainer'
import { Container} from 'semantic-ui-react'
import * as actions from './actions'
import { connect } from 'react-redux'

class App extends Component {

  componentDidMount(){
    this.props.fetch_transactions()
    console.log("app mounting", this.props);
  }

  render() {
    return (
      <Router>
        <div>
        <NavBar />
        <Container>
        <Route exact path="/" render={() => (<p>Hello World!</p>)} />
        <Route path="/transactions" component={TransactionsContainer} />
        </Container>``
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    transactions: state.transactions.all
  }
}

// const mapDispatchToProps = (dispatch) =>{
//   return {
//     transactions: state.transactions.all
//   }
// }

export default connect(mapStateToProps, actions)(App);
