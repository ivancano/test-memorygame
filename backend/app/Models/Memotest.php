<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Memotest extends Model
{
    use HasFactory;
    use SoftDeletes;

    public static function boot ()
    {
        parent::boot();

        self::deleting(function (Memotest $memoTest) {

            foreach ($memoTest->images as $image)
            {
                $image->delete();
            }
        });
    }

    public function images(): HasMany
    {
        return $this->hasMany(MemotestImages::class);
    }

    public function games(): HasMany
    {
        return $this->hasMany(GameSession::class);
    }
}
