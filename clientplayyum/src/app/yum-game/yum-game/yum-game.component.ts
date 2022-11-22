import { Component, OnInit } from '@angular/core';
import { getCookie } from 'typescript-cookie';
import { Score } from '../score'
import { YumService } from '../yum-game.service';

// class Score {
//   numbers = [ -1, -1, -1, -1, -1, -1];
//   threeofakind = -1;
//   fourofakind = -1;
//   fullhouse = -1;
//   highroll = -1;
//   yum = -1;
//   smstraight = -1;
//   lgstraight = -1;
//   bonus = -1;
//   total = -1;
// }

@Component({
  selector: 'app-yum-game',
  templateUrl: './yum-game.component.html',
  styleUrls: ['./yum-game.component.scss']
})

export class YumGameComponent implements OnInit {
  score: Score;
  roundNum = 0;
  playerNum = 0;
  statusmsg = "Welcome to YUM!";
  dice = [
    {"value": 0, "keep": false},
    {"value": 0, "keep": false},
    {"value": 0, "keep": false},
    {"value": 0, "keep": false},
    {"value": 0, "keep": false}
  ];

  constructor(public yumService: YumService){
    let cookieString: string | undefined = getCookie("loginId");
    let idInt = -1;
    let found = false;
    if (cookieString !== undefined) {
      idInt = parseInt(cookieString);
    }

    this.score = {
      id: -1,
      userid: idInt !== -1 ? idInt : 0,
      startdate: new Date(),
      finishdate: undefined,
      ones: -1,
      twos: -1,
      threes: -1,
      fours: -1,
      fives: -1,
      sixes: -1,
      threeofakind: -1,
      fourofakind: -1,
      fullhouse: -1,
      highroll: -1,
      yum: -1,
      smstraight: -1,
      lgstraight: -1,
      bonus: -1,
      total: -1,
      roll: 0,
      dicestring: "0,0,0,0,0"
    }
    if(idInt !== -1 && this.score.userid !== 0)
    yumService.getUserGame(idInt).subscribe({
      next: (scr: Score) => {
        if(scr.startdate != null && scr.startdate != undefined){
          //console.log("Found a game!");
          this.readDiceString(scr.dicestring);
          this.statusmsg = "Welcome back to Yum!"; // GET USER NAME HERE!
          this.score = scr;

          this.roundNum = this.findRound();
          found = true;
        }
      },
      error: (err: Error) => (this.statusmsg = `Error: - ${err.message}`)
    })
    // console.log("Current Object");
    // console.log(this.score);
    // console.log(found);
  }

  readDiceString(input: string){
    let splitString: string[] = input.split(',');
    let index: number = 0;
    splitString.forEach(str => {
      console.log(`Dice: ${str}`);
      this.dice[index++].value = parseInt(str);
    })
  }

  getImage(index: number) : string {
    if(this.dice[index].value === 0){
      return "assets/Images/white_" + "6" + ".png";
    }
    if(this.dice[index].keep){
      return "assets/Images/white_" + this.dice[index].value + "_selected.png";
    }
    return "assets/Images/white_" + this.dice[index].value + ".png";
  }

  setKeep(index: number): void {
    if(this.dice[index].value !== 0){
      this.dice[index].keep = !this.dice[index].keep;
    }
  }

