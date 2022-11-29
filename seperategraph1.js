// import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
// import define from "https://api.observablehq.com/d/ffb3099e2ba5dd91@350.js?v=3";
// new Runtime().module(define, name => {
//   if (name === "chart1") return new Inspector(document.querySelector("#observablehq-chart1-c23b8e9f"));
//   return ["focus1"].includes(name);
// });


// import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
// import define from "https://api.observablehq.com/d/ffb3099e2ba5dd91@350.js?v=3";
// new Runtime().module(define, name => {
//   if (name === "chart1") return new Inspector(document.querySelector("#observablehq-chart1-b580c0ef"));
//   if (name === "chart2") return new Inspector(document.querySelector("#observablehq-chart2-b580c0ef"));
//   return ["focus1","focus2"].includes(name);
// });





//  <div id="observablehq-chart1-62198941"></div>
// <p>Credit: <a href="https://observablehq.com/d/ffb3099e2ba5dd91">Single-Linked Interactive Visualization by Kartik Maheshwari</a></p>

// <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
// <script type="module">

import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/ffb3099e2ba5dd91.js?v=3";
new Runtime().module(define, name => {
  if (name === "chart1") return new Inspector(document.querySelector("#observablehq-chart1-62198941"));
  return ["focus1"].includes(name);
});






// function display2018() {
//     Document.getElementById('viz').innerHTML = html`<div id="observablehq-chart1-b580c0ef"></div>`;
// }


// function display2020() {
//     Document.getElementById('viz').innerHTML = html`<div id="observablehq-chart2-b580c0ef"></div>`;
// }