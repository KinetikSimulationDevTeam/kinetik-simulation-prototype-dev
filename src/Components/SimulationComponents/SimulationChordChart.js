import { ResponsiveChord } from '@nivo/chord';

const SimulationChordChart = ({ data, key }) => {
  return (
    <ResponsiveChord
        data={data}
        keys={["Prospecting", "Lead Qualification", "Demo /Meeting", "Proposal", "Negotiation", "Win", "Loss"]}
        margin={{ top: 50, right: 140, bottom: 50, left: 50 }}
        valueFormat=".2f"
        padAngle={0.02}
        innerRadiusRatio={0.96}
        innerRadiusOffset={0.02}
        inactiveArcOpacity={0.25}
        arcBorderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.6
                ]
            ]
        }}
        activeRibbonOpacity={0.75}
        inactiveRibbonOpacity={0.25}
        ribbonBorderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.6
                ]
            ]
        }}
        labelRotation={-90}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1
                ]
            ]
        }}
        colors={{ scheme: 'nivo' }}
        motionConfig="stiff"
    />
  );
};

export default SimulationChordChart;
