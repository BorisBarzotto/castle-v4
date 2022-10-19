import express from 'express';
import { create } from 'express-handlebars'
import indexRoutes from './routes/index_routes.js';
import { dirname , join } from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';

const __dirname = dirname(fileURLToPath(import.meta.url) );

const app = express();

app.set("views", join(__dirname,"views"));
const hbs = create({
    extname: ".hbs",
    layoutsDir: join(app.get("views"),"layouts"),
    partialsDir: join(app.get("views"),"partials"),
    defaultLayout: "main",
});
app.engine(".hbs", hbs.engine );
app.set("view engine", ".hbs");
//Middleware--------------------------------------------
app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}));
//--------------------------------------------------------
app.use(indexRoutes);

app.use(express.static(join(__dirname, 'public')));

export default app;