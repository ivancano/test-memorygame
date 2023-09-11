import React from "react";

import _ from "lodash";
import ICard from "@/interfaces/card.interface";
import Image from "next/image";
import ReactCardFlip from "react-card-flip";

interface CardProps {
    card: ICard;
    index: number;
    onClick: (card: ICard, index: number) => void;
    flipped?: boolean;
}

const Card = ({
    card,
    index,
    flipped,
    onClick
}: CardProps) => {
    const _onClick = () => {
        onClick(card, index);
    }

    return (
        <div style={{ height: 120, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <ReactCardFlip isFlipped={flipped}>
                <div onClick={_onClick} style={{ height: '100%' }}>
                    <Image
                        src={require(`../../assets/images/incognite.png`).default}
                        alt={``}
                        width={100}
                        height={150}
                    />
                    <p style={{ color: 'rgba(0,0,0,.75)', textAlign: 'center', fontSize: 11, fontWeight: 400 }}>Tap to flip</p>
                </div>

                <div onClick={_onClick} style={{ height: '100%' }}>
                    <Image
                        src={card.url}
                        alt={``}
                        width={100}
                        height={150}
                    />
                </div>
            </ReactCardFlip>
        </div>
    );
};

export default Card;
