import React, { useEffect, useState } from "react";
import Board from "@/components/Board";
import { getRandomCards } from "@/helpers/cards.helper";
import ICard from "@/interfaces/card.interface";
import { useRouter } from 'next/router';
import gameSessionService from "@/services/gameSessionService";

export default function Home() {
    const [cards, setCards] = React.useState<ICard[]>([]);
    const [gameSessionId, setGameSessionId] = useState<number | null>(null)
    const [memoTestId, setMemoTestId] = useState<number | null>(null)
    const router = useRouter()

    useEffect(() => {
        setGameSessionId(parseInt(router.query.gameSessionId as string));
        gameSessionService.findById(router.query.gameSessionId as string)
		.then(res => {
            setCards(getRandomCards(res.memoTest.images, res.numberOfPairs));
            setMemoTestId(res.memoTest.id)
        });
    }, [router.query.gameSessionId])

    return (
        <div className="min-h-screen bg-gradient-to-r from-slate-700 to-gray-950">
            <h1 className="flex items-center justify-center pt-2">Game Session {gameSessionId}</h1>
            {gameSessionId && (
                <Board
                    gameSessionId={gameSessionId}
                    cards={cards}
                    memoTestId={memoTestId}
                />
            )}
        </div>
    );
}
