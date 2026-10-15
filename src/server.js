import app from './app.js';
import { settings } from './config/settings.js';

app.listen(settings.port, () => {
  console.log(`Servidor iniciado en el puerto ${settings.port}`);
});
