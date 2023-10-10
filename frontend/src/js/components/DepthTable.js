import React, { useEffect, useState } from 'react';
import '/static/css/tailwind.css'


function DepthTable() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const socket = new WebSocket('ws://' + window.location.host + '/ws/api/');

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
    'Symbol',
    'Total Asks Volume',
    'Total Bids Volume',
    'Limit3',
    'Limit5',
    'Limit8',
    'Limit30',
  ];

  return (

    <div className="shadow-md bg-white rounded-lg h-fit">
        <div className="py-3 px-6 border-b border-dashed flex">
            <div className="gif">
                <img src="https://cdn.discordapp.com/attachments/1045861157883351091/1155225201546641520/eye.gif" alt="gods_eye" width="150"></ img>
            </div>
            <div className="flex justify-between items-center ml-8">
                <h4 className="text-3xl font-semibold tracking-tight text-slate-900">Real-Time Cryptocurrency Market Analysis</h4>
            </div>
        </div>  {/*Head Header*/}

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

                            <div className="px-6 py-3 text-left text-2xl text-red-700 font-extrabold uppercase ">Market Depth Table</div>

                        </div> {/*Seach field*/}

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
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-left">{item.symbol}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-left">{item.total_asks_volume}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-left">{item.total_bids_volume}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-left">{parseFloat(item.limit3).toFixed(2)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-left">{parseFloat(item.limit5).toFixed(2)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-left">{parseFloat(item.limit8).toFixed(2)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-left">{parseFloat(item.limit30).toFixed(2)}</td>
                                    </tr>
                                ))}
                                </tbody>

                            </table>
                        </div>


                    </div>
                </div>
            </div>
        </div>

    </div>
  );
}

export default DepthTable;
