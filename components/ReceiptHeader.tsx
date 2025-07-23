import React from 'react';
import { ReceiptData } from '../types';
import { EditableField } from './EditableField';

interface ReceiptHeaderProps {
  data: ReceiptData;
  updateField: <K extends keyof ReceiptData>(field: K, value: ReceiptData[K]) => void;
}

export const ReceiptHeader: React.FC<ReceiptHeaderProps> = ({ data, updateField }) => {
  return (
    <div className="text-center font-bold text-sm">
      <div className="text-xl">
        <EditableField initialValue={data.companyName} onSave={(val) => updateField('companyName', val as string)} className="font-bold text-xl" textAlign="center" />
      </div>
      <div className="mt-2">
        <EditableField initialValue={data.crNoLabel} onSave={(val) => updateField('crNoLabel', val as string)} /> <EditableField initialValue={data.crNo} onSave={(val) => updateField('crNo', val as string)} />. <EditableField initialValue={data.street} onSave={(val) => updateField('street', val as string)} />
      </div>
      <div>
        <EditableField initialValue={data.city} onSave={(val) => updateField('city', val as string)} textAlign="center" />
      </div>
      <div>
        <EditableField initialValue={data.taxNoLabel} onSave={(val) => updateField('taxNoLabel', val as string)} /> <EditableField initialValue={data.taxNo} onSave={(val) => updateField('taxNo', val as string)} />
      </div>
      <div className="my-2 border-t border-b border-dashed border-black py-1">
        <EditableField initialValue={data.title} onSave={(val) => updateField('title', val as string)} className="font-bold" textAlign="center" />
      </div>
      <div className="text-left text-xs font-normal">
        <div><EditableField initialValue={data.invoiceNoLabel} onSave={(val) => updateField('invoiceNoLabel', val as string)} /> <EditableField initialValue={data.invoiceNo} onSave={(val) => updateField('invoiceNo', val as string)} /></div>
        <div>
            <EditableField initialValue={data.date} onSave={(val) => updateField('date', val as string)} /> <EditableField initialValue={data.time} onSave={(val) => updateField('time', val as string)} />
        </div>
        <div><EditableField initialValue={data.userLabel} onSave={(val) => updateField('userLabel', val as string)} /> <EditableField initialValue={data.user} onSave={(val) => updateField('user', val as string)} /></div>
        <div><EditableField initialValue={data.orderNoLabel} onSave={(val) => updateField('orderNoLabel', val as string)} /> <EditableField initialValue={data.orderNo} onSave={(val) => updateField('orderNo', val as string)} /></div>
      </div>
    </div>
  );
};
