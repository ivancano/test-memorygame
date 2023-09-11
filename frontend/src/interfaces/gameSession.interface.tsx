import MemoTest from "./memotest.interface"

interface GameSession {
    id: number
    retries: number
    numberOfPairs: number
    state: string
    memoTest: MemoTest
}

export default GameSession;