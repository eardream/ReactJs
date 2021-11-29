import {useEffect, useState} from "react";

function App() {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);


    function CoinData() {
        const [money, setMoney] = useState();

        const onChange = (event) => {
            if (event.target.value !== undefined && event.target.value >= 0)
                setMoney(event.target.value);
        }

        return (
            <div>
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

    function Loading() {
        return (<strong>Loading...</strong>);
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
            {loading ? <Loading /> : <CoinData />}
        </div>
    );
}

export default App;
