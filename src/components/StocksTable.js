import React, { useContext, useState, useEffect } from 'react'
import StocksContext from '../context/stocks-context'
import { _formatNumber, _setUpdatedData } from '../utils/utils'
import _ from 'lodash'

const StocksTable = () => {
    const {
        stocks,
        motions,
        dispatchStocks,
        dispatchMotions,
        labels,
        isRunning,
        setIsRunning
    } = useContext(StocksContext)
    const [selectedElement, setSelectedElement] = useState({});
    const [tempValue, setTempValue] = useState(null);

    useEffect(() => {
        dispatchStocks({
            type: 'SET_STOCKS',
            stocks: _setUpdatedData(stocks, motions)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [motions])

    const selectElement = (position, label) => {
        setSelectedElement({ position, label })
        setIsRunning(false)
    }
    const handleOnchange = (e) => {
        setTempValue(e.target.value)
    }
    const saveChanges = () => {
        if (tempValue) {
            let updatedStock = _.find(stocks, { position: selectedElement.position })
            const motion = {
                ...updatedStock,
                stocks: {
                    ...updatedStock.stocks,
                    [selectedElement.label]: Number(tempValue)
                },
                class: 'updated'
            }
            dispatchMotions({
                type: 'ADD_MOTION',
                key: selectedElement.position, motion
            })
        }
        setIsRunning(true)
        setSelectedElement({})
        setTempValue(null)
    }

    return (
        <div className="table">
            {
                labels.map(label =>
                    <div className="tr" key={label}>
                        <div className="th">{label}</div>
                        {stocks.map(serie =>
                            <div className="td" key={serie.position}>
                                {!isRunning &&
                                    selectedElement.position === serie.position &&
                                    selectedElement.label === label ?
                                    <input
                                        value={tempValue ? tempValue : _formatNumber(serie.stocks[label])}
                                        type="text"
                                        autoFocus
                                        onChange={handleOnchange}
                                        onBlur={saveChanges}
                                    />
                                    :
                                    <div onClick={() => selectElement(serie.position, label)} >
                                        {_formatNumber(serie.stocks[label])}
                                    </div>
                                }
                            </div>
                        )}
                    </div>
                )
            }
        </div>
    )
}

export { StocksTable as default }
