
exports.up = function(knex, Promise) {
  	return Promise.all([

        knex.schema.createTableIfNotExists('users', function(table) {
            table.increments('id').primary();
            table.string('username');
            table.unique('username');
            table.string('password');
            table.string('name');
            table.string('email');
            table.unique('email');
            table.timestamps();
        }),

        knex.schema.createTableIfNotExists('companies', function(table){
            table.increments('id').primary();
            table.string('name');
            table.string('address');
            table.string('city');
            table.string('state');
            table.integer('zip');
            table.string('phone', 20);
          
            table.index('user_id', 'index');
            table.integer('user_id')
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
                
            table.timestamps();
        }),

        knex.schema.createTableIfNotExists('lister_type', function(table) {
            table.increments('id').primary();
            table.string('name');
            table.string('desc');
            table.timestamps();
        }),

        knex.schema.createTableIfNotExists('listers', function(table){
            table.increments('id').primary();
            table.string('name');
            
            table.index('company_id', 'index');
            table.integer('company_id')
                .unsigned()
                .references('id')
                .inTable('companies')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');

            table.index('lister_type_id', 'index');
            table.integer('lister_type_id')
                .unsigned()
                .references('id')
                .inTable('lister_type')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');

            table.timestamps();
        }),

        knex.schema.createTableIfNotExists('item_categ', function(table){
            table.increments('id').primary();
            table.string('name');
            table.string('desc');
            
            table.index('lister_type_id', 'index');
            table.integer('lister_type_id')
                .unsigned()
                .references('id')
                .inTable('lister_type')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            
            table.timestamps();
        }),

        knex.schema.createTableIfNotExists('item_type', function(table){
            table.increments('id').primary();
            table.string('name');
            table.string('desc');
            
            table.index('item_categ_id', 'index');
            table.integer('item_categ_id')
                .unsigned()
                .references('id')
                .inTable('item_categ')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            
            table.timestamps();
        }),

        knex.schema.createTableIfNotExists('item_positions', function(table) {
            table.increments('id').primary();
            table.string('name');
            table.string('desc');
            table.string('css_value');
            table.timestamps();
        }),

        knex.schema.createTableIfNotExists('items', function(table){
            table.increments('id').primary();
            table.string('name');
            table.string('desc');
            table.integer('order');
            
            table.index('lister_id', 'index');
            table.integer('lister_id')
                .unsigned()
                .references('id')
                .inTable('listers')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            
            table.index('item_type_id', 'index');
            table.integer('item_type_id')
                .unsigned()
                .references('id')
                .inTable('item_type')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');

            table.index('position_id', 'index');
            table.integer('position_id')
                .unsigned()
                .references('id')
                .inTable('item_positions')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');

            table.timestamps();
        }),

        knex.schema.createTableIfNotExists('units', function(table) {
            table.increments('id').primary();
            table.string('name');
            table.string('desc');
            table.string('value');
            table.timestamps();
        }),

        knex.schema.createTableIfNotExists('attrs', function(table){
            table.increments('id').primary();
            table.string('name');
            table.string('desc');
            table.string('input_type');           
            table.timestamps();
        }),

        knex.schema.createTableIfNotExists('attr_unit', function(table){
            table.increments('id').primary();
           
            table.index('attr_id', 'index');
            table.integer('attr_id')
                .unsigned()
                .references('id')
                .inTable('attrs')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');

            table.index('unit_id', 'index');
            table.integer('unit_id')
                .unsigned()
                .references('id')
                .inTable('units')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            table.timestamps();
        }), 
        knex.schema.createTableIfNotExists('item_attrs', function(table){
            table.increments('id').primary();
            table.string('value');

            table.index('item_id', 'index');
            table.integer('item_id')
                .unsigned()
                .references('id')
                .inTable('items')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');

            table.index('attr_id', 'index');
            table.integer('attr_id')
                .unsigned()
                .references('id')
                .inTable('attrs')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');

            table.timestamps();
        }),

        knex.schema.createTableIfNotExists('user_transactions', function(table){
            table.increments('id').primary();
            table.enu('success', ['0','1']);
            table.float('amount');
            table.string('ip_address');
            table.string('customer_id');

            table.index('user_id', 'index');
            table.integer('user_id')
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            table.timestamps();
        }),

        knex.schema.createTableIfNotExists('user_time', function(table){
            table.increments('id').primary();
            table.integer('time_left');
            table.integer('time_base');
            table.integer('time_added');
            table.integer('time_free');

            table.index('user_id', 'index');
            table.integer('user_id')
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            table.timestamps();
        }),

        knex.schema.createTableIfNotExists('subscriptions', function(table){
            table.increments('id').primary();
            table.string('charge_id');
            table.timestamp('charge_date').defaultTo(knex.fn.now());
            table.enu('paid', ['0', '1']);
            table.integer('package_time');
            table.enu('refunded', ['0', '1']);
         
            table.index('user_id', 'index');
            table.integer('user_id')
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            table.timestamps();
        }),
    ])
};

exports.down = function(knex, Promise) {
  	return Promise.all([
        knex.schema.dropTable('users'),
        knex.schema.dropTable('companies'),
        knex.schema.dropTable('listers'),
        knex.schema.dropTable('lister_type'),
        knex.schema.dropTable('item_positions'),
        knex.schema.dropTable('items'),
        knex.schema.dropTable('item_type'),
        knex.schema.dropTable('item_categ'),
        knex.schema.dropTable('items'),
        knex.schema.dropTable('units'),
        knex.schema.dropTable('attrs'),
        knex.schema.dropTable('item_attrs'),
        knex.schema.dropTable('user_transactions'),
        knex.schema.dropTable('user_time'),
        knex.schema.dropTable('subscriptions')
    ])
};
