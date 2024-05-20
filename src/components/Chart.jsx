import { useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { Card, CardHeader, CardBody } from "@nextui-org/card";

export default function Chart({ data, changeCategory }) {

  // current active category
  const [activeIndex, setActiveIndex] = useState(0);

  // handle category change
  const handleClick = (data, index) => {
    setActiveIndex(index);
    changeCategory(data.name);
  };

  // render chart
  return (
    <Card className="p-4">
      <CardHeader className="flex flex-col items-start gap-2">
        <h1 className="tracking-tight inline font-semibold from-[#5EA2EF] to-[#0072F5] text-4xl bg-clip-text text-transparent bg-gradient-to-b">
          Number of products by category
        </h1>
        <p className="text-xl font-normal text-default-500">
          Click a bar to see trending media in the product category
        </p>
      </CardHeader>
      <CardBody>
        <div className="products-chart">
          <BarChart
            width={1200}
            height={600}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="label"
              interval={0}
              height={64}
              tick={{ fontSize: 12 }}
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" onClick={handleClick}>
              {data.map((entry, index) => (
                <Cell
                  cursor="pointer"
                  fill={index === activeIndex ? "#5EA2EF" : "#b249f8"}
                  key={`cell-${index}`}
                />
              ))}
            </Bar>
          </BarChart>
        </div>
      </CardBody>
    </Card>
  );
}
