import { app } from './app.js';

const port = process.env.PORT ?? 4000;
app.listen(port, (error) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }
  console.log(`Tool Library API running at http://localhost:${port}`);
});