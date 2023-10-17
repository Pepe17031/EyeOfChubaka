import React, { useState } from 'react';
import DepthTable from "./DepthTable";
import FundingRates from "./FundingRates";
import '/static/css/tailwind.css'
import FundingRatesFinal from "./FundingRatesFinal";

function App() {
  // Локальное состояние для отслеживания выбора в верхнем меню
  const [selectedMenu, setSelectedMenu] = useState(null);

  return (
    <div className="flex flex-col">

        <div className="py-3 px-6 border-b border-dashed flex">
            <div className="gif">
                <img src="https://cdn.discordapp.com/attachments/1045861157883351091/1155225201546641520/eye.gif" alt="gods_eye" width="150"></ img>
            </div>
            <div className="flex justify-between items-center ml-8">
                <h4 className="text-3xl font-semibold tracking-tight text-slate-900">Real-Time Cryptocurrency Market Analysis</h4>
            </div>
        </div>  {/*Head Header*/}

          {/* Верхнее меню с выбором */}
          <nav className="fixed top-0 right-0 left-0 bottom-0 lg:bottom-auto bg-slate-100">
            <ul className="flex items-center justify-center h-full ">
              <li  className="py-2 px-4 font-montserrat leading-normal text-lg text-slate-gray" onClick={() => setSelectedMenu('funding-rates-final')}>Funding Rates Final</li>
              <li  className="py-2 px-4 font-montserrat leading-normal text-lg text-slate-gray" onClick={() => setSelectedMenu('funding-rates') }>Funding Rates</li>
              <li  className="py-2 px-4 font-montserrat leading-normal text-lg text-slate-gray" onClick={() => setSelectedMenu('depth-table')}>Depth Table</li>

            </ul>
          </nav>
      {/* Условный рендеринг компонентов в зависимости от выбора */}
      {selectedMenu === 'funding-rates-final' && <FundingRatesFinal />}
      {selectedMenu === 'funding-rates' && <FundingRates />}
      {selectedMenu === 'depth-table' && <DepthTable />}

    </div>
  );
}

export default App;
