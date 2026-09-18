import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Low', totalNum: 10 },
  { name: 'Medium', totalNum: 15},
  { name: 'High', totalNum: 8},
];

const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

function SimpleBarChart({chartData}) {
  return (
    <div className="w-full h-48 sm:h-64 md:h-80">
      <ResponsiveContainer height={"100%"} width={"100%"}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Number">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SimpleBarChart;