import express, { Request, Response, NextFunction } from 'express';
import loginService from './login.service';
import routerCatch from '../../utils/routerCatch';

const router = express.Router();

router.route('/').post(
  routerCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const {body} = req;
      
      const result = await loginService.login(body);
    
      res.status(200).json(result);
      next();
    }
  )
);

export default router;
