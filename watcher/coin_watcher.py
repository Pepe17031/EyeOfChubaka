from binance import ThreadedDepthCacheManager
import psycopg2 as pg
import pandas as pd
import sys


def main():

    coin_symbol = sys.argv[1]  # Docker
    # coin_symbol = "BTCUSDT"  # Local

    try:
        conn = pg.connect(
            #  host='localhost',  # Local
            host='db', # Docker
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
            bids = depth_cache.get_bids()
            asks = depth_cache.get_asks()

            limit3positive = asks[0][0] * 1.03
            limit3negative = bids[0][0] * 0.97
            limit5positive = asks[0][0] * 1.05
            limit5negative = bids[0][0] * 0.95
            limit8positive = asks[0][0] * 1.08
            limit8negative = bids[0][0] * 0.92
            limit30positive = asks[0][0] * 1.30
            limit30negative = bids[0][0] * 0.70

            total_asks_volume = sum(price * amount for price, amount in asks)
            total_bids_volume = sum(price * amount for price, amount in bids)

            total3_asks_volume = sum(price * amount for price, amount in asks if price <= limit3positive)
            total3_bids_volume = sum(price * amount for price, amount in bids if price >= limit3negative)
            total5_asks_volume = sum(price * amount for price, amount in asks if price <= limit5positive)
            total5_bids_volume = sum(price * amount for price, amount in bids if price >= limit5negative)
            total8_asks_volume = sum(price * amount for price, amount in asks if price <= limit8positive)
            total8_bids_volume = sum(price * amount for price, amount in bids if price >= limit8negative)
            total30_asks_volume = sum(price * amount for price, amount in asks if price <= limit30positive)
            total30_bids_volume = sum(price * amount for price, amount in bids if price >= limit30negative)

            limit3 = total3_bids_volume / total3_asks_volume
            limit5 = total5_bids_volume / total5_asks_volume
            limit8 = total8_bids_volume / total8_asks_volume
            limit30 = total30_bids_volume / total30_asks_volume

            data = {
                'Symbol': symbol,
                'Asks': int(total_asks_volume),
                'Bids': int(total_bids_volume),
                'Limit3': round(limit3, 2),
                'Limit5': round(limit5, 2),
                'Limit8': round(limit8, 2),
                'Limit30': round(limit30, 2),
            }

            print(data)

        depth_watcher = dcm.start_depth_cache(on_input_message, symbol=coin_symbol)

        dcm.join()

    except Exception as err:
        print("Ошибка подключения к базе данных:")
        print(err)


if __name__ == "__main__":
    main()
