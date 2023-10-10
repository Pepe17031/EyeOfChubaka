from binance import Client
import requests
import json
import psycopg2 as pg


def main():

    conn = pg.connect(
        host='localhost',
        database='django_db',
        port=5432,
        user='user',
        password='password'
    )

    cur = conn.cursor()
    print("Подключение к postgres установленно.")


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
        json.dump(final_pairs[:10], filehandle)

    def insert_symbols_to_db(conn, symbols):
        try:
            cur = conn.cursor()

            for symbol in symbols:
                cur.execute(
                    "INSERT INTO api_depth (symbol) VALUES (%s) ON CONFLICT (symbol) DO NOTHING;",
                    (symbol,)
                )

            conn.commit()
            print("Символы успешно добавлены в базу данных.")

        except Exception as e:
            print("Ошибка при вставке символов в базу данных:")
            print(e)

        finally:
            if cur:
                cur.close()

if __name__ == "__main__":
    main()
