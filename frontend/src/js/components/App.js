import React from "react";
import '/static/css/tailwind.css'
function App() {
  return (
    <div className="shadow-md bg-white rounded-lg h-fit">
        <div className="py-3 px-6 border-b border-dashed">
            <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold tracking-tight text-slate-900">With pagination</h4>
            </div>
        </div>  {/*Head Header*/}

        <div className="p-4"> {/*All table form*/}
            <div className="overflow-x-auto">
                <div className="min-w-full inline-block align-middle">
                    <div className="border rounded-lg divide-y divide-gray-200">

                        <div className="py-3 px-4">
                            <div className="relative max-w-xs">
                                <label htmlFor="table-with-pagination-search" className="sr-only">Search</label>
                                <input type="text" name="table-with-pagination-search" id="table-with-pagination-search" className="p-3 ps-10 block w-full border-gray-200 rounded-md text-sm focus:border-sky-500 focus:ring-sky-500" placeholder="Search for items"></input>
                                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4">
                                    <svg className="h-3.5 w-3.5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div> {/*Seach field*/}

                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">

                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="py-3 px-4 pe-0">
                                            <div className="flex items-center h-5">
                                                <input id="table-pagination-checkbox-all" type="checkbox" className="border-gray-200 rounded text-sky-500 focus:ring-sky-500" />
                                                <label htmlFor="table-pagination-checkbox-all" className="sr-only">Checkbox</label>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Age</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
                                        <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Action</th>
                                    </tr>
                                </thead> {/*Table Header*/}

                                <tbody className="divide-y divide-gray-200">

                                    <tr>
                                        <td className="py-3 ps-4">
                                            <div className="flex items-center h-5">
                                                <input id="table-pagination-checkbox-1" type="checkbox" className="border-gray-200 rounded text-sky-500 focus:ring-sky-500"></input>
                                                <label htmlFor="table-pagination-checkbox-1" className="sr-only">Checkbox</label>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">John Brown</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">45</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">New York No. 1 Lake Park</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                            <a className="text-sky-500 hover:text-sky-700" href="#">Delete</a>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="py-3 ps-4">
                                            <div className="flex items-center h-5">
                                                <input id="table-pagination-checkbox-2" type="checkbox" className="border-gray-200 rounded text-sky-500 focus:ring-sky-500"></input>
                                                <label htmlFor="table-pagination-checkbox-2" className="sr-only">Checkbox</label>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">Jim Green</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">27</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">London No. 1 Lake Park</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                            <a className="text-sky-500 hover:text-sky-700" href="#">Delete</a>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="py-3 ps-4">
                                            <div className="flex items-center h-5">
                                                <input id="table-pagination-checkbox-3" type="checkbox" className="border-gray-200 rounded text-sky-500 focus:ring-sky-500"></input>
                                                <label htmlFor="table-pagination-checkbox-3" className="sr-only">Checkbox</label>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">Joe Black</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">31</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">Sidney No. 1 Lake Park</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                            <a className="text-sky-500 hover:text-sky-700" href="#">Delete</a>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="py-3 ps-4">
                                            <div className="flex items-center h-5">
                                                <input id="table-pagination-checkbox-4" type="checkbox" className="border-gray-200 rounded text-sky-500 focus:ring-sky-500"></input>
                                                <label htmlFor="table-pagination-checkbox-4" className="sr-only">Checkbox</label>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">Edward King</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">16</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">LA No. 1 Lake Park</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                            <a className="text-sky-500 hover:text-sky-700" href="#">Delete</a>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="py-3 ps-4">
                                            <div className="flex items-center h-5">
                                                <input id="table-pagination-checkbox-5" type="checkbox" className="border-gray-200 rounded text-sky-500 focus:ring-sky-500"></input>
                                                <label htmlFor="table-pagination-checkbox-5" className="sr-only">Checkbox</label>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">Jim Red</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">45</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">Melbourne No. 1 Lake Park</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                            <a className="text-sky-500 hover:text-sky-700" href="#">Delete</a>
                                        </td>
                                    </tr>

                                </tbody> {/*All table data*/}

                            </table>
                        </div> {/*Table header and data*/}

                        <div className="py-1 px-4">
                            <nav className="flex items-center space-x-2">
                                <a className="text-gray-400 hover:text-sky-500 p-4 inline-flex items-center gap-2 font-medium rounded-md" href="#">
                                    <span aria-hidden="true">«</span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="w-10 h-10 bg-sky-500 text-white p-4 inline-flex items-center text-sm font-medium rounded-full" href="#" aria-current="page">1</a>
                                <a className="w-10 h-10 text-gray-400 hover:text-sky-500 p-4 inline-flex items-center text-sm font-medium rounded-full" href="#">2</a>
                                <a className="w-10 h-10 text-gray-400 hover:text-sky-500 p-4 inline-flex items-center text-sm font-medium rounded-full" href="#">3</a>
                                <a className="text-gray-400 hover:text-sky-500 p-4 inline-flex items-center gap-2 font-medium rounded-md" href="#">
                                    <span className="sr-only">Next</span>
                                    <span aria-hidden="true">»</span>
                                </a>
                            </nav>
                        </div> {/*Pages 1.2.3*/}

                    </div>
                </div>
            </div>
        </div>

    </div>
  );
}

export default App;
