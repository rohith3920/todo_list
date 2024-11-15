import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AmountUsaToIndia = () => {
    const [amount, setAmount] = useState('');
    const [dropDown1, setdropDown1] = useState('');
    const [dropDown2, setdropDown2] = useState('');
    const [amountValue, setamountValue] = useState(null);
    const [error, setError] = useState(null);

    const handleAmountChange = (e) => {
        const value = e.target.value;
        if (!/^\d*\.?\d*$/.test(value)) {  // Allows only numbers and an optional decimal point
            setError('Please enter numbers only, not text.');
        } else {
            setError('');  // Clear the error if the input is valid
            setAmount(value);
        }
    };

    const handledropDown1Change = (e) => {
        setdropDown1(e.target.value);
    };

    const handledropDown2Change = (e) => {
        setdropDown2(e.target.value);
    };

    const fetchData = async () => {
        try {
            const response = await axios.post(`https://api.frankfurter.app/latest?amount=${amount}&from=${dropDown1}&to=${dropDown2}`);
            setamountValue(response.data);
            setError(null);
        } catch (err) {
            setError('An error occurred while fetching data');
            setamountValue(null);
        }
    };



    useEffect(() => {
        if (amount && dropDown1 && dropDown2) {
            fetchData();
        }
        // eslint-disable-next-line
    }, [amount, dropDown1, dropDown2]);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Amount Input and Dropdowns </h2>
            <div>
                <label>Amount:</label>
                <input
                    type="text"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="Enter amount"
                    style={{ margin: '10px' }}
                />
            </div>
            <div>
                <label>Amount 1:</label>
                <select value={dropDown1} onChange={handledropDown1Change} style={{ margin: '10px' }}>
                    <option value=""></option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="CAD">CAD</option>
                    <option value="INR">INR</option>
                </select>
            </div>
            <div>
                <label>Amount 2:</label>
                <select value={dropDown2} onChange={handledropDown2Change} style={{ margin: '10px' }}>
                    <option value=""></option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="CAD">CAD</option>
                    <option value="INR">INR</option>
                </select>
            </div>
            <div>

                {error ? <p style={{ color: 'red' }}>{error}</p> : null}
                {amountValue ? (

                    <div>
                        currency:    {amountValue?.rates?.INR || amountValue?.rates?.USD || amountValue?.rates?.EUR || amountValue?.rates?.CAD}

                    </div>
                ) : (
                    <p>Enter values to get a response.</p>
                )}
            </div>
        </div>
    );
};

export default AmountUsaToIndia;
