export const addToCardItem = (item) => {
  let card = [];
  if (localStorage.getItem("card") !== null) {
    card = JSON.parse(localStorage.getItem("card"));
    card.push(item);
    localStorage.setItem("card", JSON.stringify(card));
  } else {
    localStorage.setItem("card", JSON.stringify([item]));
  }
};

export const removeCardItem = (removedId) => {
  let card = JSON.parse(localStorage.getItem("card"));
  let deleteIndex = card.findIndex((e) => e.id === removedId);
  card.splice(deleteIndex, 1);
  localStorage.setItem("card", JSON.stringify(card));
};

export const cardTotalPrice = () => {
  let total = 0;
  let card = [];
  if (localStorage.getItem("card") !== null) {
    card = JSON.parse(localStorage.getItem("card"));
    card.map((item) => {
      total += parseFloat(item.price);
      return null;
    });
    return total;
  } else {
    return 0;
  }
};

export const getBrandList = async () => {
  let brands = [];
  const apiHelper = await import("../helpers/api-helper");
  const productsList = await apiHelper.getProducts();
  productsList.forEach((item) => {
    if (brands.indexOf(item.brand) === -1) {
      brands.push(item.brand);
    }
  });
  return brands;
};

export const getModelList = async () => {
  let models = [];
  const apiHelper = await import("../helpers/api-helper");
  const productsList = await apiHelper.getProducts();
  productsList.forEach((item) => {
    if (models.indexOf(item.model) === -1) {
      models.push(item.model);
    }
  });
  return models;
};
