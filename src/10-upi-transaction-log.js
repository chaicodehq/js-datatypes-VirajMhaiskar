/**
 * 💸 UPI Transaction Log Analyzer
 *
 * Aaj kal sab UPI pe chalta hai! Tujhe ek month ke transactions ka log
 * milega, aur tujhe pura analysis karna hai - kitna aaya, kitna gaya,
 * kiski saath zyada transactions hue, etc.
 *
 * Rules:
 *   - transactions is array of objects:
 *     [{ id: "TXN001", type: "credit"/"debit", amount: 500,
 *        to: "Rahul", category: "food", date: "2025-01-15" }, ...]
 *   - Skip transactions where amount is not a positive number
 *   - Skip transactions where type is not "credit" or "debit"
 *   - Calculate (on valid transactions only):
 *     - totalCredit: sum of all "credit" type amounts
 *     - totalDebit: sum of all "debit" type amounts
 *     - netBalance: totalCredit - totalDebit
 *     - transactionCount: total number of valid transactions
 *     - avgTransaction: Math.round(sum of all valid amounts / transactionCount)
 *     - highestTransaction: the full transaction object with highest amount
 *     - categoryBreakdown: object with category as key and total amount as value
 *       e.g., { food: 1500, travel: 800 } (include both credit and debit)
 *     - frequentContact: the "to" field value that appears most often
 *       (if tie, return whichever appears first)
 *     - allAbove100: boolean, true if every valid transaction amount > 100 (use every)
 *     - hasLargeTransaction: boolean, true if some valid amount >= 5000 (use some)
 *   - Hint: Use filter(), reduce(), sort(), find(), every(), some(),
 *     Object.entries(), Math.round(), typeof
 *
 * Validation:
 *   - Agar transactions array nahi hai ya empty hai, return null
 *   - Agar after filtering invalid transactions, koi valid nahi bacha, return null
 *
 * @param {Array<{ id: string, type: string, amount: number, to: string, category: string, date: string }>} transactions
 * @returns {{ totalCredit: number, totalDebit: number, netBalance: number, transactionCount: number, avgTransaction: number, highestTransaction: object, categoryBreakdown: object, frequentContact: string, allAbove100: boolean, hasLargeTransaction: boolean } | null}
 *
 * @example
 *   analyzeUPITransactions([
 *     { id: "T1", type: "credit", amount: 5000, to: "Salary", category: "income", date: "2025-01-01" },
 *     { id: "T2", type: "debit", amount: 200, to: "Swiggy", category: "food", date: "2025-01-02" },
 *     { id: "T3", type: "debit", amount: 100, to: "Swiggy", category: "food", date: "2025-01-03" }
 *   ])
 *   // => { totalCredit: 5000, totalDebit: 300, netBalance: 4700,
 *   //      transactionCount: 3, avgTransaction: 1767,
 *   //      highestTransaction: { id: "T1", ... },
 *   //      categoryBreakdown: { income: 5000, food: 300 },
 *   //      frequentContact: "Swiggy", allAbove100: false, hasLargeTransaction: true }
 */
export function analyzeUPITransactions(transactions) {
  // Your code here
  if(!Array.isArray(transactions) || transactions.length <= 0) {
    return null;
  }

  let type = ["credit", "debit"];

  let positiveAmountTransaction = transactions.filter((item) => item.amount > 0);
  let filteredTransaction = positiveAmountTransaction.filter((item) => type.includes(item.type));
  if(filteredTransaction.length === 0) {
    return null;
  }

  let totalCredit = filteredTransaction.reduce((acc, item) => {
    if(item.type === "credit") {
      return acc + item.amount;
    }
    return acc;
  }, 0);

  let totalDebit = filteredTransaction.reduce((acc, item) => {
    if(item.type === "debit") {
      return acc + item.amount;
    }
    return acc;
  }, 0);

  let netBalance = totalCredit - totalDebit;

  let transactionCount = filteredTransaction.length;

  let avgTransaction = Math.round((totalCredit + totalDebit) / transactionCount);

  let highestTransaction = filteredTransaction.reduce((acc, item) => acc.amount > item.amount ? acc : item, {});

  let categoryBreakdown = filteredTransaction.reduce((acc, item) => {
    if(acc[item.category]) {
      acc[item.category] += item.amount;
    } else {
      acc[item.category] = item.amount;
    }
    return acc;
  }, {});

  // let frequentContact = filteredTransaction.reduce((acc, item) => {
  //   if(acc[item.to]) {
  //     acc[item.to] += 1;
  //   } else {
  //     acc[item.to] = 1;
  //   }
  //   acc = Math.max(acc[item.to]);
  //   return acc.to;
  // }, "");

  let frequency = filteredTransaction.reduce((acc, item) => {
    if(acc[item.to]) {
      acc[item.to] += 1;
    } else {
      acc[item.to] = 1
    }
    return acc;
  }, {});
  let frequentContact = Object.keys(frequency).reduce((acc, item) => frequency[item] > frequency[acc] ? item : acc);

  let allAbove100 = filteredTransaction.every((item) => item.amount > 100);

  let hasLargeTransaction = filteredTransaction.some((item) => item.amount >= 5000);

  return {totalCredit: totalCredit, totalDebit: totalDebit, netBalance: netBalance, transactionCount: transactionCount, avgTransaction: avgTransaction, highestTransaction: highestTransaction, categoryBreakdown: categoryBreakdown, frequentContact: frequentContact, allAbove100: allAbove100, hasLargeTransaction: hasLargeTransaction};
}
