import { Component, OnInit } from '@angular/core';

class Scores {
  numbers = [ -1, -1, -1, -1, -1, -1];
  threeofakind = -1;
  fourofakind = -1;
  fullhouse = -1;
  highroll = -1;
  yum = -1;
  smstraight = -1;
  lgstraight = -1;
  bonus = -1;
  total = -1;
}

@Component({
  selector: 'app-yum-game',
  templateUrl: './yum-game.component.html',
  styleUrls: ['./yum-game.component.scss']
})

export class YumGameComponent implements OnInit {
  score = new Scores();
  rollNum = 0;
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
      this.rollNum = 0;
      this.roundNum++;
      switch(value){
        case 0:
          this.statusmsg = `Scored ${this.scoreNumbers(1)} on ones.`;
          this.score.numbers[0] = this.scoreNumbers(1);
          break;
        case 1:
          this.statusmsg = `Scored ${this.scoreNumbers(2)} on twos.`;
          this.score.numbers[1] = this.scoreNumbers(2);
          break;
        case 2:
          this.statusmsg = `Scored ${this.scoreNumbers(3)} on threes.`;
          this.score.numbers[2] = this.scoreNumbers(3);
          break;
        case 3:
          this.statusmsg = `Scored ${this.scoreNumbers(4)} on fours.`;
          this.score.numbers[3] = this.scoreNumbers(4);
          break;
        case 4:
          this.statusmsg = `Scored ${this.scoreNumbers(5)} on fives.`;
          this.score.numbers[4] = this.scoreNumbers(5);
          break;
        case 5:
          this.statusmsg = `Scored ${this.scoreNumbers(6)} on sixes.`;
          this.score.numbers[5] = this.scoreNumbers(6);
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
          this.statusmsg = `Scored ${this.scoreSmallStraight()} on small straight.`;
          this.score.smstraight = this.scoreSmallStraight();
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
      }
    }
    else {
      this.statusmsg = "You've gotta roll the dice first!";
    }

  }

  resetDice(){
    for(let i = 0; i < 5; i++){
        this.dice[i].value = 0;
        this.dice[i].keep = false;
    }
  }

  scoreBonus(): number {
    if(this.score.numbers[0] !== -1 && this.score.numbers[1] !== -1 && this.score.numbers[2] !== -1 && this.score.numbers[3] !== -1 && this.score.numbers[4] !== -1 && this.score.numbers[5] !== -1)
      if(this.score.numbers[0] + this.score.numbers[1] + this.score.numbers[2] + this.score.numbers[3] + this.score.numbers[4] + this.score.numbers[5] >= 63)
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

  scoreSmallStraight(): number {
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
       (this.score.numbers[0] !== -1 ? this.score.numbers[0] : 0) +
       (this.score.numbers[1] !== -1 ? this.score.numbers[1] : 0) +
       (this.score.numbers[2] !== -1 ? this.score.numbers[2] : 0)+
       (this.score.numbers[3] !== -1 ? this.score.numbers[3] : 0) +
       (this.score.numbers[4] !== -1 ? this.score.numbers[4] : 0) +
       (this.score.numbers[5] !== -1 ? this.score.numbers[5] : 0) +
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
    this.score = new Scores();
    this.rollNum = 0;
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

  constructor() { }

  ngOnInit(): void {
  }

  bpressRollDice(): void {
    if(this.rollNum < 3){
      this.rollNum++;
      this.statusmsg = "Rolling dice!";
      for(let i = 0; i < 5; i++){
        if(!this.dice[i].keep){
          this.dice[i].value = Math.ceil(Math.random() * 6);
        }
      }
    } else {
      this.statusmsg = "Only 3 rolls allowed! You must score something.";
    }
   
  }
}
