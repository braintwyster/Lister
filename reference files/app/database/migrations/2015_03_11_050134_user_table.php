<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UserTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('employee', function ($table) {
            $table->increments('id');
            $table->string('name');
            $table->string('password', 60);
            $table->integer('key');
            $table->enum('emp_type', [0,1,2]);
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create('emp_ts_sales', function($table){
            $table->increments('id');
            $table->integer('employee_id')->unsigned();
            $table->timestamp('clock_in');
            $table->timestamp('clock_out');
            $table->float('sales');
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('employee_id')->references('id')->on('employee')->onDelete('cascade')->onUpdate('cascade');
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        Schema::drop('employee');
        Schema::drop('emp_ts_sales');
		
	}

}
