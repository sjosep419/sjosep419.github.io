import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/d/ffb3099e2ba5dd91.js?v=3";
new Runtime().module(define, name => {
  if (name === "chart1") return new Inspector(document.querySelector("#observablehq-chart1-a355ad55"));
  if (name === "chart2") return new Inspector(document.querySelector("#observablehq-chart2-a355ad55"));
  return ["focus1","focus2"].includes(name);
});


function display2018() {
    Document.getElementById('viz').innerHTML = html`<div id="observablehq-chart1-a355ad55"></div>`;
}


function display2020() {
    Document.getElementById('viz').innerHTML = html`<div id="observablehq-chart2-a355ad55"></div>`;
}