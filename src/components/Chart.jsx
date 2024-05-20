import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";

export default function Chart({ data, changeCategory }) {
  const [activeIndex, setActiveIndex] = useState(0);
  // if (loadingCategories) categoriesMessage = "loading";
  // if (errorCategories) categoriesMessage = "error";
  // if (categoriesData?.length) categoriesMessage = categoriesData.length;

  // let productsMessage = "";
  // if (loadingProducts) productsMessage = "loading";
  // if (errorProducts) productsMessage = "error";
  // if (productsData?.products?.length)
  //   productsMessage = productsData.products.length;

  // const queryClient = useQueryClient()
  // queryClient.invalidateQueries({ queryKey: ['photos'] })

  const handleClick = (data, index) => {
    setActiveIndex(index);
    changeCategory(data.name);
  };

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
            <XAxis dataKey="label" interval={0} height={64} tick={{fontSize: 12}}/>
            <YAxis/>
            <Tooltip />
            {/* <Legend /> */}
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
          {/* </ResponsiveContainer> */}
        </div>
      </CardBody>
    </Card>
  );
}
