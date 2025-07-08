export const transformSparkline = (priceArray: number[]) => {
    const now = Date.now();
    const interval = 60 * 60 * 1000; // 1 hour

    return priceArray.map((price, index) => ({
        timestamp: now - (priceArray.length - index) * interval,
        value: price,
    }));
};

export const transformToChartPoints = (arr: number[]) => {
  const now = Date.now();
  const interval = 60 * 1000; // or customize per range (1 min, 5 min, etc.)
  return arr.map((value, index) => ({
    timestamp: now - (arr.length - index) * interval,
    value,
  }));
};