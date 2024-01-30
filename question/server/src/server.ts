
import express from 'express';
import categoryRouter from './routes/category.routes';
import questionRouter from './routes/question.routes';

const app = express();
const PORT = 6000;

app.use(express.json());


app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/questions', questionRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
