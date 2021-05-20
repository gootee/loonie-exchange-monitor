import express from "express"
import cors from 'cors'
import { CommonRoutes } from "../routes/common_routes"
import { LoonieMonRoutes } from "../routes/loonieMon_routes"

class App {
  public app: express.Application
  private common_routes: CommonRoutes = new CommonRoutes()
  private loonieMon_routes: LoonieMonRoutes = new LoonieMonRoutes()

  constructor() {
    this.app = express()
    this.config()
    this.loonieMon_routes.route(this.app)

    //always last
    this.common_routes.route(this.app)
  }

  private config(): void {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(cors())
  }
}
export default new App().app