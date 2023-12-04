import React, { Component } from 'react'
import spinner from './spinner.gif'

export default function Spinner() {
 
    return (
      <div className='text-center'>
        <img src={spinner} alt="" style={{width:"70px",height:"70px"}} />
      </div>
    )
}
