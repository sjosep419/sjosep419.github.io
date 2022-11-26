import {pieChart, pieupdate, lineChart} from './multiLink1.js';
import {createMap} from './mapLeaf2.js';

function init() {
    pieChart();
    pieupdate(data1);
    lineChart();
    createMap();
}

window.onload = init;