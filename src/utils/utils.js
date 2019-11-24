const _formatNumber = (number) => {
    return Number(Number(String(number).split('e')[0]).toFixed(2))
}

const _formatData = (labels, list) => {
    let series = []
    labels.forEach(name => {
        let data = []
        list.map((item, i) =>
            data = [...data, [i + 1, _formatNumber(item.stocks[name])]]
        )
        series = [...series, { name, data }]
    })
    return series
}

const _getObjectKeys = (data) => {
    let stocks = []
    data.map(item =>
        stocks = [...stocks, ...Object.keys(item.stocks)]
    )
    return [...new Set(stocks)].sort()
}

const _setUpdatedData = (stocks, motions) => {
    let array = []
    stocks.forEach((el, i) => {
        const position = i + 1;
        array = [
            ...array,
            motions[position] ? { ...motions[position], position } : { ...el, position }
        ]
    })
    return array
}

export { _formatNumber, _formatData, _getObjectKeys, _setUpdatedData }