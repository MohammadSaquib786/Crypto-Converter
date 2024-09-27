import React, { useEffect, useState } from 'react';
import { DollarOutlined } from '@ant-design/icons';
function Rate() {
    const apiurl = `https://api.coingecko.com/api/v3/exchange_rates`;
    const [rateList, setRateList] = useState([]);
    const [inputValue, setInputValue] = useState(0);
    const [firstSelect, setFirstSelect] = useState("Bitcoin");
    const [secondSelect, setSecondSelect] = useState("Ether");
    const [resultValue, setresultValue] = useState(0);


    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (rateList.length == 0) return;
        const firstSelectRate = rateList.find(item => item.label === firstSelect)?.rate || 1;
        const secondSelectRate = rateList.find(item => item.label === secondSelect)?.rate || 1;
        const result = (inputValue * secondSelectRate) / firstSelectRate;
        setresultValue(result);
    }, [inputValue, firstSelect, secondSelect]);


    async function fetchData() {
        try {
            const response = await fetch(apiurl);
            const jsonData = await response.json();
            const data = (jsonData.rates);
            const tempArray = Object.entries(data).map(item => {
                return {
                    label: item[1].name,
                    rate: item[1].value,
                }
            })
            setRateList(tempArray);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    return (
        <div className='container'>
            <h1><DollarOutlined/> Crypto Converter</h1>
            <input type="number" name="" id="" onChange={(event) => setInputValue(event.target.value)} />
            <div>

                <select value={firstSelect} onChange={(event) => setFirstSelect(event.target.value)}>
                    {rateList.map((rate, index) => (
                        <option key={index} value={rate.label}>
                            {rate.label}
                        </option>
                    ))}
                </select>

                <select value={secondSelect} onChange={(event) => setSecondSelect(event.target.value)}>
                    {rateList.map((rate, index) => (
                        <option key={index} value={rate.label}>
                            {rate.label}
                        </option>
                    )
                    )}
                </select>
            </div>

            <h2>  {inputValue} {firstSelect} = {resultValue} {secondSelect}</h2>


        </div>
    );
}

export default Rate;



