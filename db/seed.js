const { sequelize, Post } = require('../models');

(async () => {
  try {
    await sequelize.sync({ force: true });

    await Post.bulkCreate([
      {
        title: 'Hello from Node.js',
        body: 'This is the first seeded post in the converted PersonalWorks project.',
      },
      {
        title: 'Second Post',
        body: 'The original Laravel app listed blog posts and showed each one in a detail page. This version keeps that same behavior.',
      },
    ]);

    console.log('Database seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed database:', error);
    process.exit(1);
  }
})();
