import { Request, Response } from 'express';
import { Driver, IDriver } from '../models/driverModel';
import Joi from 'joi';

const handleError = (res: Response, error: unknown): void => {
  if (error instanceof Joi.ValidationError) {
    console.log(error.details[0].message);
    res.status(400).json(error.details[0].message)
  } else if (error instanceof Error) {
    console.log(error.message);
    res.status(500).json(error.message);
  } else {
    console.log('An unexpected error occurred');
    res.status(500).json('An unexpected error occurred');
  }
};

const driverSchema = Joi.object({
  givenName: Joi.string().required(),
  familyName: Joi.string().required(),
  url: Joi.string().uri().required(),
  dateOfBirth: Joi.date().required(),
  nationality: Joi.string().required(),
});

export const getDrivers = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const startIndex = (page - 1) * limit;

    const drivers = await Driver.find()
      .select('givenName familyName')
      .skip(startIndex)
      .limit(limit)
      .lean() as IDriver[];

    const totalDriversCount = await Driver.countDocuments();

    res.json({ drivers, totalDriversCount });
  } catch (error) {
    handleError(res, error);
  }
};

export const getDriver = async (req: Request, res: Response): Promise<void> => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) {
      res.status(404).send('Driver not found');
      return;
    }
    res.json(driver);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateDriver = async (req: Request, res: Response): Promise<void> => {
  const { error } = driverSchema.validate(req.body);
  if (error) {
    handleError(res, error);
    return;
  }

  try {
    const driver = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!driver) {
      res.status(404).send('Driver not found');
      return;
    }
    res.json(driver);
  } catch (error) {
    handleError(res, error);
  }
};

export const addDriver = async (req: Request, res: Response): Promise<void> => {
  const { error } = driverSchema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  try {
    const driver = new Driver(req.body);
    await driver.save();
    res.json(driver);
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteDriver = async (req: Request, res: Response): Promise<void> => {
  try {
    const driver = await Driver.findByIdAndRemove(req.params.id);
    if (!driver) {
      res.status(404).send('Driver not found');
      return;
    }
    res.json(driver);
  } catch (error) {
    handleError(res, error);
  }
};
