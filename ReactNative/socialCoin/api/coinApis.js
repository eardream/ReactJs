import React from "react";

const baseUrl = "https://api.coinpaprika.com/v1";

const coinsUrl = `${baseUrl}/coins`;

export const coins = () => fetch(coinsUrl).then(response => response.json());

export const info = ({ queryKey }) =>
    fetch(`${coinsUrl}/${queryKey[1]}`).then((response) => response.json());

export const history = ({ queryKey }) =>
    fetch(
        `${baseUrl}/tickers/${queryKey[1]}/historical?start=${
            new Date().toISOString().split("T")[0]
        }&interval=2h`
    ).then((response) => response.json());