import { useQuery } from "@tanstack/react-query";
import Chart from "./components/Chart";
import Feed from "./components/Feed";
import LightBox from "./components/LightBox";
import { useState, useEffect } from "react";
import { Card, CardBody } from "@nextui-org/card";

/* DEMO ONLY, randomise number of products per category as API always returns 5 */
const demoCount = Array.apply(null, Array(20)).map(e => 1 + parseInt(Math.random() * 5))

function App() {

  // current active category
  const [category, setCategory] = useState();

  // lightbox
  const [showLightBox, setShowLightBox] = useState();
  const [lightBoxContents, setLightBoxContents] = useState();

  // get categories
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

  // set default category when data available
  useEffect(() => {
    if (categoriesData) {
      setCategory(categoriesData[0]);
    }
  }, [categoriesData]);

  // get products
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
  });

  // create data for chart
  let chartData = [];
  if (productsData?.products?.length && categoriesData?.length) {
    for (let category of categoriesData) {
      const products = productsData.products.filter(
        (p) => p.category === category
      );
      let label = category.replace("-", " ");
      label = label.charAt(0).toUpperCase() + label.slice(1);
      chartData.push({
        name: category,
        count: demoCount[chartData.length], /* should be: products.length, see note above */
        label: label,
      });
      
      chartData = chartData.slice(0, )
    }
  }

  // handle category change
  const changeCategory = (category) => {
    setCategory(category);
  };

  // handle open and populate lightbox
  const openLightBox = (contents) => {
    setLightBoxContents(contents);
    setShowLightBox(true);
  };

  // handle close lightbox
  const closeLightBox = () => {
    setLightBoxContents(null);
    setShowLightBox(false);
  };

  // render app
  return (
    <>
      {showLightBox && (
        <LightBox contents={lightBoxContents} close={closeLightBox} />
      )}
      <section className="flex flex-col max-w-7xl mx-auto gap-4 py-4">
        <Card className="p-4">
          <CardBody>
            <h1 className="tracking-tight inline font-semibold from-[#FF1CF7] to-[#b249f8] text-5xl bg-clip-text text-transparent bg-gradient-to-b">
              Product Trends
            </h1>
          </CardBody>
        </Card>
        <Chart data={chartData} changeCategory={changeCategory} />
        <Feed category={category} openLightBox={openLightBox} />
      </section>
    </>
  );
}

export default App;
