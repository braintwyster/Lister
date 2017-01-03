<?php

class SalesItem extends Eloquent
{
    //use RemindableTrait;

    protected $table = 'sales_item';

    protected $fillable = [
		    				'mods'
		    			];

    protected $guarded = array('id');

}