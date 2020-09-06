import express from 'express';
import cors from 'cors';

import { config } from './config';
import { routes } from './routes';

const initializeExpress = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/api', routes);

  app.listen(config.port, () =>
    console.log(`Server listening on port ${config.port}`)
  );
};

initializeExpress();
