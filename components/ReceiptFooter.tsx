
import React, { useEffect, useRef } from 'react';
import QRCode from 'react-qr-code';
import Barcode from 'react-barcode';

interface ReceiptFooterProps {
  barcodeValue: string;
  qrCodeValue: string;
}

export const ReceiptFooter: React.FC<ReceiptFooterProps> = ({ barcodeValue, qrCodeValue }) => {
  return (
    <div className="mt-4 flex flex-col items-center">
        <Barcode 
            value={barcodeValue} 
            format="CODE128"
            width={2}
            height={50}
            displayValue={true}
            font="monospace"
            fontSize={12}
            margin={0}
            background="transparent"
        />
        <div className="mt-4 p-2 bg-white border border-gray-300 rounded-sm">
            {qrCodeValue ? (
                <QRCode
                    value={qrCodeValue}
                    size={128}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    level="L"
                />
            ) : (
                <div className="w-32 h-32 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                    No QR Data
                </div>
            )}
        </div>
    </div>
  );
};
