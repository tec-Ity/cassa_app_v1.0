const getPrice = (price, digits = 2, symbol = "€") => {
  try {
    // console.log(price);
    if (NaN) throw new Error("price is not a number");
    return (
      symbol + String(parseFloat(price).toFixed(digits || 2)).replace(".", ",")
    );
  } catch (err) {
    console.log(err);
    return NaN;
  }
};

export default getPrice;