  scoreThis(value: number){
    if(this.dice[0].value !== 0)
    {
      this.score.roll = 0;
      this.roundNum++;
      switch(value){
        case 0:
          this.statusmsg = `Scored ${this.scoreNumbers(1)} on ones.`;
          this.score.ones = this.scoreNumbers(1);
          break;
        case 1:
          this.statusmsg = `Scored ${this.scoreNumbers(2)} on twos.`;
          this.score.twos = this.scoreNumbers(2);
          break;
        case 2:
          this.statusmsg = `Scored ${this.scoreNumbers(3)} on threes.`;
          this.score.threes = this.scoreNumbers(3);
          break;
        case 3:
          this.statusmsg = `Scored ${this.scoreNumbers(4)} on fours.`;
          this.score.fours = this.scoreNumbers(4);
          break;
        case 4:
          this.statusmsg = `Scored ${this.scoreNumbers(5)} on fives.`;
          this.score.fives = this.scoreNumbers(5);
          break;
        case 5:
          this.statusmsg = `Scored ${this.scoreNumbers(6)} on sixes.`;
          this.score.sixes = this.scoreNumbers(6);
          break;
        case 6:
          this.statusmsg = `Scored ${this.score3OfKind()} on three of a kind.`;
          this.score.threeofakind = this.score3OfKind();
          break;
        case 7:
          this.statusmsg = `Scored ${this.score4OfKind()} on four of a kind.`;
          this.score.fourofakind = this.score4OfKind();
          break;
        case 8:
          this.statusmsg = `Scored ${this.ScoreSmallStraight()} on small straight.`;
          this.score.smstraight = this.ScoreSmallStraight();
          break;
        case 9:
          this.statusmsg = `Scored ${this.scoreLargeStraight()} on large straight.`;
          this.score.lgstraight = this.scoreLargeStraight();
          break;
        case 10:
          this.statusmsg = `Scored ${this.scoreFullHouse()} on full house.`;
          this.score.fullhouse = this.scoreFullHouse();
          break;
        case 11:
          this.statusmsg = `Scored ${this.scoreHighRoll()} on high roll.`;
          this.score.highroll = this.scoreHighRoll();
          break;
        case 12:
          this.statusmsg = `Scored ${this.scoreYum()} on YUM!.`;
          this.score.yum = this.scoreYum();
          break;
      }
      this.resetDice();
      if(this.roundNum === 13){
        this.scoreBonus();
        this.score.total = this.getNumberTotal() + this.getOtherTotal();
        this.statusmsg = `Game over! Your final score was: ${this.getNumberTotal() + this.getOtherTotal()}`;
        this.score.finishdate = new Date();
      }
      if(this.score.id === -1 && this.score.userid !== 0){
        this.yumService.add(this.score).subscribe({
          // Create observer object
          next: (emp: Score) => {
            console.log(emp);
            //this.statusmsg = `Added new game successfully!`;
            this.score.id = emp.id;
          },
          error: (err: Error) => (this.statusmsg = `Game not added! - ${err.message}`)
        });
      }
      else if(this.score.userid !== 0)
      this.yumService.update(this.score).subscribe({
        // Create observer object
        // next: (emp: Score) => {
        //   console.log("Game Updated in database successfully!");
        //   console.log(emp);
        // },
        error: (err: Error) => ( console.log(`Error ${err.message}`))
      });
    }
    else {
      this.statusmsg = "You've gotta roll the dice first!";
    }

  }

  findRound(): number {
    var roundNum = 0;
    if(this.score.ones != -1)
      roundNum++;
    if(this.score.twos != -1)
    roundNum++;
    if(this.score.threes != -1)
    roundNum++;
    if(this.score.fours != -1)
    roundNum++;
    if(this.score.fives != -1)
    roundNum++;
    if(this.score.sixes != -1)
    roundNum++;
    if(this.score.threeofakind != -1)
    roundNum++;
    if(this.score.fourofakind != -1)
    roundNum++;
    if(this.score.fullhouse != -1)
    roundNum++;
    if(this.score.highroll != -1)
    roundNum++;
    if(this.score.yum != -1)
    roundNum++;
    if(this.score.smstraight != -1)
    roundNum++;
    if(this.score.lgstraight != -1)
    roundNum++;
    if(this.score.bonus != -1)
    roundNum++;

    return roundNum;
  }

  resetDice(){
    for(let i = 0; i < 5; i++){
        this.dice[i].value = 0;
        this.dice[i].keep = false;
        this.score.dicestring="0,0,0,0,0";
    }
  }

  scoreBonus(): number {
    if(this.score.ones !== -1 && this.score.twos !== -1 && this.score.threes !== -1 && this.score.fours !== -1 && this.score.fives !== -1 && this.score.sixes !== -1)
      if(this.score.ones + this.score.twos + this.score.threes + this.score.fours + this.score.fives + this.score.sixes >= 63)
      {
        this.score.bonus = 25;
        return 25;
      } else {
        this.score.bonus = 0;
        return 0;
      }
    return -1;
  }

  scoreNumbers(value: number): number {
    var score: number = 0;
    this.dice.forEach(
      (item) =>{
        if(item.value == value){
          score += value;
        }
      }
    )
    return score;
  }

  score3OfKind(): number {
    var score = 0;
    for(var i = 1; i <=6; i++){
      var numFound = 0;
      for(var x = 0; x < this.dice.length; x++){
        if(this.dice[x].value === i){
          numFound++;
        }
      }
      if(numFound >= 3){
        return this.dice[0].value + this.dice[1].value + this.dice[2].value + this.dice[3].value + this.dice[4].value;
      }
    }
    return 0;
  }

  score4OfKind(): number {
    var score = 0;
    for(var i = 1; i < 7; i++){
      var numFound = 0;
      for(var x = 0; x < this.dice.length; x++){
        if(this.dice[x].value === i){
          numFound++;
        }
      }
      if(numFound >= 4){
        return this.dice[0].value + this.dice[1].value + this.dice[2].value + this.dice[3].value + this.dice[4].value;
      }
    }
    return 0;
  }

  scoreFullHouse(): number {
    var threeOfAKind = 0;
    var pair = 0;
    //check for 3 of kind
    for(var i = 1; i <= 6; i++){
      var numFound = 0;
      for(var x = 0; x < this.dice.length; x++){
        if(this.dice[x].value === i){
          numFound++;
        }
      }
      if(numFound >= 3){
        threeOfAKind = i;
      } else if(numFound == 2){
        pair = i;
      }
    }
    if(pair !== 0 && threeOfAKind !== 0){
      return 25;
    }
    return 0;
  }

