# svg-circle-pos

A commandline-tool to parse `cx` and `cy` attributes from `<circle>`-elements in an svg-file, and write them to a new json-file.
The new json-file normalizes the numbers on a scale from 0-1.

So a file containing this:
```
  <circle cx="0" cy="100" r="1">
  <circle cx="50" cy="75" r="1">
```
Would be transformed into this:
```
  [
    {x:0, y:1},
    {x:0.5,y:0.75}
  ]
```

## Install

```
npm install -g https://github.com/perbyhring/svg-circle-pos.git
```

## Usage

```
  svg-circle-pos my-svg-file.svg
  // Outputs data in my-svg-file.json
```
or
```
  svg-circle-pos my-svg-file.svg my-data.json
  // Outputs data in my-data.json
```

## Why did I make this?

For some creative purposes involving particle animations and such =)
