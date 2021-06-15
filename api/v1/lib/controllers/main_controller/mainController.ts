import { Request, Response } from 'express'
import axios, { AxiosResponse } from 'axios'

interface ISampleData {
  fromDate: string
  toDate: string
  todayDate: string
  todayRate: number
  medianData: number[]
}

interface IRates {
  [key: string]: {
    "USD": number
  }  
}

class MainController {
  private getFormattedDate(date: Date): string {
    const dd: String  = String(date.getDate()).padStart(2, '0')
    const mm: String = String(date.getMonth() + 1).padStart(2, '0')
    const yyyy: String = String(date.getFullYear())
    return yyyy + '-' + mm + '-' + dd
  }

  private getDisclaimer(from: string, to: string): string {
    if (
        from.length === 0 || 
        to.length === 0 ||
        !Date.parse(from) ||
        !Date.parse(to)
       ){
         
      return "Based on recent median exchange rates"
    } 

    const fromDate: Date = new Date(from + "T00:00:00.000-07:00")
    const toDate: Date = new Date(to + "T00:00:00.000-07:00")
    
    const fromMonth: string = fromDate.toLocaleString('en-us', { month: 'long' })
    const fromYear: number = fromDate.getFullYear()
    const fromDay: number = fromDate.getDate()

    const toMonth: string = toDate.toLocaleString('en-us', { month: 'long' })
    const toYear: number = toDate.getFullYear()
    const toDay: number = toDate.getDate()

    const fromDateVerbiage: string = fromMonth + " " + fromDay + (fromYear === toYear ? "" : "," + fromYear)

    const toDateVerbiage: string = (fromMonth === toMonth ? "" : toMonth + " ") + toDay + ", " + toYear
    const disclaimer: string = "*Based on exchange rates between " + fromDateVerbiage + " and " + toDateVerbiage 

    return disclaimer
  }

  private getSampleData(rates: IRates): ISampleData {
    const todayDate: Date = new Date()
    const today: string =  this.getFormattedDate(todayDate)
    let sampleData: ISampleData = {
      fromDate: today,
      toDate: today,
      todayDate: today,
      todayRate: 0,
      medianData: []
    }

    if(Object.keys(rates).length === 0) return sampleData

    const sortedDates: string[] = Object.keys(rates).sort((a: string, b: string) => {
      return Date.parse(a) - Date.parse(b)
    })
    sampleData.fromDate = sortedDates[0]
    const mostRecentDateInSample: string = sortedDates[sortedDates.length - 1]
    sampleData.todayRate = rates[mostRecentDateInSample]['USD']
    
    let theWholeSampleOfRates: number[] = Object.values(rates).map((USDRate) => {
      return USDRate['USD']
    })

    if (mostRecentDateInSample === sampleData.todayDate) {
      //if we're comparing today's price, don't use it in the median calculation
      theWholeSampleOfRates.pop()
    }
    
    sampleData.medianData = theWholeSampleOfRates
    
    const lastDate: string = sortedDates[sortedDates.length - 1]
    if (lastDate === sampleData.todayDate) {
      sampleData.toDate = sortedDates[sortedDates.length - 2]
    } else {
      sampleData.toDate = lastDate
    }
    
    return sampleData
  }

  private getMedianValue(rates: number[]): number {
    if(rates.length === 0) return 0
    
    const sortedRates = rates.sort((a: number,b: number) => {
      return a-b;
    })
    
    const halfwayIndex: number = Math.floor(sortedRates.length / 2)
    return sortedRates.length % 2 !== 0 ? 
      sortedRates[halfwayIndex] : 
      (sortedRates[halfwayIndex] + sortedRates[halfwayIndex - 1]) / 2
  }

  private getFrankfurterURL(): string {
    let startDate: Date = new Date()
    startDate.setDate(startDate.getDate() - 30)
    return 'https://api.frankfurter.app/' + this.getFormattedDate(startDate) + '..'
  }

  public get_cad_buy_sell(res: Response): void {
    const fetchData = async (res: Response) => {
      const url: string = this.getFrankfurterURL()

      await axios
        .get(url,
          {
            params: {
              from: 'CAD',
              to: 'USD',
            }
          }
        )
        .then(async (axiosRes: AxiosResponse) => {
          if (axiosRes.status === 200) {
            const sampleData: ISampleData = this.getSampleData(axiosRes.data.rates)
            if (sampleData.fromDate === sampleData.todayDate) {
              //no rate data returned from Frankfurter
              return res.send ({
                status: 'Error retrieving rate data'
              })
            } else {
              const medianRate: number = this.getMedianValue(sampleData.medianData)
              const disclaimer: string = this.getDisclaimer(sampleData.fromDate, sampleData.toDate)

              return res.send({
                status: 'OK',
                title: "Loonie Exchange Monitor",
                superText: "Today is a good day to",
                subText: '$CAD @ ' 
                  + sampleData.todayRate.toString() 
                  + ' $USD' 
                  + (disclaimer.length > 0 ? '*' : ''),
                footnote: disclaimer,
                toggle: {
                  aLabel: "Buy",
                  bLabel: "Sell",
                  aIsResult: sampleData.todayRate < medianRate
                },
              })
            }
          }
        })
        .catch((error) => console.log(error.response))
    }
    
    fetchData(res)
  }
}

export = MainController