// import { useState } from "react";

export const getRate = (data) => {
  if (data.reviews) {
    const rate = data.reviews.reduce((avg, review, i, arr) => {
      if (i !== arr.length - 1) {
        return (avg += review.rating);
      } else {
        return (avg += review.rating) / arr.length;
      }
    }, 0);
    return Math.floor(rate);
  }
};
export const getEnding = (num) => {
  const str = String(num);
  if (str.length > 1) {
    const lastSymbols = str[str.length - 2] + str[str.length - 1];
    if (![11, 12, 13, 14].includes(Number(lastSymbols))) {
      const lastSymbol = str[str.length - 1];
      if (Number(lastSymbol) === 1) {
        return "";
      } else if ([2, 3, 4].includes(Number(lastSymbol))) {
        return "а";
      } else {
        return "ов";
      }
    } else {
      return "ов";
    }
  } else {
    const lastSymbol = str[str.length - 1];
    if (Number(lastSymbol) === 1) {
      return "";
    } else if ([2, 3, 4].includes(Number(lastSymbol))) {
      return "а";
    } else {
      return "ов";
    }
  }
};
export const filterMyFavProduct = (baseData, userID) => {
  const fav = baseData.filter((product) => product.likes.includes(userID));

  return fav;
};

export const sort = (goods, filter, hookFunc) => {
  if (filter === "popular") {
    const filtered = goods.sort((a, b) => b.likes.length - a.likes.length);

    return hookFunc([...filtered]);
  }
  if (filter === "new") {
    const filtered = goods.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
    return hookFunc([...filtered]);
  }
  if (filter === "cheap") {
    const filtered = goods.sort(
      (a, b) =>
        a.price -
        (a.price * a.discount) / 100 -
        (b.price - (b.price * b.discount) / 100)
    );
    return hookFunc([...filtered]);
  }
  if (filter === "costly") {
    const filtered = goods.sort(
      (a, b) =>
        b.price -
        (b.price * b.discount) / 100 -
        (a.price - (a.price * a.discount) / 100)
    );
    return hookFunc([...filtered]);
  }
  if (filter === "topRate") {
    const filtered = goods.sort((a, b) => getRate(b) - getRate(a));
    return hookFunc([...filtered]);
  }
  if (filter === "reviews") {
    const filtered = goods.sort((a, b) => b.reviews.length - a.reviews.length);
    return hookFunc([...filtered]);
  }
  if (filter === "sale") {
    const filtered = goods.sort((a, b) => b.discount - a.discount);
    return hookFunc([...filtered]);
  }
};
