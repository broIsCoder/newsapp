import './App.css';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  tags = ['home', 'arts', 'automobiles', 'business', 'fashion', 'food', 'health', 'insider', 'magazine', 'movies', 'nyregion', 'politics', 'science', 'sports', 'technology', 'theater', 'upshot', 'us'];
  categories = ['general', 'technology', 'business', 'sports', 'food', 'fashion', 'health', 'science', 'entertainment'];

  render() {
    return (
      <Router>
        {/* <Navbar categories={this.categories}/> */}
        <Navbar categories={this.tags} />
        <Routes>
          <Route key={"landingpage"+"1"} exact path={`/`} element={
            <>
              {/* <News heading="Top Headline For You" pageSize={7} country={"us"} category={category} categories={this.categories}/> */}
              <News key={"landingpage"} heading="Top Headline For You" category={this.tags.indexOf("home")} categories={this.tags} />
            </>
          } />

          {this.tags.map((category) => (
            <Route key={category+"1"}exact path={`/${category}`} element={
              <>
                {/* <News heading="Top Headline For You" pageSize={7} country={"us"} category={category} categories={this.categories}/> */}
                <News key={category} heading="Top Headline For You" category={this.tags.indexOf(category)} categories={this.tags} />
              </>
            } />
          ))}

        </Routes>
      </Router>
    )
  }

}
