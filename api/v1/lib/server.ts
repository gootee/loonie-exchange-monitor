import app from "./config/app";
import env from "./environment"

const PORT: Number = env.getPort()
// const PORT = 3001

app.listen(PORT, () => {
   console.log('Express server listening on port ' + PORT);
})
