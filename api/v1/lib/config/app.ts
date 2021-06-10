import express from "express"
import cors from 'cors'
import { CommonRoutes } from "../routes/common_routes.js"
import MainRoutes = require("../routes/mainRoutes.js")

class App {
  public app: express.Application
  private commonRoutes: CommonRoutes = new CommonRoutes()
  private mainRoutes: MainRoutes = new MainRoutes()

  constructor() {
    this.app = express()
    this.config()
    this.mainRoutes.route(this.app)

    //always last
    this.commonRoutes.route(this.app)
  }

  private config(): void {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(cors())
  }
}

export = App