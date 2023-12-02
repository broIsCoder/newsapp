import './App.css';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  tags = ['home','arts', 'automobiles', 'business', 'fashion', 'food', 'health', 'insider', 'magazine', 'movies', 'nyregion', 'politics', 'science', 'sports', 'technology', 'theater', 'upshot', 'us'];
  categories = ['technology', 'business', 'sports', 'food', 'fashion', 'health', 'science'];

  render() {
    return (
      <Router>
        <Navbar categories={this.categories}/>
        <Routes>
          <Route key={"landingpage"} exact path={`/`} element={
            <>
              <News key={"landingpage"} heading="Top Headline For You" pageSize={7} country={"us"} category={"general"} categories={this.categories}/>
            </>
          } />

          {this.tags.map((category) => (
            <Route key={category+"1"}exact path={`/${category}`} element={
              <>
                <News  key={category}heading="Top Headline For You" pageSize={7} country={"us"} category={category} categories={this.categories}/>
              </>
            } />
          ))}
        </Routes>
      </Router>
    )
  }

}
