var chartOption = function(data){
    var option = {
        xAxis: {
            name: "日期",
            type: "category",
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: "#000"
              }
            }
          },
          yAxis: {
            name: "使用率%",
            type: "value",
            boundaryGap: [0, "30%"],
            axisLine: {
              lineStyle: {
                color: "#000"
              }
            }
          },
          visualMap: {
            type: "piecewise",
            show: false,
            dimension: 0,
            seriesIndex: 0,
            pieces: [
              {
                gt: 1,
                lt: 3,
                color: "#38DFE1"
              },
              {
                gt: 5,
                lt: 7,
                color: "#38DFE1"
              }
            ]
          },
          series: [
            {
              type: "line",
              smooth: 0.6,
              symbol: "none",
              lineStyle: {
                color: "#38DFE1",
                width: 5
              },
              markLine: {
                symbol: ["none", "none"],
                label: { show: false },
                data: [{ xAxis: 1 }, { xAxis: 3 }, { xAxis: 5 }, { xAxis: 7 }]
              },
              areaStyle: {},
              data: data
            }
          ]
    }
    
    return option
    
}
 

export { chartOption };
