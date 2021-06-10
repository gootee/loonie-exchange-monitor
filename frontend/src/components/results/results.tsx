import React from 'react'
import './results.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import env from '../../environment'
import Header from '../header/Header'
import ResultToggle from '../result-toggle/result-toggle'

export interface IToggleData {
  aLabel: string,
  bLabel: string,
  aIsResult: boolean | undefined
}

interface IResultsData {
  status: string,
  title: string,
  superText: string,
  subText: string,
  footnote: string,
  toggle: IToggleData
}

function Results() {
  const [results, setResults] = useState<IResultsData>({
    status: '',
    title: "",
    superText: "",
    subText: "",
    footnote: "",
    toggle: {
      aLabel: "",
      bLabel: "",
      aIsResult: false
    }    
  })

  const [error, setError] = useState<Error | null >(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const port: Number = env.getPort()
    const url: string = 'http://localhost:' + port +'/'
    await axios.get(url, {})
    .then(response => {
      if (response.status === 200 && response.data.status === "OK") {
        setResults(response.data)
      } else {
        throw Error("There was an error accessing results data.  Please check back again.")
      }
    })
    .catch(err => setError(err))
  }

  if (error && error?.message) {
      return <p id="error" className="errorClass">{ error?.message }</p>   
  }

  return (
    <div className="App container-fluid vh-100">
      <Header title={ results.title }/>    
      <div className="results row d-flex flex-column justify-content-between align-items-center">
        <div className="main-top mt-5">
          <div className="text_font m-4">{ results.superText }</div>
          <ResultToggle {...results.toggle} />
          <div className="text_font m-4">{ results.subText }</div>
        </div>
        <div className="main-bottom mb-4 footnote_font">{ results.footnote }</div>
      </div>
    </div>
  );
}

export default Results;
