import React, { useEffect, useState } from 'react';
import '/static/css/tailwind.css'


function FundingRates() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Добавлено состояние для отслеживания загрузки

  useEffect(() => {
    const socket = new WebSocket('ws://' + window.location.host + '/ws/funding/');

    socket.addEventListener('open', () => {
      console.log('WebSocket connected.');
    });

    socket.addEventListener('error', (error) => {
      console.error('Error connection to WebSocket:', error);
    });

    socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log(`WebSocket closed, code: ${event.code}, reason: ${event.reason}`);
      } else {
        console.error('WebSocket connection refused');
      }
    });

    socket.addEventListener('message', (event) => {
      const message = event.data;
      try {
        const newData = JSON.parse(message);
        setData(newData);
        setLoading(false); // Устанавливаем состояние загрузки в false в случае ошибки

      } catch (error) {
        console.error('Error reading JSON:', error);
      }
    });

    return () => {
      socket.close();
      console.log('WebSocket connection closed.');
    };
  }, []);

  const tableHeaders = [
    'ExchangeLogo',
    'Symbol',
    'Binance',
    'OKX',
    'dYdX',
    'Bybit',
    'Gate',
    'Bitget',
    'CoinEx',
    'BingX',
  ];

  return (

    <div className="shadow-md bg-white rounded-lg h-fit">


        <div className="p-4" > {/*All table form*/}
            <div className="overflow-x-auto">
                <div className="min-w-full inline-block align-middle">
                    <div className="border rounded-lg divide-y divide-gray-200">

                        <div className="py-3 px-4 flex">
                            <div className="relative max-w-xs">
                                <label htmlFor="table-with-pagination-search" className="sr-only">Search</label>
                                <input type="text" name="table-with-pagination-search" id="table-with-pagination-search" className="p-3 ps-10 block w-full border-gray-200 rounded-md text-sm focus:border-sky-500 focus:ring-sky-500" placeholder="Search for items"></input>
                                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4">
                                    <svg className="h-3.5 w-3.5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg>
                                </div>
                            </div>

                            <div className="px-6 py-3 text-left text-2xl text-red-700 font-extrabold uppercase ">Funding Rates Table</div>

                        </div> {/*Seach field*/}

                        {loading ? (
                            <div className="flex flex-clo items-center justify-center h-screen">
                                <h1 className="">Loading...</h1>
                            </div>
                        ):(
                            <div className="overflow-hidden overflow-y-auto max-h-96">

                            <table className="min-w-full divide-y divide-gray-200">

                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="py-3 px-4 pe-0">
                                            <div className="flex items-center h-5">
                                                <input id="table-pagination-checkbox-all" type="checkbox" className="border-gray-200 rounded text-sky-500 focus:ring-sky-500" />
                                                <label htmlFor="table-pagination-checkbox-all" className="sr-only">Checkbox</label>
                                            </div>
                                        </th>
                                        {tableHeaders.map((header, index) => (
                                            <th key={index} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{header}</th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200">

                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td className="py-3 ps-4">
                                            <div className="flex items-center h-5">
                                                <input id="table-pagination-checkbox-1" type="checkbox" className="border-gray-200 rounded text-sky-500 focus:ring-sky-500"></input>
                                                <label htmlFor="table-pagination-checkbox-1" className="sr-only">Checkbox</label>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-left">
                                            <img
                                                src={item.exchangeLogo}
                                                alt="Exchange Logo"
                                                className="max-w-[32px] max-h-[32px]"
                                                width="32"
                                                height="32"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-left">{item.symbol}</td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-left">
                                            {item.binance_funding === 0 ? '-' : `${item.binance_funding}%`}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-left">
                                            {item.okx_funding === 0 ? '-' : `${item.okx_funding}%`}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-left">
                                            {item.dydx_funding === 0 ? '-' : `${item.dydx_funding}%`}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-left">
                                            {item.bybit_funding === 0 ? '-' : `${item.bybit_funding}%`}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-left">
                                            {item.gate_funding === 0 ? '-' : `${item.gate_funding}%`}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-left">
                                            {item.bitget_funding === 0 ? '-' : `${item.bitget_funding}%`}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-left">
                                            {item.coinex_funding === 0 ? '-' : `${item.coinex_funding}%`}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-left">
                                            {item.bingx_funding === 0 ? '-' : `${item.bingx_funding}%`}
                                        </td>

                                    </tr>
                                ))}
                                </tbody>

                            </table>
                        </div>
                        )}

                    </div>
                </div>
            </div>
        </div>

    </div>
  );
}

export default FundingRates;
