import React from 'react';
import TextInput from '../TextInput/TextInput';
import CustomReactSelect from '../Select/CustomReactSelect';

const POSModal = ({ setShowModalAfterSubmit, register, errors, control, paymentOptions, addPaymentOptions, accounts, calculateTotal }) => {
    return (
        <div>
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded shadow-lg">
                    {/* Design Add Payment */}
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-xl font-bold">Add Payment</h1>
                        <button

                            className="text-red-500"
                            onClick={() => setShowModalAfterSubmit(false)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <CustomReactSelect
                            control={control}
                            name="account_id"
                            label="Account"
                            placeholder="Account"
                            options={
                                accounts?.data?.map((item) => ({
                                    value: item.id,
                                    label: item.bank_name,
                                })) || []
                            }
                            required={true}
                        // error={errors.section_type}
                        />
                        <div className="flex-1">
                            <TextInput
                                name="paid_amount"
                                label="Paid Amount*"
                                type="number"
                                register={register}
                                error={errors.amount}
                                placeholder="Enter Paid Amount*"
                                className={"mb-2"}
                                required={true}
                                defaultValue={calculateTotal()?.subtotal?.toFixed(2)}
                            />
                        </div>

                        <div className="flex-1">
                            <TextInput
                                name="cheque_no"
                                label="Cheque No"
                                type="text"
                                register={register}
                                error={errors.cheque_no}
                                placeholder="Enter Cheque No"
                                className={"mb-2"}
                            />
                        </div>
                        <div className="flex-1">
                            <TextInput
                                name="receipt_no"
                                label="Receipt No"
                                type="text"
                                register={register}
                                error={errors.receipt_no}
                                placeholder="Enter Receipt No"
                                className={"mb-2"}
                            />
                        </div>

                        <TextInput
                            name="po_reference"
                            label="PO Reference"
                            type="text"
                            register={register}
                            error={errors.po_reference}
                            placeholder="Enter PO Reference"
                        />
                        <TextInput
                            name="payment_terms"
                            label="Payment Terms"
                            type="text"
                            register={register}
                            error={errors.payment_terms}
                            placeholder="Enter Payment Terms"
                        />
                        <TextInput
                            name="reference"
                            label="Reference"
                            type="text"
                            register={register}
                            error={errors.reference}
                            placeholder="Enter Reference"
                        />


                        <TextInput
                            name="delivery_place"
                            label="Delivery Place"
                            type="text"
                            register={register}
                            error={errors.delivery_place}
                            placeholder="Enter Delivery Place"
                        />

                        <TextInput name="invoice_date" label="Date" type="datetime-local" register={register} error={errors.invoice_date} />
                        <TextInput name="note" label="Note" type="text" register={register} error={errors.note} placeholder="Enter Note" />

                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <button type="submit" className="bg-blue-600 text-white rounded">
                            Save
                        </button>
                        <button
                            onClick={() => setShowModalAfterSubmit(false)}
                            className=" bg-red-500 text-white p-2 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default POSModal;