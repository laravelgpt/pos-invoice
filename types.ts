export interface LineItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface ReceiptData {
  companyName: string;
  crNo: string;
  street: string;
  city: string;
  taxNo: string;
  title: string;
  invoiceNo: string;
  date: string;
  time: string;
  user: string;
  orderNo: string;
  lineItems: LineItem[];
  cash: number;
  paidAmount: number;

  // Editable labels
  currencySymbol: string;
  unitSeparator: string;
  crNoLabel: string;
  taxNoLabel: string;
  invoiceNoLabel: string;
  userLabel: string;
  orderNoLabel: string;
  itemsCountLabel: string;
  totalLabel: string;
  cashLabel: string;
  paidAmountLabel: string;
  addItemLabel: string;
}
