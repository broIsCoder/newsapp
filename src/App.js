import './App.css';
import React, { useState} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import Navbar from './components/Navbar';
import News from './components/News';

export default function() {
  const categories = ['technology', 'business', 'sports', 'food', 'fashion', 'health', 'science'];
  const [progress, setProgress] = useState(0);

  const changeProgressBar=(currentProgress)=>{
    setProgress(currentProgress)
  }

  const apiKey =process.env.REACT_APP_NEWS_API ;

    return (
      <Router >
        <div className='app' style={{ background: "linear-gradient(to right , rgb(0, 20, 41) 0, rgb(0, 0, 0) 70%)" }}>
          <Navbar categories={categories} />
          <LoadingBar
            color='#f11946'
            progress={progress.progress}
            height={3}
          />
          <Routes>
            <Route key={"landingpage"} exact path={`/`} element={
              <>
                <News apiKey={apiKey} changeProgressBar={changeProgressBar} key={"landingpage"} heading="Top Headline For You" pageSize={7} country={"us"} category={"general"} categories={categories} />
              </>
            } />

            {categories.map((category) => (
              <Route key={category + "1"} exact path={`/${category}`} element={
                <>
                  <News apiKey={apiKey} changeProgressBar={changeProgressBar} key={category} heading="Top Headline For You" pageSize={7} country={"us"} category={category} categories={categories} />
                </>
              } />
            ))}
          </Routes>
        </div>
      </Router>
    )
  
}
