import React from 'react'
import { Dimensions } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { View, Text } from 'react-native-web';
import {REACT_APP_WEB_API} from '@env'
import {REACT_APP_LOCAL_API} from '@env'
export default function ChartComponent() {
  const url ="https://stajprojewebapi.azurewebsites.net/getchartdata";
  const [value, setValue] = React.useState([]);
  React.useEffect(() => {
    if (value.length < 1 || value == null) {
      fetch(REACT_APP_WEB_API+"getchartdata")
        .then((res) => res.json())
        .then(async (text) => {
          const chartData = Object.entries(text).map(([date, value]) => ({
            x: date,
            y: parseInt(value)
          }));
          console.log(chartData);
          setValue(chartData);
        });
    }
  }, []);

  console.log(value);
  return (
    <View>
      <Text>Günlük Grafik Bilgisi</Text>
      <LineChart
        data={{
          labels: value.map((val) => {
            return val.x
          }),
          datasets: [
            {
              data: value.map((val) => {
                return val.y
              })
            }
          ]
        }}
        width={600} // from react-native
        height={220}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </View>

  )
}
