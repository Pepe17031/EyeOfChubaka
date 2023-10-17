from celery import shared_task
from channels.layers import get_channel_layer
from .models import Depth, Funding, FundingFinal
import asyncio
import json
import requests

channel_layer = get_channel_layer()


@shared_task()
def send_depth_data():
    non_zero_data = Depth.objects.filter(total_asks_volume__gt=0).values(
        "type",
        "symbol",
        "total_asks_volume",
        "total_bids_volume",
        "limit3",
        "limit5",
        "limit8",
        "limit30"
    ).order_by("symbol")
    data = list(non_zero_data)  # Преобразовать QuerySet в список словарей
    # print("Start data sending" + str(data))
    asyncio.run(process_send_depth_data(data))


async def process_send_depth_data(data):

    await channel_layer.group_send(
        "depth",
        {"type": "send_message", "message": json.dumps(data)}
    )


@shared_task()
def get_funding_rate():

    url = "https://open-api.coinglass.com/public/v2/funding"

    headers = {
        "accept": "application/json",
        "coinglassSecret": "ce9ddceeb2754f72ae8e7054fe65a68a"
    }

    top100list = ["USDT", "BNB", "XRP", "UCDC", "SOL", "ADA", "DOGE", "TRX", "TON", "DAI", "MATIC", "LTC",
                  "DOT", "WBTC", "BCH", "SHIB", "LINK", "LEO", "TUSD", "AVAX", "XLM", "XMR", "OKB", "ATOM", "UNI",
                  "ETC", "BUSD", "HBAR", "FIL", "LDO", "ICP", "MKR", "CRO", "APT", "VET", "OP", "QNT", "ARB", "MNT",
                  "NEAR", "AAVE", "GRT", "STX", "ALGO", "BSV", "USDD", "RNDR", "INJ", "XDC", "IMX", "EGLD", "XTZ",
                  "EOS", "ASX", "SAND", "THETA", "BGB", "MANA", "RUNE", "SNX", "FTM", "KAVA", "NEO", "XEC", "USDP",
                  "PAXG", "XAUT", "FLOW", "KCS", "TWT", "FXS", "CHZ", "IOTA", "OCEAN", "KLAY", "ZEC", "CRV", "APE",
                  "CFX", "RPL", "LOOM", "HT", "MINA", "BTT", "GT", "SUI", "CSPR", "DYDX", "GALA", "LUNC", "GMX", "COMP",
                  "NFT", "WOO", "NEXO", "DASH", "ZIL", "ROSE"]

    BTC = []
    ETH = []
    top100 = []
    other_coins = []

    response = requests.get(url, headers=headers)

    # Проверяем успешность запроса (статус код 200)
    if response.status_code == 200:
        # Разбираем JSON-содержимое ответа
        data = response.json()

        # Итерируем по списку 'data'
        for currency_data in data.get("data", []):

            symbol = currency_data.get("symbol", "")
            exchangeLogo = currency_data.get("symbolLogo", "")
            u_margin_list = currency_data.get("uMarginList", [])

            def get_rate(exchange_list, exchange_name):
                for ex in exchange_list:
                    if ex.get("exchangeName") == exchange_name and "rate" in ex:
                        return ex["rate"]
                return 0

            binance_rate = round(get_rate(u_margin_list, "Binance"), 4)

            okx_rate = round(get_rate(u_margin_list, "OKX"), 4)
            dydx_rate = round(get_rate(u_margin_list, "dYdX"), 4)
            bybit_rate = round(get_rate(u_margin_list, "Bybit"), 4)
            gate_rate = round(get_rate(u_margin_list, "Gate"), 4)
            bitget_rate = round(get_rate(u_margin_list, "Bitget"), 4)
            coinex_rate = round(get_rate(u_margin_list, "CoinEx"), 4)
            bingx_rate = round(get_rate(u_margin_list, "BingX"), 4)

            rates = [okx_rate, dydx_rate, bybit_rate, gate_rate, bitget_rate, coinex_rate, bingx_rate]
            non_zero_rates = [rate for rate in rates if rate != 0]
            other_ex_sum = sum(non_zero_rates)
            other_ex_numbers = len(non_zero_rates)

            if other_ex_numbers != 0:
                average = other_ex_sum / other_ex_numbers
            else:
                average = 0

            other_exchange_sum = round(average, 4)

            if symbol in top100list:
                top100.append([symbol, round(binance_rate, 4), other_exchange_sum])
            elif symbol == 'BTC':
                BTC.append([symbol, round(binance_rate, 4), other_exchange_sum])
            elif symbol == 'ETH':
                ETH.append([symbol, round(binance_rate, 4), other_exchange_sum])
            else:
                other_coins.append([symbol, round(binance_rate, 4), other_exchange_sum])

            funding_obj, created = Funding.objects.get_or_create(
                symbol=symbol,
                defaults={
                    "exchangeLogo": exchangeLogo,
                    "binance_funding": binance_rate,
                    "okx_funding": okx_rate,
                    "dydx_funding": dydx_rate,
                    "bybit_funding": bybit_rate,
                    "gate_funding": gate_rate,
                    "bitget_funding": bitget_rate,
                    "coinex_funding": coinex_rate,
                    "bingx_funding": bingx_rate,
                    "other_exchange_sum": other_exchange_sum,
                }
            )

            # Если запись уже существует, обновляем значения
            if not created:
                funding_obj.exchangeLogo = exchangeLogo
                funding_obj.binance_funding = binance_rate
                funding_obj.okx_funding = okx_rate
                funding_obj.dydx_funding = dydx_rate
                funding_obj.bybit_funding = bybit_rate
                funding_obj.gate_funding = gate_rate
                funding_obj.bitget_funding = bitget_rate
                funding_obj.coinex_funding = coinex_rate
                funding_obj.bingx_funding = bingx_rate
                funding_obj.other_exchange_sum = other_exchange_sum

            # Сохраняем изменения
            funding_obj.save()

        def get_final_tables(input_data):

            other_ex_positive_count = 0
            other_ex_balanced_count = 0
            other_ex_negative_count = 0

            for _, _, other_ex in input_data['data']:
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

            for _, binance, _ in input_data['data']:
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

            funding_final_obj, created = FundingFinal.objects.get_or_create(
                symbol=input_data['label'],
                defaults={
                    "binance_positive": binance_positive_count,
                    "binance_balance": binance_balanced_count,
                    "binance_negative": binance_negative_count,
                    "other_ex_positive": other_ex_positive_count,
                    "other_ex_balance": other_ex_balanced_count,
                    "other_ex_negative": other_ex_negative_count,
                }
            )

            # Если запись уже существует, обновляем значения
            if not created:
                funding_final_obj.binance_positive = binance_positive_count
                funding_final_obj.binance_balance = binance_balanced_count
                funding_final_obj.binance_negative = binance_negative_count
                funding_final_obj.other_ex_positive = other_ex_positive_count
                funding_final_obj.other_ex_balance = other_ex_balanced_count
                funding_final_obj.other_ex_negative = other_ex_negative_count

            # Сохраняем изменения
            funding_final_obj.save()

        get_final_tables({'label': 'BTC', 'data': BTC})
        get_final_tables({'label': 'ETH', 'data': ETH})
        get_final_tables({'label': 'Top100', 'data': top100})
        get_final_tables({'label': 'OtherCoins', 'data': other_coins})

    else:
        print(f"Не удалось получить данные. Код статуса: {response.status_code}")


