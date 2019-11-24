import express from 'express';;
import router from './server/routes';

require('./passport');


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`My BucketList is live on port ${port}`));

export default app;