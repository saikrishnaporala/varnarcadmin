// import React, { useEffect, useState } from 'react';

// interface DataItem {
//   id: number;
//   name: string;
// }

// const Dashboard = () => {
//   const [data, setData] = useState<DataItem[]>([]);
//   const [loading, setLoading] = React.useState(true);

//   useEffect(() => {
//     fetch('http://localhost:4000/api/data')
//       .then((res) => res.json())
//       .then((json) => {
//         setData(json);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
//       {loading ? (
//         <p>Loading data...</p>
//       ) : (
//         <ul className="list-disc pl-5">
//           {data.map((item) => (
//             <li key={item.id} className="mb-2">
//               {item.name} (ID: {item.id})
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

import React from 'react';
import InfoCard from '../components/InfoCard';
import { FaChartLine, FaBookmark, FaGem } from 'react-icons/fa';
import { BarChart, DonutChart } from '../components/Charts';

const DashboardPage = () => {
  return (
    // <div className="flex h-screen bg-gray-50">

      <div className="flex-1 flex flex-col">

        <main className="space-y-6 overflow-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-semibold flex items-center space-x-2">
              <FaChartLine /> <span>Dashboard</span>
            </h1>
            <div className="text-sm text-gray-500">Overview</div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <InfoCard
              title="Weekly Sales"
              value="$ 15,0000"
              subtitle="Increased by 60%"
              bgGradient="bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600"
              icon={<FaChartLine />}
            />
            <InfoCard
              title="Weekly Orders"
              value="45,6334"
              subtitle="Decreased by 10%"
              bgGradient="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"
              icon={<FaBookmark />}
            />
            <InfoCard
              title="Visitors Online"
              value="95,5741"
              subtitle="Increased by 5%"
              bgGradient="bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600"
              icon={<FaGem />}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <BarChart />
            <DonutChart />
          </div>
        </main>
      </div>
    // </div>
  );
};

export default DashboardPage;
