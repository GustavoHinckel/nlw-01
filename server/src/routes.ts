import express from 'express';
import { celebrate, Joi } from 'celebrate';

import multer from 'multer';
import multerConfig from './config/multer';

import PointsControlles from './Controllers/PointsController';
import ItemsControlles from './Controllers/ItemsController';

// index, show, create, update, delete

const routes = express.Router();
const upload = multer(multerConfig);


const pointsController = new PointsControlles();
const itemsController = new ItemsControlles();

routes.get('/items', itemsController.index);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

routes.post(
  '/points', 
  upload.single('image'),
  celebrate({
    body: Joi.object().keys({
      nome: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.number().required(),
      Latitude: Joi.number().required(),
      Longitude: Joi.number().required(),
      city: Joi.string().required(),
      uf: Joi.string().required().max(2),
      items: Joi.string().required(),
    })
  }, {
    abortEarly: false
  }),
  pointsController.create
);

export default routes;