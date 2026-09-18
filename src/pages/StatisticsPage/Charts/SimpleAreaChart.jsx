import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

function SimpleAreaChart({chartData}) {
  return (
    <div className="w-full h-48 sm:h-64 md:h-80">
      <ResponsiveContainer height={"100%"} width={"100%"}>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Area 
            type="monotone" 
            dataKey="Total" 
            stroke="#8884d8" 
            fill="#8884d8" 
            fillOpacity={0.4} // Makes the fill semi-transparent so they overlap nicely
          />
          
          <Area 
            type="monotone" 
            dataKey="Completed" 
            stroke="#82ca9d" 
            fill="#82ca9d" 
            fillOpacity={0.4} 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SimpleAreaChart;