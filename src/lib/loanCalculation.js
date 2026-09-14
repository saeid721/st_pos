export default function generateLoanCalculation(amount, interest, duration, loanType, paymentType) {
    let payableAmount = 0;
    let rowPayableAmount = 0;
    let payReturn = 0;

    if (loanType === 0) {
        rowPayableAmount = amount + interest;
        payableAmount = `${amount} + ${interest} = ${rowPayableAmount}`;
    } else {
        let totalInterestAmount = 0;
        let monthlyPayment = 0;
        let interestRate = interest / 100;
        let numOfYears = 0;

        if (interest && duration) {
            if (paymentType === 0) {
                numOfYears = duration / 365;
            } else if (paymentType === 1) {
                numOfYears = duration / 12;
            } else {
                numOfYears = duration;
            }

            monthlyPayment = Number(
                (
                    ((interestRate / 12) * amount) /
                    (1 - Math.pow(1 + interestRate / 12, numOfYears * -12))
                )
            );

            totalInterestAmount = Number(
                (monthlyPayment * (numOfYears * 12) - amount)
            );

            rowPayableAmount = Number((parseFloat(amount) + parseFloat(totalInterestAmount)));
            payableAmount = `${amount} + ${totalInterestAmount.toFixed(2)} = ${rowPayableAmount.toFixed(2)}`;
            // Set correct periodic payment based on paymentType
            if (paymentType === 0) {
                payReturn = rowPayableAmount / (numOfYears * 365); // Per day
            } else if (paymentType === 1) {
                payReturn = rowPayableAmount / (numOfYears * 12);  // Per month
            } else if (paymentType === 2) {
                payReturn = rowPayableAmount / numOfYears;         // Per year
            }
        }
    }

    return {
        payableAmount,
        rowPayableAmount,
        payReturn: Number(payReturn.toFixed(2)),
    };
}



// Example of how you might use this function
// const result = generateLoanCalculation(100, 10, 10, 1, 1);
// console.log(result);
