import client from './graphqlService';
import { CREATE_GAME_SESSION, END_GAME_SESSION, GET_GAME_SESSION, GET_GAME_SESSIONS, UPDATE_RETRIES_GAME_SESSION } from './graphql/graphql';
import GameSession from '@/interfaces/gameSession.interface';

const gameSessionService = {
    findAll: () : Promise<GameSession[]> =>  {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await client.query({ query: GET_GAME_SESSIONS })
                resolve(res.data.gamesessions as GameSession[]);
            }
            catch(e) {
                reject(e)
            }
        })
    },
    findById: (id: string) : Promise<GameSession> =>  {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await client.query({ query: GET_GAME_SESSION, variables: {gameSessionId: parseInt(id)} })
                resolve(res.data.gamesession as GameSession);
            }
            catch(e) {
                reject(e)
            }
        })
    },
    create: (memotestId: number) => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await client.mutate({mutation: CREATE_GAME_SESSION, variables: {memotestId: memotestId}})
                resolve(res.data.createGameSession.id);
            }
            catch(e) {
                reject(e)
            }
        })
    },
    updateRetries: (gameSessionId: number, retries: number) => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await client.mutate({mutation: UPDATE_RETRIES_GAME_SESSION, variables: {id: gameSessionId, retries: retries}})
                resolve(res.data.gamesession);
            }
            catch(e) {
                reject(e)
            }
        })
    },
    endGameSession: (gameSessionId: number) => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await client.mutate({mutation: END_GAME_SESSION, variables: {id: gameSessionId}})
                resolve(res.data.gamesession);
            }
            catch(e) {
                reject(e)
            }
        })
    }
}

export default gameSessionService;