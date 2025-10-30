import React, { Component } from 'react';

// Components
import Bar from './components/Bar';

// Algorithms
import BubbleSort from './algorithms/BubbleSort_fixed';
import { getMergeSortAnimations } from './algorithms/MergeSort_clean';
import { getInsertionSortAnimations } from './algorithms/InsertionSort';
import { getQuickSortAnimations } from './algorithms/QuickSort_clean';
import { getSelectionSortAnimations } from './algorithms/SelectionSort_clean';
import { algorithmInfo } from './algorithms/AlgorithmInfo';

import './App.css';

class App extends Component {
    state = {
        array: [],
        steps: [],
        colorKey: [],
        colors: [],
        timouts: [],
        currentStep: 0,
        isPlaying: false,
        intervalId: null,
        comparisons: 0,
        swaps: 0,
        elapsed: 0,
        compareMode: false,
        algorithm2: 'merge',
        stepsB: [],
        colorsB: [],
        pseudoSteps: [],
        pseudoStepsB: [],
        currentPseudoLine: null,
        arrayB: [],
        count: 50,
        delay: 100,
        algorithm: 'bubble',
        theme: 'light',
    };

    componentDidMount() {
        this.generateElements();
    }

    toggleTheme = () => {
        this.setState((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' }));
    }

    startPlayback = () => {
        if (this.state.isPlaying) return;

        const { steps, colors, stepsB, colorsB, delay } = this.state;
        if (!steps || steps.length <= 1) return;

        this.setState({ isPlaying: true, intervalId: null, elapsed: 0 }, () => {
            let lastTime = Date.now();
            const id = setInterval(() => {
                // advance one step per tick
                this.setState((prev) => {
                    let nextStep = prev.currentStep + 1;
                    if (nextStep >= steps.length) {
                        clearInterval(id);
                        return { isPlaying: false, intervalId: null, currentStep: prev.currentStep };
                    }

                    // compute comparisons (if color array has any 1s)
                    let comps = prev.comparisons;
                    if (colors[nextStep] && colors[nextStep].some((c) => c === 1)) comps += 1;

                    // compute swaps by comparing arrays
                    let sw = prev.swaps;
                    const prevArr = prev.array;
                    const nextArr = steps[nextStep];
                    if (prevArr && nextArr) {
                        for (let i = 0; i < nextArr.length; i++) {
                            if (prevArr[i] !== nextArr[i]) {
                                sw += 1;
                                break;
                            }
                        }
                    }

                    const now = Date.now();
                    const elapsed = prev.elapsed + (now - lastTime);
                    lastTime = now;

                    const nextArrB = (stepsB && stepsB[nextStep]) ? stepsB[nextStep] : prev.arrayB;

                        return {
                            array: nextArr,
                            colorKey: colors[nextStep],
                            arrayB: nextArrB,
                            currentStep: nextStep,
                            comparisons: comps,
                            swaps: sw,
                            elapsed: elapsed,
                            currentPseudoLine: (prev.pseudoSteps && prev.pseudoSteps[nextStep] != null) ? prev.pseudoSteps[nextStep] : null,
                        };
                });
            }, delay);

        this.setState({ intervalId: id });
        });
    };

    pausePlayback = () => {
        if (!this.state.isPlaying && !this.state.intervalId) return;
        clearInterval(this.state.intervalId);
        this.setState({ isPlaying: false, intervalId: null });
    };

    stepForward = () => {
        const { steps, colors, stepsB, pseudoSteps, currentStep } = this.state;
        if (!steps || currentStep + 1 >= steps.length) return;
        const next = currentStep + 1;
        let comps = this.state.comparisons;
        if (colors[next] && colors[next].some((c) => c === 1)) comps += 1;
        let sw = this.state.swaps;
        const prevArr = this.state.array;
        const nextArr = steps[next];
        if (prevArr && nextArr) {
            for (let i = 0; i < nextArr.length; i++) {
                if (prevArr[i] !== nextArr[i]) { sw += 1; break; }
            }
        }
        const nextArrB = (stepsB && stepsB[next]) ? stepsB[next] : this.state.arrayB;
        this.setState({ array: nextArr, colorKey: colors[next], arrayB: nextArrB, currentStep: next, comparisons: comps, swaps: sw, currentPseudoLine: (pseudoSteps && pseudoSteps[next] != null) ? pseudoSteps[next] : null });
    };


    getStepsForAlgorithm = (inputArray, algorithm) => {
        let array = inputArray.slice();
        let steps = [array.slice()];
        let colors = [new Array(array.length).fill(0)];
        let pseudoSteps = [null];

        switch (algorithm) {
            case 'bubble':
                BubbleSort(array, 0, steps, colors, pseudoSteps);
                break;
            case 'merge': {
                const mergeAnimations = getMergeSortAnimations(array.slice());
                for (let i = 0; i < mergeAnimations.length; i++) {
                    const isColorChange = i % 3 !== 2;
                    if (isColorChange) {
                        const colorKey = new Array(array.length).fill(0);
                        mergeAnimations[i].forEach((idx) => { colorKey[idx] = 1; });
                        colors.push(colorKey);
                        steps.push(array.slice());
                        pseudoSteps.push(5); // merge compare
                    } else {
                        const [barOneIdx, newHeight] = mergeAnimations[i];
                        array[barOneIdx] = newHeight;
                        steps.push(array.slice());
                        colors.push(new Array(array.length).fill(0));
                        pseudoSteps.push(5); // merge write
                    }
                }
                break;
            }
            case 'insertion': {
                const insertionAnimations = getInsertionSortAnimations(array.slice());
                for (let i = 0; i < insertionAnimations.length; i++) {
                    const isColorChange = i % 3 !== 2;
                    if (isColorChange) {
                        const colorKey = new Array(array.length).fill(0);
                        insertionAnimations[i].forEach((idx) => { colorKey[idx] = 1; });
                        colors.push(colorKey);
                        steps.push(array.slice());
                        pseudoSteps.push(3); // insertion compare
                    } else {
                        const [barOneIdx, newHeight] = insertionAnimations[i];
                        array[barOneIdx] = newHeight;
                        steps.push(array.slice());
                        colors.push(new Array(array.length).fill(0));
                        pseudoSteps.push(6); // insertion place key
                    }
                }
                break;
            }
            case 'quick': {
                const quickAnimations = getQuickSortAnimations(array.slice());
                for (let i = 0; i < quickAnimations.length; i++) {
                    const isColorChange = i % 3 !== 2;
                    if (isColorChange) {
                        const colorKey = new Array(array.length).fill(0);
                        quickAnimations[i].forEach((idx) => { colorKey[idx] = 1; });
                        colors.push(colorKey);
                        steps.push(array.slice());
                        pseudoSteps.push(2); // quick compare
                    } else {
                        const [barOneIdx, newHeight] = quickAnimations[i];
                        array[barOneIdx] = newHeight;
                        steps.push(array.slice());
                        colors.push(new Array(array.length).fill(0));
                        pseudoSteps.push(2); // quick swap
                    }
                }
                break;
            }
            case 'selection': {
                const selectionAnimations = getSelectionSortAnimations(array.slice());
                for (let i = 0; i < selectionAnimations.length; i++) {
                    const isColorChange = i % 3 !== 2;
                    if (isColorChange) {
                        const colorKey = new Array(array.length).fill(0);
                        selectionAnimations[i].forEach((idx) => { colorKey[idx] = 1; });
                        colors.push(colorKey);
                        steps.push(array.slice());
                        pseudoSteps.push(3); // selection compare
                    } else {
                        const [barOneIdx, newHeight] = selectionAnimations[i];
                        array[barOneIdx] = newHeight;
                        steps.push(array.slice());
                        colors.push(new Array(array.length).fill(0));
                        pseudoSteps.push(4); // selection swap
                    }
                }
                break;
            }
            default:
                break;
        }

        return { steps, colors, pseudoSteps };
    };

    generateSteps = () => {
        const baseArray = this.state.array.slice();
        const primary = this.getStepsForAlgorithm(baseArray, this.state.algorithm);
        let steps = primary.steps;
        let colors = primary.colors;
        let pseudoSteps = primary.pseudoSteps || [];

        let stepsB = [];
        let colorsB = [];
        let pseudoStepsB = [];
        let arrayB = [];
        if (this.state.compareMode) {
            const secondary = this.getStepsForAlgorithm(baseArray, this.state.algorithm2);
            stepsB = secondary.steps;
            colorsB = secondary.colors;
            arrayB = stepsB[0] ? stepsB[0].slice() : [];
            pseudoStepsB = secondary.pseudoSteps || [];
        }

        this.setState({
            steps: steps,
            colors: colors,
            pseudoSteps: pseudoSteps,
            currentPseudoLine: pseudoSteps && pseudoSteps[0] != null ? pseudoSteps[0] : null,
            stepsB: stepsB,
            colorsB: colorsB,
            pseudoStepsB: pseudoStepsB,
            arrayB: arrayB,
            comparisons: 0,
            swaps: 0,
            elapsed: 0,
            currentStep: 0,
            array: steps[0] ? steps[0].slice() : this.state.array,
            colorKey: colors[0] ? colors[0] : new Array(this.state.count).fill(0),
        });
    };

    generateRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    };

    clearTimeouts = () => {
        this.state.timouts.forEach((timeout) => clearTimeout(timeout));
        this.setState({ timeouts: [] });
    };

    clearColorKey = () => {
        let blank = new Array(this.state.count).fill(0);
        this.setState({ colorKey: blank, colors: [blank] });
    };

    generateElements = () => {
        this.clearTimeouts();
        this.clearColorKey()

        let count = this.state.count;
        let arr = [];

        for (let i = 0; i < count; i++) {
            arr.push(this.generateRandomNumber(50, 200));
        }

        this.setState(
            {
                array: arr,
                steps: [arr],
                count: count,
                currentStep: 0,
            },
            () => this.generateSteps()
        );

        console.log(arr);
    };

    changeArray = (index, value) => {
        let array = this.state.array;
        array[index] = value;
        this.setState({
            array: array,
            steps: [array],
            currentStep: 0,
        }, () => this.generateSteps());
    
    };

    render() {
        const bars = this.state.array.map((value, index) => {
            return (
                <Bar
                    key={index}
                    index={index}
                    length={value}
                    colorKey={this.state.colorKey[index]}
                    changeArray={this.changeArray}
                />
            );
        });
        return (
            <div className={'app ' + (this.state.theme === 'dark' ? 'dark' : '')}>
                <header className="header">
                    <h1>Sorting Visualizer</h1>
                </header>
                <div className="main-content">
                    <div className="control-panel">
                            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                <div></div>
                                <button className="theme-toggle" onClick={this.toggleTheme}>Theme: {this.state.theme === 'dark' ? 'Dark' : 'Light'}</button>
                            </div>
                        <div className="algorithm-section">
                            <h3>Select Algorithm</h3>
                            <select 
                                value={this.state.algorithm}
                                onChange={(e) => {
                                    this.setState({ algorithm: e.target.value }, this.generateElements);
                                }}
                                disabled={this.state.isPlaying}
                            >
                                <option value="bubble">Bubble Sort</option>
                                <option value="merge">Merge Sort</option>
                                <option value="insertion">Insertion Sort</option>
                                <option value="quick">Quick Sort</option>
                                <option value="selection">Selection Sort</option>
                            </select>
                        </div>

                        <div className="array-controls">
                            <h3>Array Controls</h3>
                        <div className="array-size-control">
                            <h4>Array Size: {this.state.count}</h4>
                            <div className="size-slider">
                                <span>10</span>
                                <input
                                    type="range"
                                    min="10"
                                    max="100"
                                    value={this.state.count}
                                    onChange={(e) => {
                                        this.setState({ count: parseInt(e.target.value) }, this.generateElements);
                                    }}
                                    disabled={this.state.isPlaying}
                                />
                                <span>100</span>
                            </div>
                        </div>
                            <div className="button-group">
                                <button onClick={this.generateElements} className="primary-button" disabled={this.state.isPlaying}>
                                    Generate New Array
                                </button>
                                <button onClick={this.startPlayback} className="start-button" disabled={this.state.isPlaying}>
                                    Start Sorting
                                </button>
                            </div>
                        </div>

                        <div className="speed-control">
                            <h3>Animation Speed</h3>
                            <div className="speed-slider">
                                <span>Slow</span>
                                <input
                                    type="range"
                                    min="10"
                                    max="200"
                                    value={200 - this.state.delay}
                                    onChange={(e) => {
                                        this.setState({ delay: 200 - parseInt(e.target.value) });
                                    }}
                                    disabled={this.state.isPlaying}
                                />
                                <span>Fast</span>
                            </div>
                        </div>
                    </div>

                    <div className="playback-panel">
                        <div className="playback-controls">
                                <button onClick={this.startPlayback} className="start-button" disabled={this.state.isPlaying}>Play</button>
                                <button onClick={this.pausePlayback} className="primary-button" disabled={!this.state.isPlaying}>Pause</button>
                                <button onClick={this.stepForward} className="primary-button" disabled={this.state.isPlaying}>Step</button>
                        </div>

                        <div className="live-stats">
                            <div>Comparisons: {this.state.comparisons}</div>
                            <div>Swaps: {this.state.swaps}</div>
                            <div>Step: {this.state.currentStep} / {this.state.steps.length - 1}</div>
                            <div>Elapsed: {(this.state.elapsed / 1000).toFixed(2)}s</div>
                        </div>

                        <div className="compare-mode">
                            <label>
                                <input type="checkbox" checked={this.state.compareMode} onChange={(e) => this.setState({ compareMode: e.target.checked }, this.generateSteps)} disabled={this.state.isPlaying} /> Compare Mode
                            </label>
                            {this.state.compareMode && (
                                <select value={this.state.algorithm2} onChange={(e) => this.setState({ algorithm2: e.target.value }, this.generateSteps)} disabled={this.state.isPlaying}>
                                    <option value="bubble">Bubble Sort</option>
                                    <option value="merge">Merge Sort</option>
                                    <option value="insertion">Insertion Sort</option>
                                    <option value="quick">Quick Sort</option>
                                    <option value="selection">Selection Sort</option>
                                </select>
                            )}
                        </div>
                    </div>

                    <div className="visualizer-container">
                        {this.state.compareMode ? (
                            <div className="compare-visualizers">
                                <div className="card container">
                                    {bars}
                                </div>
                                <div className="card container">
                                    {/* second visualizer */}
                                    {this.state.stepsB && this.state.stepsB[0] ? this.state.stepsB[this.state.currentStep] && this.state.stepsB[this.state.currentStep].map((value, index) => (
                                        <Bar key={"b-"+index} index={index} length={value} colorKey={this.state.colorsB[this.state.currentStep] ? this.state.colorsB[this.state.currentStep][index] : 0} />
                                    )) : <div style={{padding:20}}>No secondary data</div>}
                                </div>
                            </div>
                        ) : (
                            <div className="card container">
                                {bars}
                            </div>
                        )}
                    </div>

                    <div className="algorithm-info">
                        <div className="info-card">
                            <h3>{algorithmInfo[this.state.algorithm].name}</h3>
                            <p>{algorithmInfo[this.state.algorithm].description}</p>
                            <div className="pseudocode">
                                <h4>Pseudocode</h4>
                                <div className="pseudocode-lines">
                                    {algorithmInfo[this.state.algorithm].pseudocode.map((line, idx) => (
                                        <div key={idx} className={"pseudoline " + (this.state.currentPseudoLine === idx ? 'active' : '')}>{line}</div>
                                    ))}
                                </div>
                            </div>
                            <div className="legend">
                                <h4>Legend</h4>
                                <div>Normal: <span className="legend-box" style={{background:'#3d5af1'}}></span></div>
                                <div>Comparing: <span className="legend-box" style={{background:'#ff304f'}}></span></div>
                            </div>
                            <div className="complexity-info">
                                <div className="time-complexity">
                                    <h4>Time Complexity</h4>
                                    <ul>
                                        <li>Best: {algorithmInfo[this.state.algorithm].timeComplexity.best}</li>
                                        <li>Average: {algorithmInfo[this.state.algorithm].timeComplexity.average}</li>
                                        <li>Worst: {algorithmInfo[this.state.algorithm].timeComplexity.worst}</li>
                                    </ul>
                                </div>
                                <div className="space-complexity">
                                    <h4>Space Complexity</h4>
                                    <p>{algorithmInfo[this.state.algorithm].spaceComplexity}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;