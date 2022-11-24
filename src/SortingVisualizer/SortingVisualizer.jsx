import React, { Component } from "react";
import { getMergeSortAnimations } from "../SortingAlgorithms/mergeSortAlgorithm";
import { getQuickSortAnimations } from "../SortingAlgorithms/quickSortAlgorithm";
import { getInsertionSortAnimations } from "../SortingAlgorithms/insertionSortAlgorithm";
import { getBubbleSortAnimations } from "../SortingAlgorithms/bubbleSortAlgorithm";
import './SortingVisualizer.css';

// These values will  be used make the website responsive on all screens
const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// This value is for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = SCREEN_WIDTH / 4 - 20;

// This value is for the max height of the bars in the array.
const BAR_HEIGHT = SCREEN_HEIGHT - 100;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'orange';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i=0; i<NUMBER_OF_ARRAY_BARS; i++) {
            array.push(getRandomNumber(5, BAR_HEIGHT));
        }
        this.setState({array});
    }

    mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

    quickSort() {
      const animations = getQuickSortAnimations(this.state.array);
      for (let i = 0; i < animations.length; i++) {
        const isColorChange =
          animations[i][0] === "comparison1" ||
          animations[i][0] === "comparison2";
        const arrayBars = document.getElementsByClassName("array-bar");
        if (isColorChange === true) {
          const color =
            animations[i][0] === "comparison1"
              ? SECONDARY_COLOR
              : PRIMARY_COLOR;
          const [, barOneIndex, barTwoIndex] = animations[i];
          const barOneStyle = arrayBars[barOneIndex].style;
          const barTwoStyle = arrayBars[barTwoIndex].style;
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
        } else {
          const [, barIndex, newHeight] = animations[i];
          if (barIndex === -1) {
            continue;
          }
          const barStyle = arrayBars[barIndex].style;
          setTimeout(() => {
            barStyle.height = `${newHeight}px`;
          }, i * ANIMATION_SPEED_MS);
        }
      }
    }

    insertionSort() {
      const animations = getInsertionSortAnimations(this.state.array);
      for (let i = 0; i < animations.length; i++) {
        const isColorChange =
          animations[i][0] === "comparison1" ||
          animations[i][0] === "comparison2";
        const arrayBars = document.getElementsByClassName("array-bar");
        if (isColorChange === true) {
          const color =
            animations[i][0] === "comparison1"
              ? SECONDARY_COLOR
              : PRIMARY_COLOR;
          const [, barOneIndex, barTwoIndex] = animations[i];
          const barOneStyle = arrayBars[barOneIndex].style;
          const barTwoStyle = arrayBars[barTwoIndex].style;
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
        } else {
          const [, barIndex, newHeight] = animations[i];
          const barStyle = arrayBars[barIndex].style;
          setTimeout(() => {
            barStyle.height = `${newHeight}px`;
          }, i * ANIMATION_SPEED_MS);
        }
      }
    }

    bubbleSort() {
      const animations = getBubbleSortAnimations(this.state.array);
      for (let i = 0; i < animations.length; i++) {
        const isColorChange =
          animations[i][0] === "comparison1" ||
          animations[i][0] === "comparison2";
        const arrayBars = document.getElementsByClassName("array-bar");
        if (isColorChange) {
          const color =
            animations[i][0] === "comparison1"
              ? SECONDARY_COLOR
              : PRIMARY_COLOR;
          const [, barOneIndex, barTwoIndex] = animations[i];
          const barOneStyle = arrayBars[barOneIndex].style;
          const barTwoStyle = arrayBars[barTwoIndex].style;
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
        } else {
          const [, barIndex, newHeight] = animations[i];
          if (barIndex === -1) {
            continue;
          }
          const barStyle = arrayBars[barIndex].style;
          setTimeout(() => {
            barStyle.height = `${newHeight}px`;
          }, i * ANIMATION_SPEED_MS);
        }
      }
    }

    render() {
        const {array} = this.state;

        return (
            <div className="array-container">
                {array.map((value, idx) => (
                    <div className="array-bar" key={idx} style={{backgroundColor: PRIMARY_COLOR, height: `${value}px`}}></div>
                ))}
                <div>
                    <button className="button" onClick={() => this.resetArray()}><span>Generate New Array</span></button>
                    <button className="button" onClick={() => this.mergeSort()}><span>Merge Sort</span></button>
                    <button className="button" onClick={() => this.quickSort()}><span>Quick Sort</span></button>
                    <button className="button" onClick={() => this.insertionSort()}><span>Insertion Sort</span></button>
                    <button className="button" onClick={() => this.bubbleSort()}><span>Bubble Sort</span></button>
                </div>
            </div>
        );
    }
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0 ; i < arrayOne.length; i++) {
        if (arrayOne[i] !== arrayTwo[i]) return false;
    }
    return true;
}

function complete() {
  const arrayBars = document.getElementsByClassName("array-bar");
  arrayBars[300].style.backgroundColor = 'green';
}