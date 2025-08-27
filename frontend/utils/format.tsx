export const formatScore = (score: number): number => {
  return Number((Number(score.toFixed(0)) / 2).toFixed(1));
};
