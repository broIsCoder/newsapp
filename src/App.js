import './App.css';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  tags = ['home', 'arts', 'automobiles', 'business', 'fashion', 'food', 'health', 'insider', 'magazine', 'movies', 'nyregion', 'politics', 'science', 'sports', 'technology', 'theater', 'upshot', 'us'];
  apiKey =process.env.REACT_APP_NYTIMES_API;
  render() {
    return (
      <Router>
        <Navbar categories={this.tags} />
        <Routes>
          <Route key={"landingpage"} exact path={`/`} element={
            <>
              <News apiKey={this.apiKey} key={"landingpage"} heading="Top Headline For You" category={this.tags.indexOf("home")} categories={this.tags} />
            </>
          } />

          {this.tags.map((category) => (
            <Route key={category+"1"}exact path={`/${category}`} element={
              <>
                <News apiKey={this.apiKey} key={category} heading="Top Headline For You" category={this.tags.indexOf(category)} categories={this.tags} />
              </>
            } />
          ))}

        </Routes>
      </Router>
    )
  }

}
