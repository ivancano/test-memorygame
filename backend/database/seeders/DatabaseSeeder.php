<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    private $arrayImagesUrl = [
        'memotest-1-images-1' => 'https://drive.google.com/uc?id=1ELOdYLo7JkSK-fsP76Su6hISyeJ_Jk-c',
        'memotest-1-images-2' => 'https://drive.google.com/uc?id=1c3glJoaKNIBDI52G4Hj_FJLZ7tHD3CVK',
        'memotest-1-images-3' => 'https://drive.google.com/uc?id=1oQloChocNp7-An_SsvV5BvllBywUuxXb',
        'memotest-1-images-4' => 'https://drive.google.com/uc?id=1y6w1IGLfE3IjiM3PohOMIY6CVpvrz2oh',
        'memotest-1-images-5' => 'https://drive.google.com/uc?id=10cUhWd-a6au21yybEm2-fi4yHUV0TFv8',
        'memotest-1-images-6' => 'https://drive.google.com/uc?id=1TAs5eiciisEaYgX_2H9nOmjq172zVIA1',
        'memotest-1-images-7' => 'https://drive.google.com/uc?id=1_Agv2jNYKwnrpJuBc4VTmaYi6hJ_BWN1',
        'memotest-1-images-8' => 'https://drive.google.com/uc?id=1AM0ilQswwKxdaEA3D5Qhz5eJ7DMZaLNW',
        'memotest-2-images-1' => 'https://drive.google.com/uc?id=1T6mUU4m22vMuIEVtOU5TEBv6cuH5KJGC',
        'memotest-2-images-2' => 'https://drive.google.com/uc?id=1nqJGtO6Q6q49z1Cea9tFvq9chXoZIbi1',
        'memotest-2-images-3' => 'https://drive.google.com/uc?id=1GH_lZBz5XuvGw7gxuGsahWWKpl-01PKk',
        'memotest-2-images-4' => 'https://drive.google.com/uc?id=1myYqNxVJbQtwhsSn0_dvKWRd3Wid45wN',
        'memotest-2-images-5' => 'https://drive.google.com/uc?id=1XG7DvZMqr046C4iTStQbSCiUAE2XTYN2',
        'memotest-2-images-6' => 'https://drive.google.com/uc?id=1UcTBjsQzpMlqAaSKrxroXYoizF6A69wN',
        'memotest-2-images-7' => 'https://drive.google.com/uc?id=1WyS8AAiZ93b7rqnjQgV30UOiiDHC2a-u',
        'memotest-2-images-8' => 'https://drive.google.com/uc?id=1FrvXGqgOrX_VlbcJ4ra0E3uqFCc09qmk'
    ];
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        for($i = 0; $i < 2; $i++) {
            $memotestId = DB::table('memotests')->insertGetId([
                'name' => 'memotest-'.($i+1)
            ]);

            for($j = 0; $j < 8; $j++) {
                DB::table('memotest_images')->insert([
                    'name' => 'memotest-images-'.($j+1),
                    'url' => $this->arrayImagesUrl['memotest-'.($i+1).'-images-'.($j+1)],
                    'memotest_id' => $memotestId
                ]);
    
                
            }
        }
    }
}
