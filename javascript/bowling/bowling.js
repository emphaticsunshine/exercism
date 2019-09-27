import { throwStatement, thisTypeAnnotation, thisExpression } from "@babel/types";

//
// This is only a SKELETON file for the 'Bowling' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

const STRIKE = 10;
const LAST_FRAME = 10;


export class Bowling {
  constructor() {
    this.totalScore = 0;
    this.frames = [];
    this.addAdditional = [];
    this.currentFrame = new Frame(1);
    this.done = false;
  }
  roll(number) {
    if(this.done) {
      throw Error('Cannot roll after game is over');
    } else if(number < 0) {
      throw Error('Negative roll is invalid');
    } else if(number > STRIKE) {
      throw Error('Pin count exceeds pins on the lane');
    }

    this.currentFrame.addPin(number);
    this.totalScore += number;
    if(this.addAdditional.length > 0) {
      for(let i = 0; i < this.addAdditional.length; i++) {
        this.totalScore += number;
        this.addAdditional[i]--;
        if(this.addAdditional[i] === 0) {
          this.addAdditional = this.addAdditional.splice(i + 1, 1);
          i--;
        }
      }
    }
    if(this.currentFrame.isSpare) {
      this.addAdditional.push(1);
    }
    if(this.currentFrame.isStrike) {
      this.addAdditional.push(2);
    }
    if(this.currentFrame.done) {
      if(this.currentFrame.isLastFrame()) {
        this.done = true;
      }
      this.frames.push(this.currentFrame);
      if(!this.currentFrame.isLastFrame()) {
        this.currentFrame = new Frame(this.frames.length + 1);
      }
    }
  }
  score() {
    if(!this.done) {
      throw Error('Score cannot be taken until the end of the game');
    }
    return this.totalScore;
  }
}

class Frame {
  constructor(number) {
    this.frameNumber = number;
    this.rolls = [];
    this.isStrike = false;
    this.isSpare = false;
    this.done = false;
  }

  isLastFrame() {
    return this.frameNumber === LAST_FRAME;
  }

  doesPinExceeds(number) {
    const sumOfLast2 = this.rolls[this.rolls.length - 1] + number;
    if(this.isLastFrame()) {
      return this.rolls[this.rolls.length - 1] !== STRIKE && sumOfLast2 > STRIKE;
    }
    return false;
  }

  addPin(number) {
    if(this.rolls.length === 0) {
      if(number === STRIKE && !this.isLastFrame()) {
        this.isStrike = true;
        this.done = true;
      }
    } else {
      this.done = true;
      const sumOfLast2 = this.rolls[this.rolls.length - 1] + number;
      if(sumOfLast2 >= STRIKE) {
        if(this.isLastFrame()) {
          if(this.rolls.length !== 2) {
            this.done = false;
            if(this.doesPinExceeds(number)) {
              throw Error('Pin count exceeds pins on the lane');
            }
          } else if(this.rolls[0] === STRIKE) {
            if(this.doesPinExceeds(number)) {
              throw Error('Pin count exceeds pins on the lane');
            }
          }
        } else if(sumOfLast2 === STRIKE){
          this.isSpare = true;
        } else {
          throw Error('Pin count exceeds pins on the lane');
        }
      }
    }
    this.rolls.push(number);
  }
}