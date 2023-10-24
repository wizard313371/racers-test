  import { Router } from 'express';
  import * as driverController from '../controllers/driverController';

  const router = Router();

  router.get('/', driverController.getDrivers);
  router.post('/', driverController.addDriver);

  router.get('/:id', driverController.getDriver);
  router.put('/:id', driverController.updateDriver);
  router.delete('/:id', driverController.deleteDriver);

  export default router;
