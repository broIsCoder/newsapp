import './App.css';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
 categories = ['technology', 'business', 'sports', 'food', 'fashion', 'health', 'science'];
  
  state = {
    progress:0 
  }
  setProgress=(currentProgress)=>{
    this.setState({progress:currentProgress })
  }

  apiKey =process.env.REACT_APP_NEWS_API ;

  render() {
    return (
      <Router >
        <div className='app' style={{ background: "linear-gradient(to right , rgb(0, 20, 41) 0, rgb(0, 0, 0) 70%)" }}>
          <Navbar categories={this.categories} />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
            height={3}
          />
          <Routes>
            <Route key={"landingpage"} exact path={`/`} element={
              <>
                <News apiKey={this.apiKey} setProgress={this.setProgress} key={"landingpage"} heading="Top Headline For You" pageSize={7} country={"us"} category={"general"} categories={this.categories} />
              </>
            } />

            {this.categories.map((category) => (
              <Route key={category + "1"} exact path={`/${category}`} element={
                <>
                  <News apiKey={this.apiKey} setProgress={this.setProgress} key={category} heading="Top Headline For You" pageSize={7} country={"us"} category={category} categories={this.categories} />
                </>
              } />
            ))}
          </Routes>
        </div>
      </Router>
    )
  }

}
