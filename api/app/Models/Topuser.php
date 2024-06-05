<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
//use Illuminate\Database\Eloquent\Model;
use MongoDB\Laravel\Eloquent\Model;

class Topuser extends Model
{
    use HasFactory;
    protected $connection = 'mongodb';
    protected $collection = 'topusers_collection';
    protected  $fillable = ['nombre', 'tiempo', 'nivel', 'palabra', 'foto'];
}
