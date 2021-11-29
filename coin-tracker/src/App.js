import {useEffect, useState} from "react";

function App() {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);
    const [money, setMoney] = useState();

    const onChange = (event) => {
        if(event.target.value !== undefined && event.target.value >= 0)
            setMoney(event.target.value);
    }


    useEffect(() => {
        fetch("https://api.coinpaprika.com/v1/tickers")
            .then((response) => response.json())
            .then((json) => {
                setCoins(json);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h1>The Coins! ({coins.length})</h1>
            {loading ? <strong>Loading...</strong> : null}
            <input type="number"
                   value={money}
                   onChange={onChange}
                   placeholder="Please input your USD"/>
            <ul>
                {coins.map((coin) =>
                    <li key={coin.id}>{coin.name} ({coin.symbol}) :
                        {money ? Math.round(money / coin.quotes.USD.price) : 0} USD</li>
                )}
            </ul>
        </div>
    );
}

export default App;
