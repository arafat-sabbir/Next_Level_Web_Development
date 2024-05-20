import mongoose from 'mongoose';
import app from './app';
import config from './app/config';



import userRoutes from "./app/modules/student/student.route"


async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('connected To Mongodb');
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error,"from");
  }
}
main();
