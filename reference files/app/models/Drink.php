<?php

class Drink extends Eloquent
{
    //use RemindableTrait;

    protected $table = 'drink';

    protected $fillable = [
		    				'name',
				            'desc',
				            'type',
				            'style',
				            'ibu',
				            'abv',
				            'price',
				            'quantity',
				            'new',
				            'favorite'
		    			];

    protected $guarded = ['id'];

}