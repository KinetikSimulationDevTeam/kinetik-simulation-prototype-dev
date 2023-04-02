import React, { useState, useEffect } from 'react'
import ReactSlider from "react-slider";
import SimulationRunMenu from './SimulationRunMenu';
import MyResponsiveBar from './SimulationBarChart'

const SimulationModule = () => {

  let data = [
    [
      {
        "Stage": "E",
        "values": 44
      },
      {
        "Stage": "Q",
        "values": 100
      },
      {
        "Stage": "D",
        "values": 25
      },
      {
        "Stage": "P",
        "values": 47
      },
      {
        "Stage": "I",
        "values": 92
      },
      {
        "Stage": "N",
        "values": 81
      },
      {
        "Stage": "C",
        "values": 28
      },
      {
        "Stage": "G",
        "values": 9
      },
      {
        "Stage": "Z",
        "values": 10
      }
    ],
    [
      {
        "Stage": "E",
        "values": 27
      },
      {
        "Stage": "Q",
        "values": 81
      },
      {
        "Stage": "D",
        "values": 68
      },
      {
        "Stage": "P",
        "values": 3
      },
      {
        "Stage": "I",
        "values": 44
      },
      {
        "Stage": "N",
        "values": 76
      },
      {
        "Stage": "C",
        "values": 92
      },
      {
        "Stage": "G",
        "values": 30
      }
    ],
    [
      {
        "Stage": "E",
        "values": 17
      },
      {
        "Stage": "Q",
        "values": 51
      },
      {
        "Stage": "D",
        "values": 8
      },
      {
        "Stage": "P",
        "values": 23
      },
      {
        "Stage": "I",
        "values": 4
      },
      {
        "Stage": "N",
        "values": 52
      },
      {
        "Stage": "C",
        "values": 31
      },
      {
        "Stage": "G",
        "values": 2
      }
    ],
    [
      {
        "Stage": "E",
        "values": 17
      },
      {
        "Stage": "Q",
        "values": 51
      },
      {
        "Stage": "D",
        "values": 8
      },
      {
        "Stage": "P",
        "values": 12
      },
      {
        "Stage": "I",
        "values": 23
      },
      {
        "Stage": "N",
        "values": 58
      },
      {
        "Stage": "C",
        "values": 3
      },
      {
        "Stage": "G",
        "values": 21
      }
    ]
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < data.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 1000);
    }
  }, [currentIndex]);

  return (
    <div id='simulation-module-layout'>
      <h3 className='title'> Simulation/History </h3>
      <div id='simulation-bar-chart'>
        <MyResponsiveBar data={data[currentIndex]} />
        <ReactSlider
          className="customSlider"
          thumbClassName="customSlider-thumb"
          trackClassName="customSlider-track"
          markClassName="customSlider-mark"
          marks={10}
          min={0}
          max={100}
        />
      </div>
    </div>
  )
}

export default SimulationModule;
