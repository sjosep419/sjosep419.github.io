import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/ffb3099e2ba5dd91@350.js?v=3";
new Runtime().module(define, name => {
  if (name === "chart1") return new Inspector(document.querySelector("#observablehq-chart1-b580c0ef"));
  if (name === "chart2") return new Inspector(document.querySelector("#observablehq-chart2-b580c0ef"));
  return ["focus1","focus2"].includes(name);
});



// function display2018() {
//     Document.getElementById('viz').innerHTML = html`<div id="observablehq-chart1-b580c0ef"></div>`;
// }


// function display2020() {
//     Document.getElementById('viz').innerHTML = html`<div id="observablehq-chart2-b580c0ef"></div>`;
// }