@shared_task()
def send_funding_rate():
    all_data = Funding.objects.all().values(
        "type",
        "symbol",
        "exchangeLogo",
        "binance_funding",
        "okx_funding",
        "dydx_funding",
        "bybit_funding",
        "gate_funding",
        "bitget_funding",
        "coinex_funding",
        "bingx_funding",
    ).order_by("symbol")

    data = list(all_data)  # Преобразовать QuerySet в список словарей
    # print("Start data sending" + str(data))
    asyncio.run(process_send_funding_rate(data))


async def process_send_funding_rate(data):

    await channel_layer.group_send(
        "funding",
        {"type": "send_message", "message": json.dumps(data)}
    )

@shared_task()
def send_funding_rate_final():
    all_data = FundingFinal.objects.all().values(
        "type",
        "symbol",
        "binance_positive",
        "binance_balance",
        "binance_negative",
        "other_ex_positive",
        "other_ex_balance",
        "other_ex_negative",
    ).order_by("symbol")

    data = list(all_data)  # Преобразовать QuerySet в список словарей
    # print("Start data sending" + str(data))
    asyncio.run(process_send_funding_rate_final(data))


async def process_send_funding_rate_final(data):

    await channel_layer.group_send(
        "funding_final",
        {"type": "send_message", "message": json.dumps(data)}
    )