const loonieMonController = require('./dist/loonieMonController')

test('formats a date', () => {
  // expect(sumFunction(1,2)).toBe(3)
  const testDate = new Date()
  expect(loonieMonController.getFormattedDate(testDate)).toBe("")
})