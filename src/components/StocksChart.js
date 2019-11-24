import React, { useContext } from 'react'
import StocksContext from '../context/stocks-context'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import colors from '../constants/colors'
import { _formatData } from '../utils/utils'


const StocksChart = () => {
    const { stocks, labels } = useContext(StocksContext)

    const options = Highcharts.Options = {
        title: false,
        credits: false,
        chart: {
            backgroundColor: 'transparent',
        },
        plotOptions: {
            line: {
                marker: false
            }
        },
        colors,
        yAxis: {
            title: false
        },
        xAxis: {
            tickInterval: 1
        },
        series: _formatData(labels, stocks)
    }

    return (
        <div className="chart-container">
            <div className="title"></div>
            <div className="chart">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            </div>
        </div>
    )
}

export { StocksChart as default }