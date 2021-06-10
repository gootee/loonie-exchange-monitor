import React from 'react'
import { IToggleData } from '../results/results'
import './result-toggle.css'
 
const ResultsToggle = (props: IToggleData) => {
  return <div className="m-5"> 
    <label className="toggle" htmlFor="">
      <input className="toggle_input" type="checkbox" id="result" checked = { props.aIsResult } />
      <div className="toggle_fill d-flex flex-row justify-content-between align-items-center">
        <div className="toggle_container">
          <div className="white_font toggle_label">{ props.aLabel }</div>
        </div>
        <div className="toggle_container">
          <div className="red_font toggle_label">{ props.bLabel }</div>
        </div>
      </div>
    </label>
  </div>      
}

export default ResultsToggle