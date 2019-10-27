exports.up = async db => {
    await db.schema.createTable('movies', t => {
          t.increments('id').unsigned().primary();
          t.integer('rank');
          t.string('title').notNull();
          t.string('genre');
          t.string('description').notNull();
          t.string('director');
          t.string('actors');
          t.integer('year');
          t.integer('runtime');
          t.float('rating');
          t.integer('votes');
          t.float('revenue');
          t.integer('metascore');
    })
};

exports.down = async db => {
    await db.schema.dropTableIfExists('movies');
};
