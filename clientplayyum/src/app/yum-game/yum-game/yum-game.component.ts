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
  playerNum = 0;
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
    switch(value){
      case 0:
        this.score.numbers[0] = this.scoreNumbers(1);
        break;
      case 1:
        this.score.numbers[1] = this.scoreNumbers(2);
        break;
      case 2:
        this.score.numbers[2] = this.scoreNumbers(3);
        break;
      case 3:
        this.score.numbers[3] = this.scoreNumbers(4);
        break;
      case 4:
        this.score.numbers[4] = this.scoreNumbers(5);
        break;
      case 5:
        this.score.numbers[5] = this.scoreNumbers(6);
        break;
    }
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
    for(var i = 1; i < 6; i++){
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
      if(sortedDice[i+1] === sortedDice[i] + 1 && sortedDice[i+2] === sortedDice[i] + 2 && sortedDice[i+3] === sortedDice[i] + 3)
      {
        return 15;
      }
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
    if(this.dice[0].value === this.dice[1].value && this.dice[1].value === this.dice[2].value &&  this.dice[3].value === this.dice[4].value){
      return 40;
    }
    return 0;
  }

  constructor() { }

  ngOnInit(): void {
  }

  bpressRollDice(): void {
    for(let i = 0; i < 5; i++){
      if(!this.dice[i].keep){
        this.dice[i].value = Math.ceil(Math.random() * 6);
      }
    }
  }
}
