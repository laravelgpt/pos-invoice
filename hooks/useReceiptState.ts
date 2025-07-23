import { useState, useMemo, useCallback } from 'react';
import { ReceiptData, LineItem } from '../types';

const initialData: ReceiptData = {
  companyName: 'MANAR AL JUBAIL TRADING CO. LLC',
  crNo: '2055129755',
  street: 'HAIL STREET',
  city: 'AL JUBAIL',
  taxNo: '311301306700003',
  title: 'Simplified tax Invoice',
  invoiceNo: '25-200-000187',
  date: '22-Jul-25',
  time: '2:54:09 AM',
  user: 'Admin',
  orderNo: '273',
  lineItems: [
    { id: '1', name: 'MOBILY 20', quantity: 1013, unitPrice: 19.55 },
    { id: '2', name: 'ZAIN 20', quantity: 616, unitPrice: 19.42 },
    { id: '3', name: 'FRIENDI 20', quantity: 1, unitPrice: 19.10 },
    { id: '4', name: 'FRIENDI 15', quantity: 303, unitPrice: 14.32 },
    { id: '5', name: 'MOBILY 57.50', quantity: 57, unitPrice: 56.23 },
    { id: '6', name: 'MOBILY 115', quantity: 21, unitPrice: 112.46 },
    { id: '7', name: 'MOBILY 34.50', quantity: 52, unitPrice: 33.72 },
    { id: '8', name: 'SAWA 115', quantity: 74, unitPrice: 113.05 },
    { id: '9', name: 'SAWA 20', quantity: 273, unitPrice: 19.70 },
    { id: '10', name: 'SAWA 57.50', quantity: 74, unitPrice: 56.60 },
    { id: '11', name: 'ZAIN 115', quantity: 24, unitPrice: 112.00 },
    { id: '12', name: 'ZAIN 34.50', quantity: 25, unitPrice: 33.54 },
    { id: '13', name: 'ZAIN 57.50', quantity: 42, unitPrice: 56.00 },
  ],
  cash: 67255.84,
  paidAmount: 67255.84,
  
  // Initial values for labels
  currencySymbol: 'SAR.',
  unitSeparator: 'x',
  crNoLabel: 'C.R. NO.',
  taxNoLabel: 'Tax No.:',
  invoiceNoLabel: 'Invoice No.:',
  userLabel: 'User:',
  orderNoLabel: 'Order No.:',
  itemsCountLabel: 'Items count:',
  totalLabel: 'TOTAL:',
  cashLabel: 'Cash:',
  paidAmountLabel: 'Paid amount:',
  addItemLabel: 'Add Item',
};

export const useReceiptState = () => {
  const [receipt, setReceipt] = useState<ReceiptData>(initialData);

  const updateField = useCallback(<K extends keyof ReceiptData>(field: K, value: ReceiptData[K]) => {
    setReceipt(prev => ({ ...prev, [field]: value }));
  }, []);

  const updateLineItem = useCallback((id: string, field: keyof LineItem, value: string | number) => {
    setReceipt(prev => ({
      ...prev,
      lineItems: prev.lineItems.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  }, []);
  
  const addLineItem = useCallback(() => {
    const newItem: LineItem = {
      id: new Date().getTime().toString(),
      name: 'NEW ITEM',
      quantity: 1,
      unitPrice: 0.00,
    };
    setReceipt(prev => ({ ...prev, lineItems: [...prev.lineItems, newItem] }));
  }, []);

  const removeLineItem = useCallback((id: string) => {
    setReceipt(prev => ({
      ...prev,
      lineItems: prev.lineItems.filter(item => item.id !== id),
    }));
  }, []);

  const total = useMemo(() => {
    return receipt.lineItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  }, [receipt.lineItems]);

  const itemCount = useMemo(() => receipt.lineItems.length, [receipt.lineItems]);
  
  const qrCodeValue = useMemo(() => {
    return `Company: ${receipt.companyName}\nTax No: ${receipt.taxNo}\nInvoice No: ${receipt.invoiceNo}\nDate: ${receipt.date} ${receipt.time}\nTotal: ${receipt.currencySymbol}${total.toFixed(2)}`;
  }, [receipt.companyName, receipt.taxNo, receipt.invoiceNo, receipt.date, receipt.time, total, receipt.currencySymbol]);

  const updateLineItemTotal = useCallback((id: string, newTotal: number) => {
    setReceipt(prev => {
        const newItems = prev.lineItems.map(item => {
            if (item.id === id) {
                const newUnitPrice = item.quantity !== 0 ? newTotal / item.quantity : 0;
                return { ...item, unitPrice: newUnitPrice };
            }
            return item;
        });
        return { ...prev, lineItems: newItems };
    });
  }, []);

  const updateFinalTotal = useCallback((newFinalTotal: number) => {
    const currentTotal = receipt.lineItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

    if (currentTotal === 0) {
        // Cannot prorate from a zero total. User should edit items individually.
        return;
    }

    const ratio = newFinalTotal / currentTotal;

    setReceipt(prev => ({
        ...prev,
        lineItems: prev.lineItems.map(item => ({
            ...item,
            unitPrice: item.unitPrice * ratio
        }))
    }));
  }, [receipt.lineItems]);

  return {
    receipt,
    updateField,
    updateLineItem,
    addLineItem,
    removeLineItem,
    total,
    itemCount,
    qrCodeValue,
    updateLineItemTotal,
    updateFinalTotal,
  };
};