  scoreHighRoll(): number {
    return this.dice[0].value + this.dice[1].value + this.dice[2].value + this.dice[3].value + this.dice[4].value;
  }

  ScoreSmallStraight(): number {
    var sortedDice = [ this.dice[0].value, this.dice[1].value, this.dice[2].value, this.dice[3].value, this.dice[4].value]
    sortedDice.sort();
    for(var i = 0; i <= 1; i++){
      var straightLength = 1;
      var searchVal = sortedDice[i] + 1;
      for(var x = i+1; x < 5; x++){
        //console.log(`Search: ${searchVal}, Length:${straightLength}, Die: ${x}:${sortedDice[x]}`)
        if(sortedDice[x] === searchVal){
          straightLength++;
          searchVal++;
        }
      }
      if(straightLength >= 4){
        return 15;
      }

      // if(sortedDice[i+1] === sortedDice[i] + 1 && sortedDice[i+2] === sortedDice[i] + 2 && sortedDice[i+3] === sortedDice[i] + 3)
      // {
      //   return 15;
      // }
    }
    return 0;
  }

  scoreLargeStraight(): number {
    var sortedDice = [ this.dice[0].value, this.dice[1].value, this.dice[2].value, this.dice[3].value, this.dice[4].value]
    sortedDice.sort();
    if(sortedDice[1] === sortedDice[0] + 1 && sortedDice[2] === sortedDice[0] + 2 && sortedDice[3] === sortedDice[0] + 3 && sortedDice[4] === sortedDice[0] + 4)
    {
      return 20;
    }
    return 0;
  }

  scoreYum(): number {
    if(this.dice[0].value !== 0 && this.dice[0].value === this.dice[1].value && this.dice[1].value === this.dice[2].value &&  this.dice[3].value === this.dice[4].value){
      return 40;
    }
    return 0;
  }

  getNumberTotal(): number {
    return(
       (this.score.ones !== -1 ? this.score.ones : 0) +
       (this.score.twos !== -1 ? this.score.twos : 0) +
       (this.score.threes !== -1 ? this.score.threes : 0)+
       (this.score.fours !== -1 ? this.score.fours : 0) +
       (this.score.fives !== -1 ? this.score.fives : 0) +
       (this.score.sixes !== -1 ? this.score.sixes : 0) +
       (this.score.bonus !== -1 ? this.score.bonus : 0));
  }

  getOtherTotal(): number {
    return (
      (this.score.threeofakind !== -1 ? this.score.threeofakind : 0) +
      (this.score.fourofakind !== -1 ? this.score.fourofakind : 0) +
      (this.score.smstraight !== -1 ? this.score.smstraight : 0) + 
      (this.score.lgstraight !== -1 ? this.score.lgstraight : 0) +
      (this.score.highroll !== -1 ? this.score.highroll : 0) +
      (this.score.fullhouse !== -1 ? this.score.fullhouse : 0) +
      (this.score.yum !== -1 ? this.score.yum : 0)
    );
  }

  resetGame() {

    this.score = {
      id: -1,
      userid: this.score.userid !== -1 ? this.score.userid : 0,
      startdate: new Date(),
      finishdate: undefined,
      ones: -1,
      twos: -1,
      threes: -1,
      fours: -1,
      fives: -1,
      sixes: -1,
      threeofakind: -1,
      fourofakind: -1,
      fullhouse: -1,
      highroll: -1,
      yum: -1,
      smstraight: -1,
      lgstraight: -1,
      bonus: -1,
      total: -1,
      roll: 0,
      dicestring: "0,0,0,0,0"
    }
    this.score.roll = 0;
    this.roundNum = 0;
    this.statusmsg = "New game begins!";
    this.dice = [
      {"value": 0, "keep": false},
      {"value": 0, "keep": false},
      {"value": 0, "keep": false},
      {"value": 0, "keep": false},
      {"value": 0, "keep": false}
    ];
  }

  ngOnInit(): void {
    //this.readDiceString();
  }

  bpressRollDice(): void {
    if(this.score.roll < 3){
      this.score.roll++;
      this.statusmsg = "Rolling dice!";
      for(let i = 0; i < 5; i++){
        if(!this.dice[i].keep){
          this.dice[i].value = Math.ceil(Math.random() * 6);
        }
      }
      if(this.score.id > 0){
        this.score.dicestring = `${this.dice[0].value},${this.dice[1].value},${this.dice[2].value},${this.dice[3].value},${this.dice[4].value}`
        this.yumService.update(this.score).subscribe({
          error: (err: Error) => ( console.log(`Error ${err.message}`))
        });
      }

    } else {
      this.statusmsg = "Only 3 rolls allowed! You must score something.";
    }
  }
}
