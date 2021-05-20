import { useState } from 'react'

const BuySellToggle = (buyToday) => {
  const [buyRecommendedToday, setBuyRecommendedTodaya] = useState(buyToday)

  return <div className="m-5"> 
    <label className="toggle" htmlFor="buySellToggle1">
      <input className="toggle_input" value={ buyRecommendedToday } type="checkbox" id="buySellToggle"/>
      <div className="toggle_fill d-flex flex-row justify-content-between align-items-center">
        <div className="buy_sell_container">
          <div className="h2FontWhite buy_sell_label">Buy</div>
        </div>
        <div className="buy_sell_container">
          <div className="h2FontRed buy_sell_label">Sell</div>
        </div>
      </div>
    </label>
  </div>      
}

export default BuySellToggle