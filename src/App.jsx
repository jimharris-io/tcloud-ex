import { useQuery, useQueryClient } from "@tanstack/react-query";
import Chart from "./components/Chart";
import Feed from "./components/Feed";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";

function App() {
  const [category, setCategory] = useState();
  const {
    isLoading: loadingCategories,
    error: errorCategories,
    data: categoriesData,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      return fetch(`https://dummyjson.com/products/categories`).then((res) =>
        res.json()
      );
    },
  });

  useEffect(() => {
    if (categoriesData) {
      setCategory(categoriesData[0]);
    }
  }, [categoriesData]);

  const {
    isLoading: loadingProducts,
    error: errorProducts,
    data: productsData,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      return fetch(`https://dummyjson.com/products?limit=0`).then((res) =>
        res.json()
      );
    },
    enabled: !!categoriesData,
  });

  const chartData = [];
  if (productsData?.products?.length && categoriesData?.length) {
    for (let category of categoriesData) {
      const products = productsData.products.filter(
        (p) => p.category === category
      );
      chartData.push({
        name: category,
        count: products.length,
      });
    }
  }

  const changeCategory = (category) => {
    setCategory(category);
  };

  return (
    <section className="flex flex-col max-w-7xl mx-auto gap-4 py-4">
      <Card className="p-4">
        <CardBody>
          <h1 className="tracking-tight inline font-semibold from-[#FF1CF7] to-[#b249f8] text-5xl bg-clip-text text-transparent bg-gradient-to-b">
            Product Trends
          </h1>
        </CardBody>
      </Card>
      <Chart data={chartData} changeCategory={changeCategory} />
      <Feed category={category} />
    </section>
  );
}

export default App;