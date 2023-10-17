import requests

url = "https://open-api.coinglass.com/public/v2/funding"

headers = {
    "accept": "application/json",
    "coinglassSecret": "ce9ddceeb2754f72ae8e7054fe65a68a"
}

response = requests.get(url, headers=headers)

top100list = ["BTC", "ETH", "USDT", "BNB", "XRP", "UCDC", "SOL", "ADA", "DOGE", "TRX", "TON", "DAI", "MATIC", "LTC",
              "DOT", "WBTC", "BCH", "SHIB", "LINK", "LEO", "TUSD", "AVAX", "XLM", "XMR", "OKB", "ATOM", "UNI",
              "ETC", "BUSD", "HBAR", "FIL", "LDO", "ICP", "MKR", "CRO", "APT", "VET", "OP", "QNT", "ARB", "MNT",
              "NEAR", "AAVE", "GRT", "STX", "ALGO", "BSV", "USDD", "RNDR", "INJ", "XDC", "IMX", "EGLD", "XTZ",
              "EOS", "ASX", "SAND", "THETA", "BGB", "MANA", "RUNE", "SNX", "FTM", "KAVA", "NEO", "XEC", "USDP",
              "PAXG", "XAUT", "FLOW", "KCS", "TWT", "FXS", "CHZ", "IOTA", "OCEAN", "KLAY", "ZEC", "CRV", "APE",
              "CFX", "RPL", "LOOM", "HT", "MINA", "BTT", "GT", "SUI", "CSPR", "DYDX", "GALA", "LUNC", "GMX", "COMP",
              "NFT", "WOO", "NEXO", "DASH", "ZIL", "ROSE"]

top100 = []
other_coins = []

# Проверяем успешность запроса (статус код 200)
if response.status_code == 200:
    # Разбираем JSON-содержимое ответа
    data = response.json()

    # Итерируем по списку 'data'
    for currency_data in data.get("data", []):

        symbol = currency_data.get("symbol", "")
        exchangeLogo = currency_data.get("symbolLogo", "")

        u_margin_list = currency_data.get("uMarginList", [])
        c_margin_list = currency_data.get("cMarginList", [])

        # Функция для получения значения фандинга с обработкой ошибок
        def get_rate(exchange_list, exchange_name):
            for ex in exchange_list:
                if ex.get("exchangeName") == exchange_name and "rate" in ex:
                    return ex["rate"]
            return 0

        binance_rate = get_rate(u_margin_list, "Binance")

        okx_rate = get_rate(u_margin_list, "OKX")
        dydx_rate = get_rate(u_margin_list, "dYdX")
        bybit_rate = get_rate(u_margin_list, "Bybit")
        gate_rate = get_rate(u_margin_list, "Gate")
        bitget_rate = get_rate(u_margin_list, "Bitget")
        coinex_rate = get_rate(u_margin_list, "CoinEx")
        bingx_rate = get_rate(u_margin_list, "BingX")

        other_ex_sum = sum([okx_rate, dydx_rate, bybit_rate, gate_rate, bitget_rate, coinex_rate, bingx_rate])
        other_ex_numbers = len([okx_rate, dydx_rate, bybit_rate, gate_rate, bitget_rate, coinex_rate, bingx_rate])
        average = other_ex_sum / other_ex_numbers

        other_exchange_sum = round(average, 4)

        if symbol in top100list:
            top100.append([symbol, round(binance_rate, 4), other_exchange_sum])
        else:
            other_coins.append([symbol, round(binance_rate, 4), other_exchange_sum])

    def get_final_tables(data):

        other_ex_positive_count = 0
        other_ex_balanced_count = 0
        other_ex_negative_count = 0

        for _, _, other_ex in data:
            if other_ex >= 0.01:
                other_ex_positive_count += 1
            elif -0.01 <= other_ex <= 0.01:
                other_ex_balanced_count += 1
            else:
                other_ex_negative_count += 1

        # Display the counts
        print(f'Positive(other_ex): {other_ex_positive_count} coins')
        print(f'Balanced(other_ex): {other_ex_balanced_count} coins')
        print(f'Negative(other_ex): {other_ex_negative_count} coins')

        binance_positive_count = 0
        binance_balanced_count = 0
        binance_negative_count = 0

        for _, binance, _ in data:
            if binance >= 0.01:
                binance_positive_count += 1
            elif -0.01 <= binance <= 0.01:
                binance_balanced_count += 1
            else:
                binance_negative_count += 1

        # Display the counts
        print(f'Positive(binance): {binance_positive_count} coins')
        print(f'Balanced(binance): {binance_balanced_count} coins')
        print(f'Negative(binance): {binance_negative_count} coins')


    get_final_tables(top100)
    get_final_tables(other_coins)

else:
    print(f"Не удалось получить данные. Код статуса: {response.status_code}")
