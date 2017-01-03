<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SaleTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('customer', function ($table) {
            $table->increments('id');
            $table->string('name');
            $table->integer('table_num');
            $table->enum('active', [0,1]);
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('sales_item', function ($table) {
            $table->increments('id');
            $table->integer('drink_id')->nullable();
            $table->integer('food_id')->nullable();
            $table->integer('customer_id');
            $table->string('mods');

            $table->foreign('drink_id')->references('id')->on('drink')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('food_id')->references('id')->on('food')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('customer_id')->references('id')->on('customer')->onDelete('cascade')->onUpdate('cascade');

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
        Schema::drop('customer');
        Schema::drop('sales_item');
		
	}

}
