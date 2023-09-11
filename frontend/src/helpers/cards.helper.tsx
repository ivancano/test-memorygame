import { cloneDeep, sampleSize, shuffle } from "lodash";
import ICard from "@/interfaces/card.interface";

export const getRandomCards = (allCards: ICard[], numberOfCards: number): ICard[] => {
    if (numberOfCards % 2 !== 0) {
        throw new Error("Número inválido de cartas. Debe ser un número par.");
    }

    const half = numberOfCards / 2;

    let selectedCards: ICard[] = [];
    while (selectedCards.length < half) {
        selectedCards = [...selectedCards, ...sampleSize(cloneDeep(allCards), half - selectedCards.length)];
    }

    // Duplicar y barajar las cartas para tener pares
    const pairCards = shuffle([...selectedCards, ...cloneDeep(selectedCards)]) as ICard[];

    return pairCards;
};
