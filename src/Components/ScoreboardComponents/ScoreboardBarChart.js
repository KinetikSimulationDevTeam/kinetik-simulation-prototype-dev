import { ResponsiveBar } from '@nivo/bar'

/*
    Description: This component is used to display the bar chart.

    Arguments: data: result from lambda function that need to be displayed in the bar chart (See Simulation Module)

    Return Type: None
*/
const MyResponsiveScoreBoard = ({ data }) => (
    <ResponsiveBar
        data={data}
        keys={[
            'values',
        ]}
        indexBy="Stage"
        margin={{ top: 5, right: 100, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        colorBy='indexValue'
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        minValue={0}
        enableGridX={true}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -15,
            legend: 'Stage',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            minValue: 10,
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Revenue ($M)',
            legendPosition: 'middle',
            legendOffset: -45,
            scale: 'log'
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function (e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
    />
)

export default MyResponsiveScoreBoard;
