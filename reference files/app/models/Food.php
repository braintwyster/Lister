<?php

class Food extends Eloquent
{
    //use RemindableTrait;

    protected $table = 'food';

    protected $fillable = [
		    				'name',
				            'desc',
				            'price'
		    			];

    protected $guarded = array('id');

}