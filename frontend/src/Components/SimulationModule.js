import React, { useState, useEffect } from 'react';
import ReactSlider from 'react-slider';
import SimulationRunMenu from './SimulationRunMenu';
import MyResponsiveBar from './SimulationBarChart';

const SimulationModule = () => {
  const data = [
    [
      {
        Stage: 'E',
        values: 44,
      },
      {
        Stage: 'Q',
        values: 100,
      },
      {
        Stage: 'D',
        values: 25,
      },
      {
        Stage: 'P',
        values: 47,
      },
      {
        Stage: 'I',
        values: 92,
      },
      {
        Stage: 'N',
        values: 81,
      },
      {
        Stage: 'C',
        values: 28,
      },
      {
        Stage: 'G',
        values: 9,
      }
    ],
    [
      {
        Stage: 'E',
        values: 27,
      },
      {
        Stage: 'Q',
        values: 81,
      },
      {
        Stage: 'D',
        values: 68,
      },
      {
        Stage: 'P',
        values: 3,
      },
      {
        Stage: 'I',
        values: 44,
      },
      {
        Stage: 'N',
        values: 76,
      },
      {
        Stage: 'C',
        values: 92,
      },
      {
        Stage: 'G',
        values: 30,
      },
    ],
    [
      {
        "Stage": "E",
        "values": 17,
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

  const winLoss = [
    [
      {
        Stage: 'Win',
        values: 10,
      },
      {
        Stage: 'Loss',
        values: 2,
      }
    ],
    [
      {
        Stage: 'Win',
        values: 13,
      },
      {
        Stage: 'Loss',
        values: 1,
      }
    ],
    [
      {
        Stage: 'Win',
        values: 21,
      },
      {
        Stage: 'Loss',
        values: 5,
      }
    ],
    [
      {
        Stage: 'Win',
        values: 47,
      },
      {
        Stage: 'Loss',
        values: 8,
      }
    ],
  ]

  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isPlaying) {
      timer = setInterval(() => {
        if (currentIndex < data.length - 1) {
          setCurrentIndex((prevIndex) => prevIndex + 1);
          setSliderValue((prevValue) => prevValue + 1);
        } else {
          setCurrentIndex(0);
          setSliderValue(0);
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [currentIndex, data.length, isPlaying]);

  const handleSliderChange = (value) => {
    setCurrentIndex(value);
    setSliderValue(value);
  };

  const togglePlay = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  return (
    <div id='simulation-module-layout'>
      <h3 className='title'> Simulation/History </h3>
      <div>
        <div id='simulation-bar-chart'>
          <MyResponsiveBar data={data[currentIndex]} />
          <MyResponsiveBar data={winLoss[currentIndex]} />
        </div>
        <button onClick={togglePlay}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <ReactSlider
          className='customSlider'
          thumbClassName='customSlider-thumb'
          trackClassName='customSlider-track'
          markClassName='customSlider-mark'
          marks={10}
          min={0}
          max={data.length - 1}
          value={sliderValue}
          onChange={handleSliderChange}
        />
      </div>
    </div>
  );
};

export default SimulationModule;
