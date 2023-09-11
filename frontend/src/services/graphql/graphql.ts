import { gql } from '@apollo/client';

export const GET_GAME_SESSIONS = gql`
  query GetGameSessions {
    gamesessions {
        id
        retries
        numberOfPairs
        state
        memoTest {
          id
          name
          images {
            id
            name
            url
          },
        }
    }
  }
`

export const GET_GAME_SESSION = gql`
  query GetGameSession($gameSessionId: Int!) {
    gamesession(id: $gameSessionId) {
        id
        retries
        numberOfPairs
        state
        memoTest {
          id
          name
          images {
            id
            name
            url
          },
        }
    }
  }
`

export const CREATE_GAME_SESSION = gql`
  mutation createGameSession($memotestId: ID!) {
    createGameSession(input: {
        retries: 0
        numberOfPairs: 8
        memoTest: { connect: $memotestId }
    }){
        id
    }
}
`

export const UPDATE_RETRIES_GAME_SESSION = gql`
  mutation UpdateGameSessionRetries($id: ID!, $retries: Int!){
    updateGameSessionRetries(id: $id, retries: $retries){
      id
      retries
      retries
    }
}
`

export const END_GAME_SESSION = gql`
  mutation endGameSession($id: ID!){
    endGameSession(id: $id){
      id
      retries
      numberOfPairs
    }
}
`

export const GET_MEMO_TESTS = gql`
  query GetMemoTests {
    memotests {
        id
        name
        images {
          id
          name
          url
        },
        games {
          id
          state
        }
    }
  }
`
