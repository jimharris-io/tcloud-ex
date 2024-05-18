export default function Chart({data, changeCategory}) {
 
  // let categoriesMessage = "";
  // if (loadingCategories) categoriesMessage = "loading";
  // if (errorCategories) categoriesMessage = "error";
  // if (categoriesData?.length) categoriesMessage = categoriesData.length;

  // let productsMessage = "";
  // if (loadingProducts) productsMessage = "loading";
  // if (errorProducts) productsMessage = "error";
  // if (productsData?.products?.length)
  //   productsMessage = productsData.products.length;

  return (
    <>
      {/* <p>num categories: {categoriesMessage}</p>
      <p>num products: {productsMessage}</p> */}
      <button onClick={changeCategory}>[laptops]</button>
      <p>chart: {Object.keys(data).length}</p>
    </>
  );
}
