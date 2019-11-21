import express from 'express';
import homeRoute from './server/routes';

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', homeRoute);
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`My BucketList is live on port ${port}`));

export default app;