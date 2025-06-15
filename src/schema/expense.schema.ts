import *  as yup from "yup";
const expenseSchema = yup.object({
    title:yup.string().required('Expenses title  is required'),
    amount:yup.number().typeError('Amount must be a number').required('Amount is required').test(
        'valid-decimal',
        'Amount must have up to 2 decimal places', // Customize message
        (value) => {
        if (value === undefined || value === null) return true; // Handles empty/undefined
        const decimalPart = value.toString().split('.')[1];
        return !decimalPart || decimalPart.length <= 2; // Allows 0-2 decimals
        }
    ),
    date:yup.string().required('Date is required'),
    category:yup.mixed().test('is-valid-category', 'Category is required', value =>
      (typeof value === 'string' && value !== '') || (typeof value === 'object' && value !== null)
    ).required('Category is required'),
    receipts:yup.array().of(yup.mixed()).max(3,'you can upload upto 3 receipts').notRequired(),
    description:yup.string().notRequired()
})

export default expenseSchema;