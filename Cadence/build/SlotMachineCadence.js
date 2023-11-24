"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Anticipator configuration. Has all information needed to check anticipator.
 * @param columnSize It's the number of columns the slot machine has.
 * @param minToAnticipate It's the minimum number of symbols to start anticipation.
 * @param maxToAnticipate It's the maximum number of symbols to end anticipation.
 * @param anticipateCadence It's the cadence value when has anticipation.
 * @param defaultCadence It's the cadence value when don't has anticipation.
 */
const anticipatorConfig = {
    columnSize: 5,
    minToAnticipate: 2,
    maxToAnticipate: 3,
    anticipateCadence: 2,
    defaultCadence: 0.25,
};
/**
 * Game rounds with special symbols position that must be used to generate the SlotCadences.
 */
const gameRounds = {
    roundOne: {
        specialSymbols: [
            { column: 0, row: 2 },
            { column: 1, row: 3 },
            { column: 3, row: 4 },
        ],
    },
    roundTwo: {
        specialSymbols: [
            { column: 0, row: 2 },
            { column: 0, row: 3 },
        ],
    },
    roundThree: {
        specialSymbols: [
            { column: 4, row: 2 },
            { column: 4, row: 3 },
        ],
    },
};
/**
 * This must be used to get all game rounds cadences.
 */
const slotMachineCadences = { roundOne: [], roundTwo: [], roundThree: [] };
/**
 * This function receives an array of coordinates relative to positions in the slot machine's matrix.
 * This array is the positions of the special symbols.
 * And it has to return a slot machine stop cadence.
 * @param symbols Array<SlotCoordinate> positions of the special symbols. Example: [{ column: 0, row: 2 }, { column: 2, row: 3 }]
 * @returns SlotCadence Array of numbers representing the slot machine stop cadence.
 */
function calculateCadence(specialSymbols, columns, defaultCadence, anticipateCadence) {
    let cadence = Array(columns).fill(defaultCadence);
    let specialSymbolColumns = specialSymbols.map(symbol => symbol.column);
    for (let i = 0; i < cadence.length; i++) {
        let count = specialSymbolColumns.filter(column => column === i).length;
        if (count >= 1 && count <= 2) {
            cadence[i] = anticipateCadence;
        }
    }
    for (let i = 1; i < cadence.length; i++) {
        cadence[i] += cadence[i - 1];
    }
    return cadence;
}
/** function slotCadence(symbols: Array<SlotCoordinate>): SlotCadence {
  
  return [];
}
*/
/**
 * Get all game rounds and return the final cadences of each.
 * @param rounds RoundsSymbols with contains all rounds special symbols positions.
 * @return RoundsCadences has all cadences for each game round.
 */
function handleCadences(rounds) {
    const { columnSize, defaultCadence, anticipateCadence } = config;
    slotMachineCadences.roundOne = calculateCadence(rounds.roundOne.specialSymbols, columnSize, defaultCadence, anticipateCadence);
    slotMachineCadences.roundTwo = calculateCadence(rounds.roundTwo.specialSymbols, columnSize, defaultCadence, anticipateCadence);
    slotMachineCadences.roundThree = calculateCadence(rounds.roundThree.specialSymbols, columnSize, defaultCadence, anticipateCadence);
    return slotMachineCadences;
}
const config = {
    columnSize: 5,
    minToAnticipate: 2,
    maxToAnticipate: 3,
    anticipateCadence: 2,
    defaultCadence: 0.25,
};
console.log('CADENCES: ', handleCadences(gameRounds));
