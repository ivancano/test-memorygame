<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\GameSession;
use App\Models\MemoTest;

class GameSessionTest extends TestCase
{
    use RefreshDatabase;

    public function test_query_game_session(): void
    {
        $memotest = MemoTest::factory()->create();
        $gameSession = GameSession::factory()
                        ->for($memotest)
                        ->create();
        // Define your GraphQL query
        $query = '
            query {
                gamesession(id: 1) {
                    retries
                    numberOfPairs
                    state
                    memoTest {
                        id
                        name
                    }
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
                'gamesession' => [
                    'retries' => $gameSession->retries,
                    'numberOfPairs' => $gameSession->numberOfPairs,
                    'state' => $gameSession->state,
                    'memoTest' => [
                        'id' => strval($memotest->id),
                        'name' => $memotest->name
                    ]
                ]
            ],
        ]);
    }
}
