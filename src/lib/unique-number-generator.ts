const usedNumbers = new Set(); // Replace with a database in production

export function generateUniqueNumber(min = 20, max = 100) {
  if (usedNumbers.size >= max - min + 1) {
    throw new Error("No available numbers");
  }

  let num;
  do {
    num = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (usedNumbers.has(num)); // Keep generating until a unique number is found

  usedNumbers.add(num);
  return num;
}
