
import React from 'react';
import { ReceiptData } from '../types';
import { EditableField } from './EditableField';

interface ReceiptSummaryProps {
  itemCount: number;
  total: number;
  cash: number;
  paidAmount: number;
  updateField: <K extends keyof ReceiptData>(field: K, value: ReceiptData[K]) => void;
  updateFinalTotal: (newTotal: number) => void;
  itemsCountLabel: string;
  totalLabel: string;
  cashLabel: string;
  paidAmountLabel: string;
  currencySymbol: string;
}

export const ReceiptSummary: React.FC<ReceiptSummaryProps> = ({ 
    itemCount, 
    total, 
    cash, 
    paidAmount, 
    updateField,
    updateFinalTotal,
    itemsCountLabel,
    totalLabel,
    cashLabel,
    paidAmountLabel,
    currencySymbol
}) => {
  return (
    <div className="my-3 text-xs border-t-2 border-dashed border-black pt-2">
      <div className="flex justify-between flex-wrap">
        <span>
          <EditableField initialValue={itemsCountLabel} onSave={val => updateField('itemsCountLabel', val as string)} /> {itemCount}
        </span>
      </div>
      <div className="flex justify-between flex-wrap font-bold text-base my-2 border-t-2 border-b-2 border-dashed border-black py-2">
        <span><EditableField initialValue={totalLabel} onSave={val => updateField('totalLabel', val as string)} /></span>
        <div className="flex items-center">
            <EditableField initialValue={currencySymbol} onSave={val => updateField('currencySymbol', val as string)} />
            <EditableField 
              initialValue={total.toFixed(2)}
              onSave={(val) => updateFinalTotal(val as number)}
              inputType="number"
              textAlign="right"
              className="min-w-[6rem] font-bold"
            />
        </div>
      </div>
      <div className="flex justify-between flex-wrap">
        <span><EditableField initialValue={cashLabel} onSave={val => updateField('cashLabel', val as string)} /></span>
        <div className="flex items-center">
            <EditableField initialValue={currencySymbol} onSave={val => updateField('currencySymbol', val as string)} />
            <EditableField initialValue={cash.toFixed(2)} onSave={val => updateField('cash', val as number)} inputType="number" textAlign="right"/>
        </div>
      </div>
      <div className="flex justify-between flex-wrap">
        <span><EditableField initialValue={paidAmountLabel} onSave={val => updateField('paidAmountLabel', val as string)} /></span>
        <div className="flex items-center">
            <EditableField initialValue={currencySymbol} onSave={val => updateField('currencySymbol', val as string)} />
            <EditableField initialValue={paidAmount.toFixed(2)} onSave={val => updateField('paidAmount', val as number)} inputType="number" textAlign="right"/>
        </div>
      </div>
    </div>
  );
};