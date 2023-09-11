<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MemotestImages extends Model
{
    use HasFactory;
    use SoftDeletes;

    public function memotest(): BelongsTo
    {
        return $this->belongsTo(Memotest::class);
    }
}
