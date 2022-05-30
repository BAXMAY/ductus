import { ResponsiveLine } from '@nivo/line'
import { useMemo, useState } from 'react'
// import { useOrdinalColorScale } from "@nivo/colors";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const category10 = ['#1F77B4FF', '#FF7F0EFF', '#2CA02CFF', '#D62728FF', '#9467BDFF', '#9C564BFF', '#E377C2FF', '#7F7F7FFF', '#BCBD22FF', '#17BECFFF']

const StatResponsiveLine = ({data}) => {

    const [hiddenIdList, setHiddenIdList] = useState([])

    const [dataDict, setDataDict] = useState(data)

    useMemo(() => {
        const newDataList = [];
        data.forEach(line => {
            if (hiddenIdList.includes(line.id)) {
                // newDataList.push({id: line.id, data: []})
            } else {
                newDataList.push(line)
            }
        });

        setDataDict( newDataList )
    }, [hiddenIdList, data])

    // const colors = useOrdinalColorScale({ scheme: "category10" }, "id");

    const toggle = d => {
        if (hiddenIdList.includes(d.id)) {
            setHiddenIdList(hiddenIdList.filter(id => id !== d.id))
        } else {
            setHiddenIdList([...hiddenIdList, d.id])
        }

    }

    return (
        <ResponsiveLine
            data={dataDict}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: false,
                reverse: false
            }}
            // yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Week ',
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'count',
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            // colors={{ scheme: 'category10' }}
            colors={({id, _}) => {

                const dataIdx = data.findIndex( line => {
                    return line.id === id
                })
                
                return category10[dataIdx];
            }}
            pointSize={20}
            pointColor='white'
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            enablePointLabel={true}
            pointLabel="y"
            pointLabelYOffset={4}
            enableSlices="x"
            useMesh={true}
            // sliceTooltip={({ slice }) => {
            //   return (
            //     <div
            //       style={{
            //           background: 'white',
            //           padding: '9px 12px',
            //           border: '1px solid #ccc',
            //       }}
            //     >
            //       <div>{slice.points[0].data.x}</div>
            //       {slice.points.map(point => (
            //         <div
            //           key={point.id}
            //           style={{
            //               color: point.serieColor,
            //               padding: '3px 0',
            //           }}
            //         >
            //           <strong>{point.serieId}</strong> [{point.data.yFormatted}]
            //         </div>
            //       ))}
            //     </div>
            //   )
            // }}
            legends={[
                {
                    anchor: 'right',
                    direction: 'column',
                    data: data.map((line, idx) => {
                        const color = category10[idx];

                        return {
                            color: hiddenIdList.includes(line.id) ? "rgba(1, 1, 1, .1)" : color,
                            id: line.id,
                            label: line.id
                        };
                    }),
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    onClick: toggle,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
    )
}

export default StatResponsiveLine