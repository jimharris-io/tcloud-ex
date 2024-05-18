import { useQuery } from "@tanstack/react-query";
import Chart from "./components/Chart";
import Feed from "./components/Feed";
import { useState, useEffect } from "react";

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

  useEffect(()=>{
    if(categoriesData){
      setCategory(categoriesData[0]);
    }
  }, [categoriesData])

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

  const chartData = {};
  if (productsData?.products?.length && categoriesData?.length) {
    for (let category of categoriesData) {
      const products = productsData.products.filter(
        (p) => p.category === category
      );
      chartData[category] = products.length;
    }
  }

  const changeCategory = () => {
    setCategory("laptops")
  }

  return (
    <>
      <Chart data={chartData} changeCategory={changeCategory} />
      <br/>
      <Feed category={category} />
    </>
  );
}

export default App;
