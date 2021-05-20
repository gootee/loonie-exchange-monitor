import { useState, useEffect } from 'react'
import axios from 'axios'
import env from '../environment'
import BuySellToggle from './BuySellToggle'

const Main = (rates) => {
  const [error, setError] = useState(null)
  const [rateData, setRateData] = useState(rates)

  useEffect(() => {
    fetchData()
  })

  const fetchData = async () => {
    const port: Number = env.getPort()
    const url: string = 'http://localhost:' + port +'/'
    await axios.get(url, {})
    .then(response => {
      if (response.status === 200 && response.data.status === "OK") {
        setRateData(response.data)
      } else {
        throw Error("There was an error accessing rate data.  Please check back again.")
      }
    })
    .catch(err => setError(err))
  }

  if (error) {
    return <p id="error" className="errorClass">{ error.message }</p>
  }

  return <div className="main row d-flex flex-column justify-content-between align-items-center">
    <div className="main-top mt-5">

      <div className="h3Font m-4">Today is a good day to</div>
       <BuySellToggle buyRecommendedToday={ rateData.buyRecommendedToday }/>
      <div className="h3Font m-4">$CAD @ { rateData.todayRate } $USD*</div>
    </div>
    <div className="main-bottom mb-4 h4Font">{ rateData.disclaimer }</div>
  </div>
}

export default Main