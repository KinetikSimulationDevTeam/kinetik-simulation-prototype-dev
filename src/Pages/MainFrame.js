import React from 'react'
import NewOpsModule from '../Components/NewOpsModule'
import ScenarioModule from '../Components/ScenarioModule'
import SimulationModule from '../Components/SimulationModule'
import UploadModule from '../Components/UploadModule'

const MainFrame = () => {
  return (
    <div id='mainFrameLayout'>
      <UploadModule />
      <SimulationModule />
    </div>
  )
}

export default MainFrame
