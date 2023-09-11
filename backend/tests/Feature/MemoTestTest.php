<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Memotest;

class MemoTestTest extends TestCase
{
    use RefreshDatabase;

    public function test_query_memotest(): void
    {
        $memotest = Memotest::factory()->create();
        // Define your GraphQL query
        $query = '
            query {
                memotest(id: 2) {
                    id
                    name
                }
            }
        ';

        // Send a POST request to your GraphQL endpoint
        $response = $this->post('/graphql', ['query' => $query]);
        // Assert the response status code
        $response->assertStatus(200);
        // Assert the response contains the expected data
        $response->assertJson([
            'data' => [
                'memotest' => [
                    'id' => $memotest->id,
                    'name' => $memotest->name,
                ]
            ],
        ]);
    }
}
