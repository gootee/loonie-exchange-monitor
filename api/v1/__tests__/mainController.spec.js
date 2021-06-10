const MainController = require('../dist/lib/controllers/mainController');

describe("Data gathering and formatting", () => {
  test("it should format a date ", () => {
    const main = new MainController
    const testDate = new Date()
    const dd  = String(testDate.getDate()).padStart(2, '0')
    const mm = String(testDate.getMonth() + 1).padStart(2, '0')
    const yyyy = String(testDate.getFullYear())
    expect(main.getFormattedDate(testDate)).toBe(yyyy + '-' + mm + '-' + dd)
  });  
 
  test("it should get a default disclaimer without a TO: string", () => {
    const main = new MainController
    expect(main.getDisclaimer("2021-06-01", "")).toBe("Based on recent median exchange rates")
  });  

  test("it should get a default disclaimer without a FROM: string", () => {
    const main = new MainController
    expect(main.getDisclaimer("", "2021-06-01")).toBe("Based on recent median exchange rates")
  }); 

  test("it should get a disclaimer based on two dates", () => {
    const main = new MainController
    expect(main.getDisclaimer("2021-05-01", "2021-06-01")).toBe("*Based on exchange rates between May 1 and June 1, 2021")
  }); 

  test("it should and give default disclaimer if arguments aren't proper dates", () => {
    const main = new MainController
    expect(main.getDisclaimer("topless", "2021-06-01")).toBe("Based on recent median exchange rates")
  }); 

  test("it should give the median value for an even-numbered set of values", () => {
    const main = new MainController
    expect(main.getMedianValue([1, 5, 6, 12, 1, 2, 19, 16, 7, 9, 11, 13])).toBe(8)
  }); 

  test("it should give the median value for an odd-numbered set of values", () => {
    const main = new MainController
    expect(main.getMedianValue([1, 5, 6, 12, 1, 2, 19, 16, 7, 9, 11, 13, 11])).toBe(9)
  }); 
});