const express = require('express');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const { sequelize } = require('./models');

const pagesRouter = require('./routes/pages');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/app');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', pagesRouter);

app.use((req, res) => {
  res.status(404).render('pages/not-found', { title: 'Not Found' });
});

(async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`PersonalWorks Node.js app running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start application:', error);
    process.exit(1);
  }
})();
