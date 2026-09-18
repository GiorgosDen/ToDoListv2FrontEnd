import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

function TaskPieChart({totalTasks,data}) {
  const COLORS = data.map((cat)=>{
    return cat.Color;
  });
  return (
    
    <div className="w-full h-48 md:h-48">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey={"Rate"}
            nameKey={"Name"}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={80}
            paddingAngle={5}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="central"
            className="text-2xl font-bold fill-gray-800"
          >
            {totalTasks}
          </text>
          <Tooltip 
            formatter={(value, name, item) => [
              `${value}`, 
              `${name}`
            ]} 
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TaskPieChart;