import app from './app.js';
import {startConnection} from './database.js';
import * as dotenv from 'dotenv' 
dotenv.config()


async function main() {
    await startConnection();
    app.listen(app.get('port')); //Puedo gracias a app.set
    console.log("Running",app.get('port'));
}

main();