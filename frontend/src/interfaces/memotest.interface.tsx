import GameSession from "./gameSession.interface";
import MemoTestImages from "./memotestImages.interface";

interface MemoTest {
    id: number
    name: string
    images: MemoTestImages[]
    games: GameSession[]
}

export default MemoTest;