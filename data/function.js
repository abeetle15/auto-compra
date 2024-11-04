import idealStockJson from "./idealStock.js";
import currentStockJson from "./currentStock.js";

function node() {
  // Define the function
  function calculateShoppingList(idealStock, currentStock) {
    const shortages = [];
    Object.values(idealStock).forEach(({ json }) => {
      const INGREDIENT = json.INGREDIENT;
      const IDEAL_STOCK = json.IDEAL_STOCK;
      // console.log(INGREDIENT, IDEAL_STOCK)
      const currentObj =
        currentStock.find((obj) => obj.json.Nombre === INGREDIENT) || null;
      // console.log(currentStock);
      // console.log(currentObj)
      const currentQuant = currentObj ? currentObj.json.Stock : Infinity;
      const currentCost = currentObj ? currentObj.json.Costo : null;
      if (currentQuant < IDEAL_STOCK) {
        console.log(INGREDIENT, IDEAL_STOCK, currentQuant);
        const costInPesos =
          Math.floor((IDEAL_STOCK - currentQuant) * currentCost * 100) / 100;
        const shortage = {
          Nombre: INGREDIENT,
          CostoUnidad: currentCost,
          Compra: (IDEAL_STOCK - currentQuant).toFixed(2),
          Unidad: currentObj.json.Unidad,
          Costo: costInPesos.toFixed(2),
        };
        shortages.push(shortage);
      }
    });
    const totalCompra = shortages.reduce((acc, curr) => {
      acc += parseFloat(curr.Costo);
      return acc;
    }, 0);
    shortages.push({
      Nombre: "Total",
      CostoUnidad: "-",
      Compra: "-",
      Unidad: "-",
      Costo: totalCompra.toFixed(0),
    });
    return shortages;
  }

  // Use the function in the Code Node
  const idealStock = idealStockJson;
  const currentStock = currentStockJson;
  const shoppingList = calculateShoppingList(idealStock, currentStock);

  // Return the shopping list as the output
  return shoppingList;
}

console.log(node());
