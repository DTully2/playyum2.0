export interface Score {
    id: number;
    userid: number;
    startdate: Date;
    finishdate?: Date;
    ones: number;
    twos: number;
    threes: number;
    fours: number;
    fives: number;
    sixes: number;
    threeofakind: number;
    fourofakind: number;
    fullhouse: number;
    highroll: number;
    yum: number;
    smstraight: number;
    lgstraight: number;
    bonus: number;
    total: number;
    roll: number;
    dicestring: string;
}
