<?php

class Customer extends Eloquent
{
    //use RemindableTrait;

    protected $table = 'customer';

    protected $fillable = [
		    				'name',
				            'table_num'
		    			];

    protected $guarded = array('id');

}