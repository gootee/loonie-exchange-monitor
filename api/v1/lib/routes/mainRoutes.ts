import { Application, Request, Response } from 'express';
import MainController = require('../controllers/main_controller/mainController')

class MainRoutes {
  public localmainController = new MainController()

  public route(app: Application) {   
    app.get('/', (req: Request, res: Response) => {
      this.localmainController.get_cad_buy_sell(res)
    });
  }
}

export = MainRoutes