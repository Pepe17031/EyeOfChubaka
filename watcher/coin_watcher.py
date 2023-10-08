from binance import ThreadedDepthCacheManager
import psycopg2 as pg
import pandas as pd
import sys


def main():

    coin_symbol = sys.argv[1]
    print(coin_symbol)

    try:
        conn = pg.connect(
            host='db',
            database='coin_watcher',
            port=5432,
            user='user',
            password='password'
        )

        cursor = conn.cursor()
        print("Подключение к postgres установленно.")

        dcm = ThreadedDepthCacheManager()
        dcm.start()

        def on_input_message(depth_cache):

            symbol = depth_cache.symbol
            time = depth_cache.update_time
            bids = pd.DataFrame(depth_cache.get_bids()[:5], columns=["Price", "Quantity"])
            asks = pd.DataFrame(depth_cache.get_asks()[:5], columns=["Price", "Quantity"])

            print(bids)

        depth_watcher = dcm.start_depth_cache(on_input_message, symbol=coin_symbol)

        dcm.join()

    except Exception as err:
        print("Ошибка подключения к базе данных:")
        print(err)


if __name__ == "__main__":
    main()
