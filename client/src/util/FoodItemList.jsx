const FoodItemCart = JSON.parse(localStorage.getItem("cart")) || [];

const FoodItemListCount = FoodItemCart.length;

export default { FoodItemCart, FoodItemListCount}