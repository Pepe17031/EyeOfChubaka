from binance import Client
import requests
import json


def main():
    apikey = 'wG6BMcscqeaxgYkATmZ674J8nQxUpEUSswYXE4o24iVLnOh6982RkESdQFvxQ4nP'
    secret = 'kGyYuoGyrNiWrtbgjTmwBucvde83fGVjrDvPkdfYZS8S3cJjR5I9U1kXNxlLktJp'
    final_pairs = []

    # Get Binance pairs
    client = Client(apikey, secret)
    binance_tickers = client.get_orderbook_tickers()
    binance_pairs = []
    for binanceTicker in binance_tickers:
        if 'USDT' in binanceTicker['symbol']:
            binance_pairs.append(binanceTicker['symbol'])

    # -------------------------------------------------------------------------------------------------
    # Get MEXC pairs
    response = requests.get("https://contract.mexc.com/api/v1/contract/detail")
    result = response.json()
    mexc_pairs = []
    for item in result["data"]:
        if "USDT" in item["symbol"]:
            mexc_pairs.append(item["symbol"].replace("_", ""))

    # -------------------------------------------------------------------------------------------------
    # Get final pairs
    print("Starting coin list sync...")

    for labelString in binance_pairs:
        if labelString in mexc_pairs:
            final_pairs.append(labelString)

    print(final_pairs)

    with open('coin-list.txt', 'w') as filehandle:
        json.dump(final_pairs, filehandle)


if __name__ == "__main__":
    main()
