import { useQuery } from "@tanstack/react-query";

export default function Chart() {

  const {
    isLoading: loadingCategories,
    error: errorCategories,
    data: categoriesData,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
        return fetch(`https://dummyjson.com/products/categories`).then((res) => res.json())
    }
  });

  const {
    isLoading: loadingProducts,
    error: errorProducts,
    data: productsData,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
        return fetch(`https://dummyjson.com/products`).then((res) => res.json())
    },
    enabled: !!categoriesData
  });

  let categoriesMessage = "";
  if(loadingCategories) categoriesMessage = "loading";
  if(errorCategories) categoriesMessage = "error";
  if(categoriesData?.length) categoriesMessage = categoriesData.length;

  let productsMessage = "";
  if(loadingProducts) productsMessage = "loading";
  if(errorProducts) productsMessage = "error";
  if(productsData?.products?.length) productsMessage = productsData.products.length;

  return (
    <>
      <p>num categories: {categoriesMessage}</p>
      <p>num products: {productsMessage}</p>
    </>
  )
}
