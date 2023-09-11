import React, { useEffect, useState } from "react";
import gameSessionService from "@/services/gameSessionService";
import { useRouter } from 'next/router';
import memoTestService from "@/services/memoTestService";
import MemoTest from "@/interfaces/memotest.interface";


export default function Home() {

	const [memotests, setMemotests] = useState<MemoTest[]>([])
	const router = useRouter()

  useEffect(() => {
		memoTestService.findAll()
		.then(res => setMemotests(res));
	}, []);

	const startNewGame = (memotestId: number, gamePendingId: number | null = null) => {
    if(gamePendingId !== null) {
      router.push(`/board/${gamePendingId}`);
    }
		else {
      gameSessionService.create(memotestId)
		  .then(gameSessionIdCreated => {
        router.push(`/board/${gameSessionIdCreated}`);
      });
    }
	}

    return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-full lg:w-3/4 xl:w-1/2">
            <h1 className="text-3xl font-semibold mb-4 mb-10">Games List</h1>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1">Name</div>
              <div className="col-span-1">High Score</div>
              <div className="col-span-1">Start</div>
              {memotests.map((m, i) => {
                const gamePending = m.games.find(g => g.state === 'STARTED');
                const scoreString = localStorage.getItem('memoTestId-'+m.id+'-score');
                const score = scoreString ? Math.max(...JSON.parse(scoreString)) : 0;
                return (
                  <React.Fragment key={i}>
                    <div>{m.name}</div>
                    <div>{score}</div>
                    <div>
                      {gamePending && (
                        <button onClick={() => startNewGame(m.id, gamePending.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                          Continue
                        </button>
                      )}
                      {!gamePending && (
                        <button onClick={() => startNewGame(m.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                          Start
                        </button>
                      )}
                    </div>
                  </React.Fragment>
                  )
                }
              )}
            </div>
          </div>
        </div>
      );
}
       