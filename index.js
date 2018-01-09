const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const filepath = process.argv[2];
const newfilename = process.argv[3] || `${filepath.replace('.svg', '')}.json`;
const jsonStyle = process.argv[4] || false;

const filecontents = fs.readFileSync(filepath).toString();

const dom = new JSDOM(filecontents);
const window = dom.window;
const document = window.document;

const circles = document.querySelectorAll('circle');

const data = [...circles].map(circle => {
  return {
    x: circle.getAttribute('cx'),
    y: circle.getAttribute('cy')
  }
});

const minMax = (arr, attr, type) => arr
  .map(p => p[attr])
  .reduce((a,b) => Math[type](a,b));

const xMax = minMax(data, 'x', 'max'),
      xMin = minMax(data, 'x', 'min'),
      yMax = minMax(data, 'y', 'max'),
      yMin = minMax(data, 'y', 'min'),
      xRange = xMax - xMin,
      yRange = yMax - yMin;

const reduceDecimals = n => Math.round(n * 1000) / 1000;

const normalizedData = data.map(point => {
  return {
    x: reduceDecimals(1 / xRange * (point.x - xMin)),
    y: reduceDecimals(1 / yRange * (point.y - yMin))
  }
});

fs.writeFile(
  newfilename,
  JSON.stringify(normalizedData),
  () => console.log(`Normalized svg circle positioning-data written to "${newfilename}".`)
);
