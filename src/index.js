import {PORT} from './config.js';
import app from './app.js';
//import './database.js';

app.listen(PORT);
console.log('Servidor en puerto:', PORT);

