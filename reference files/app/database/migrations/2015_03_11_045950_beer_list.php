<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class BeerList extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('drink', function ($table) {
            $table->increments('id');
            $table->string('name');
            $table->string('desc');
            $table->float('ibu');
            $table->float('abv');
            $table->float('price');
            $table->float('quantity');
            $table->enum('new', [0,1]);
            $table->enum('favorite', [0,1]);
            $table->timestamps();
            $table->softDeletes();
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        Schema::drop('drink');
	}

}
