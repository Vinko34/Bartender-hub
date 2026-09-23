export type SparseVector = Map<string, number>;

function calculateMagnitude(vector: SparseVector): number {
  let sumOfSquares = 0;
  for (const value of vector.values()) {
    sumOfSquares += value * value;
  }
  return Math.sqrt(sumOfSquares);
}

/** Cosine similarity in [0, 1] for non-negative sparse vectors. */
export function calculateCosineSimilarity(firstVector: SparseVector, secondVector: SparseVector): number {
  let dotProduct = 0;
  for (const [key, value] of firstVector) {
    dotProduct += value * (secondVector.get(key) ?? 0);
  }
  if (dotProduct === 0) {
    return 0;
  }
  return dotProduct / (calculateMagnitude(firstVector) * calculateMagnitude(secondVector));
}
