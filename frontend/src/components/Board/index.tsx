import React, { useEffect } from "react";
import { motion } from "framer-motion";
import _ from "lodash";
import ICard from "@/interfaces/card.interface";
import Card from "../Card";
import gameSessionService from "@/services/gameSessionService";
import Modal from "../Modal";

interface BoardProps {
    cards: ICard[];
    gameSessionId: number | null;
    memoTestId: number | null;
}

const Board = ({ cards, gameSessionId, memoTestId }: BoardProps) => {
    const [matchesId, setMatchesId] = React.useState<number[]>([]);
    const [selectedCards, setSelectedCards] = React.useState<number[]>([]);
    const [retries, setRetries] = React.useState<number>(0);
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [currentScore, setCurrentScore] = React.useState<number>(0);

    const handleCardClick = (clickedCard: ICard, index: number) => {
        const tempSelectedCards = _.xor(selectedCards, [index]);

        if (tempSelectedCards.length === 1) {
            setSelectedCards([index]);
        } else if (tempSelectedCards.length === 2) {
            setSelectedCards(tempSelectedCards);
            setRetries(retries + 1);
            const match = cards[tempSelectedCards[0]].id === cards[tempSelectedCards[1]].id;
            setTimeout(() => {
                if (match) {
                    setMatchesId([...matchesId, cards[tempSelectedCards[0]].id]);
                }
                setSelectedCards([]);
            }, 500);
        }
    };

    const successAnimation = {
        scale: [1, 1.2, 1],
        backgroundColor: ["#fff", "#ffcc00", "#fff"],
        transition: { duration: 1 },
    };

    useEffect(() => {
        if(matchesId.length > 0) {
            localStorage.setItem('gameSessionId-'+gameSessionId, JSON.stringify(matchesId));
            if(matchesId.length === (cards.length / 2)) {
                const retriesLocal = localStorage.getItem('gameSessionId-'+gameSessionId+"-retries");
                if(retriesLocal && gameSessionId) {
                    const p1 = gameSessionService.updateRetries(gameSessionId, parseInt(retriesLocal));
                    const p2 = gameSessionService.endGameSession(gameSessionId);
                    Promise.all([p1, p2]);
                    calculateScore();
                    localStorage.removeItem('gameSessionId-'+gameSessionId);
                    setShowModal(true)
                }
            }
        }
    }, [matchesId])

    const calculateScore = () => {
        const score = localStorage.getItem('memoTestId-'+memoTestId+"-score");
        const retriesLocal = localStorage.getItem('gameSessionId-'+gameSessionId+"-retries");
        if(retriesLocal) {
            const newScore = Math.round(((cards.length / 2) / parseInt(retriesLocal)) * 100);
            setCurrentScore(newScore);
            if(score) {
                const scoreJson = JSON.parse(score);
                scoreJson.push(newScore);
                localStorage.setItem('memoTestId-'+memoTestId+"-score", JSON.stringify(scoreJson));
            }
            else {
                const scoreArray = [newScore]
                localStorage.setItem('memoTestId-'+memoTestId+"-score", JSON.stringify(scoreArray));
            }
        }
        localStorage.removeItem('gameSessionId-'+gameSessionId+"-retries");
    }

    useEffect(() => {
        if(retries > 0) {
            localStorage.setItem('gameSessionId-'+gameSessionId+"-retries", JSON.stringify(retries));
        }
    }, [retries])

    useEffect(() => {
        const matchedCards = localStorage.getItem('gameSessionId-'+gameSessionId);
        if(matchedCards) {
            const matchedCardsJson = JSON.parse(matchedCards);
            setMatchesId(matchedCardsJson)
        }
        const retriesLocal = localStorage.getItem('gameSessionId-'+gameSessionId+"-retries");
        if(retriesLocal) {
            setRetries(parseInt(retriesLocal))
        }
    }, [])

    return (
        <>
        {showModal && (
            <Modal 
                title="Game Over"
                description={`You has finished the game, your score is ${currentScore}. Congratulations!`}
            />
        )}
        <div className="bg-gradient-to-r from-slate-700 to-gray-950 min-h-screen">
            <div className="min-h-screen flex items-center justify-center">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                    {cards.map((card: ICard, index: number) => {
                        const success =
                            selectedCards.length === 2 &&
                            cards[selectedCards[0]].id === cards[selectedCards[1]].id &&
                            [selectedCards[0], selectedCards[1]].indexOf(index) > -1;

                        return (
                            <motion.div
                                key={index}
                                animate={
                                    success
                                        ? successAnimation
                                        : {
                                              scale: 1,
                                              backgroundColor: "rgba(255,255,255,1)",
                                          }
                                }
                                style={{ borderRadius: 10, padding: 15, boxShadow: 'rgba(255, 255, 255, 0.3) 0px 50px 100px -20px, rgba(255, 255, 255, 0.3) 0px 30px 60px -30px', backdropFilter: 'blur(10px)' }}>
                                <Card
                                    key={index}
                                    index={index}
                                    card={card}
                                    flipped={selectedCards.indexOf(index) > -1 || matchesId.some((m: number) => m == card.id)}
                                    onClick={handleCardClick}
                                />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
        </>
    );
};

export default Board;
