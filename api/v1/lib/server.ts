import app = require('./config/app.js')
import env = require('./environment.js')

const PORT: Number = new env('').getPort()
const localApp = new app().app

localApp.listen(PORT, () => {
   console.log('Express server listening on port ' + PORT);
})
