import React, { useState, useReducer } from 'react'
import axios from 'axios'
import stocksReducer from '../reducers/stocks'
import motionsReducer from '../reducers/motions'
import StocksChart from './StocksChart'
import StocksTable from './StocksTable'
import StocksContext from '../context/stocks-context'
import useInterval from '../hooks/useInterval'
import { _getObjectKeys, _setUpdatedData } from '../utils/utils'

const StocksApp = () => {
    const [stocks, dispatchStocks] = useReducer(stocksReducer, [])
    const [motions, dispatchMotions] = useReducer(motionsReducer, [])
    const [isRunning, setIsRunning] = useState(true)
    const [labels, setLabels] = useState([])
    const [delay] = useState(1000)

    useInterval(() => {
        getData(20)
    }, isRunning ? delay : null)

    const getData = async (count) => {
        const response = await axios.get(`http://localhost:8000/?count=${count}`)
        if (response.data) {
            //  Define the list of stocks names to compare
            setLabels(_getObjectKeys(response.data))
            //   - concat strocks & motions ( list of updated Data )
            //   - dispatch new data
            dispatchStocks({
                type: 'SET_STOCKS',
                stocks: _setUpdatedData(response.data, motions)
            })
        }
    }

    return (
        <StocksContext.Provider
            value={{
                stocks,
                dispatchStocks,
                motions,
                dispatchMotions,
                isRunning,
                setIsRunning,
                delay,
                labels
            }}
        >   
            <h1>Stocks Live Values</h1>
            <StocksChart />
            <StocksTable />
        </StocksContext.Provider>
    )
}

export { StocksApp as default }