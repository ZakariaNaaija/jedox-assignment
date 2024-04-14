# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Instructions

### `Init and mock data`
```bash
tsc utils/init.ts 
node utils/init.js
```

### `To run project`
```bash
npm i
npm run start
```

### `To add a new region`
1- Add a new region in table-structure.json like
```json 
"children":[
    {
        "name":"Freiburg",
        "id":2
    },
    {
        "name":"Berlin",
        "id":3
    },
    {
        "name":"Dusseldorf",
        "id":5
    }
]
```

2- Update REGIONS array in transforms.util.ts - line 17 and add a region with the respective order as in table-structure
3- Update the 0 initialisation for measuresMap in transforms.util.ts - line 27 from new Array(5) to new Array(6) 
