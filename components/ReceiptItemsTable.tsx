
import React from 'react';
import { LineItem, ReceiptData } from '../types';
import { EditableField } from './EditableField';
import { PlusCircleIcon, TrashIcon } from './icons';

interface ReceiptItemsTableProps {
  items: LineItem[];
  updateLineItem: (id: string, field: keyof LineItem, value: string | number) => void;
  addLineItem: () => void;
  removeLineItem: (id: string) => void;
  currencySymbol: string;
  unitSeparator: string;
  addItemLabel: string;
  updateField: <K extends keyof ReceiptData>(field: K, value: ReceiptData[K]) => void;
  updateLineItemTotal: (id: string, newTotal: number) => void;
}

export const ReceiptItemsTable: React.FC<ReceiptItemsTableProps> = ({ items, updateLineItem, addLineItem, removeLineItem, currencySymbol, unitSeparator, addItemLabel, updateField, updateLineItemTotal }) => {
  return (
    <div className="my-3 text-xs">
      {items.map(item => {
        const itemTotal = item.quantity * item.unitPrice;
        return (
          <div key={item.id} className="group relative border-b border-dashed border-black py-1 last:border-none">
            <div className="font-bold">
              <EditableField initialValue={item.name} onSave={val => updateLineItem(item.id, 'name', val as string)} />
            </div>
            <div className="flex justify-between flex-wrap">
              <div className="flex items-center">
                <EditableField initialValue={item.quantity} onSave={val => updateLineItem(item.id, 'quantity', val as number)} inputType="number" />
                <span className="mx-1">
                  <EditableField initialValue={unitSeparator} onSave={val => updateField('unitSeparator', val as string)} />
                  {' '}
                  <EditableField initialValue={currencySymbol} onSave={val => updateField('currencySymbol', val as string)} />
                </span>
                <EditableField initialValue={item.unitPrice.toFixed(2)} onSave={val => updateLineItem(item.id, 'unitPrice', val as number)} inputType="number" />
              </div>
              <div className="flex items-center">
                <EditableField initialValue={currencySymbol} onSave={val => updateField('currencySymbol', val as string)} />
                <EditableField
                  initialValue={itemTotal.toFixed(2)}
                  onSave={(val) => updateLineItemTotal(item.id, val as number)}
                  inputType="number"
                  textAlign="right"
                  className="min-w-[5rem]"
                />
              </div>
            </div>
            <button
                onClick={() => removeLineItem(item.id)}
                className="absolute -right-6 top-1/2 -translate-y-1/2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove item"
              >
                <TrashIcon />
              </button>
          </div>
        );
      })}
       <button 
        onClick={addLineItem}
        className="mt-4 flex items-center justify-center w-full text-blue-600 hover:text-blue-800 transition-colors py-1 border-2 border-dashed rounded-lg"
        >
        <PlusCircleIcon />
        <span className="ml-2 font-bold">
          <EditableField initialValue={addItemLabel} onSave={val => updateField('addItemLabel', val as string)} />
        </span>
      </button>
    </div>
  );
};