const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const { Pool } = require('pg');

const app = new Koa();
const router = new Router();

// DB connection
const pool = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'movies_db',
  password: 'password',
  port: 5432,
});

app.use(cors());
app.use(bodyParser());

// Get all movies
router.get('/api/movies', async (ctx) => {
  const result = await pool.query('SELECT * FROM movies ORDER BY title DESC');
  ctx.body = result.rows;
});

// Add a new movie
router.post('/api/movies', async (ctx) => {
  const { title } = ctx.request.body;
  const result = await pool.query(
    'INSERT INTO movies (title) VALUES ($1) RETURNING *',
    [title]
  );
  ctx.body = result.rows[0];
});

// Like a movie
router.put('/api/movies/:id/like', async (ctx) => {
  const { id } = ctx.params;
  const result = await pool.query(
    'UPDATE movies SET likes = likes + 1 WHERE id = $1 RETURNING *',
    [id]
  );
  ctx.body = result.rows[0];
});

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});