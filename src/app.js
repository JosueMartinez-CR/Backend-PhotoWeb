import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import adminRoutes from './routes/admin.routes.js'
import homePageRoutes from './routes/homePage.routes.js'
import path from 'path';
const app = express(); 


app.set('port',process.env.PORT || 5000); // configuracion para no reescribir var port



//middlewares
app.use(express.json()); //Interactuar en forma de json
app.use (morgan('dev')); //Permite ver los request and resposes en consola
//app.use(express.urlencoded({extended:false}));
app.use (cors());        //Permite que se conecten de donde sea(otro servidor)



//Routes
app.use('/api',adminRoutes,homePageRoutes);

//Le decimos a la app que cuando reciba imagenes la lleve a esa carpeta
app.use('/photos-uploads', express.static(path.resolve('photos-uploads')));


export default app;