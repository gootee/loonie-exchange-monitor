import { Application, Request, Response } from 'express';
import { LoonieMonController } from '../controllers/loonieMonController';

export class LoonieMonRoutes {
  private loonieMonController: LoonieMonController = new LoonieMonController()

  public route(app: Application) {
    // app.get('/api/test', (req: Request, res: Response) => {
    //   res.status(200).json({message: "Get request successful"});
    // });
    
    app.get('/', (req: Request, res: Response) => {
      this.loonieMonController.get_cad_buy_sell(res)
    });
  }
}