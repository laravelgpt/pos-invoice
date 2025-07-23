
import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { useReceiptState } from './hooks/useReceiptState';
import { ReceiptHeader } from './components/ReceiptHeader';
import { ReceiptItemsTable } from './components/ReceiptItemsTable';
import { ReceiptSummary } from './components/ReceiptSummary';
import { ReceiptFooter } from './components/ReceiptFooter';
import { InfoIcon, DownloadIcon, PrintIcon } from './components/icons';

const App: React.FC = () => {
  const {
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
  } = useReceiptState();

  const receiptRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (receiptRef.current) {
      html2canvas(receiptRef.current, {
        useCORS: true,
        scale: 2, // Higher scale for better quality
        backgroundColor: '#ffffff',
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = `receipt-${receipt.invoiceNo}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  const handlePreparePrint = () => {
    const receiptNode = receiptRef.current;
    if (!receiptNode) return;

    const receiptHTML = receiptNode.innerHTML;

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
        alert('Please allow pop-ups to print the receipt.');
        return;
    }

    printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Print Receipt - ${receipt.invoiceNo}</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
                body {
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    background-color: #e5e7eb; /* gray-200 */
                    margin: 0;
                    padding: 2rem;
                    min-height: 100vh;
                }
                .receipt-container-wrapper {
                  /* This class is on the receipt's outer div in this new window */
                  font-family: monospace;
                  width: 320px !important; /* Approx 80mm at 96dpi for preview */
                }
                .print-controls {
                    position: fixed;
                    top: 1rem;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    gap: 0.75rem;
                    background: white;
                    padding: 0.75rem;
                    border-radius: 0.5rem;
                    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
                    z-index: 10;
                }
                .print-controls button {
                    padding: 0.5rem 1rem;
                    border-radius: 0.375rem;
                    font-weight: bold;
                    color: white;
                    cursor: pointer;
                    border: none;
                    font-family: sans-serif;
                }
                .print-btn { background-color: #2563eb; } /* blue-600 */
                .print-btn:hover { background-color: #1d4ed8; } /* blue-800 */
                .close-btn { background-color: #9ca3af; } /* gray-400 */
                .close-btn:hover { background-color: #6b7280; } /* gray-500 */
                
                @media print {
                    body {
                        background-color: white !important;
                        padding: 0;
                        margin: 0;
                    }
                    .print-controls {
                        display: none !important;
                    }
                    .receipt-container-wrapper {
                        margin: 0 !important;
                        padding: 0 !important;
                        width: 100% !important; /* Fit to @page width */
                        box-shadow: none !important;
                        border: none !important;
                    }
                    @page {
                        size: 80mm auto;
                        margin: 5mm;
                    }
                }
            </style>
        </head>
        <body>
            <div class="print-controls">
                <button onclick="window.print()" class="print-btn">Print Now</button>
                <button onclick="window.close()" class="close-btn">Close</button>
            </div>
            <div class="receipt-container-wrapper bg-white shadow-lg p-4 sm:p-6 w-full">
                ${receiptHTML}
            </div>
        </body>
        </html>
    `);
    printWindow.document.close();
};


  return (
    <div className="min-h-screen bg-gray-200 w-full flex flex-col lg:flex-row items-center lg:items-start justify-center p-2 sm:p-4 md:p-8 gap-8 font-mono print-root">
      
      {/* Controls Panel */}
      <div className="w-full max-w-sm lg:w-80 flex-shrink-0 flex flex-col gap-4 no-print order-2 lg:order-1 lg:sticky lg:top-8">
        
        <div className="p-3 bg-blue-100 border-l-4 border-blue-500 text-blue-700 rounded-md shadow-md">
            <div className="flex">
                <div className="py-1"><InfoIcon className="h-6 w-6 text-blue-500 mr-4 shrink-0"/></div>
                <div>
                    <p className="font-bold">Interactive Receipt</p>
                    <p className="text-sm">Click any field on the receipt to edit it. Changes save automatically.</p>
                </div>
            </div>
        </div>

        <div className="flex flex-row flex-wrap gap-2">
          <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white font-bold rounded-md shadow-md hover:bg-green-600 transition-colors"
              aria-label="Download receipt as PNG"
          >
              <DownloadIcon />
              Download
          </button>
          <button
              onClick={handlePreparePrint}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white font-bold rounded-md shadow-md hover:bg-gray-800 transition-colors"
              aria-label="Open print preview"
          >
              <PrintIcon />
              Print / Preview
          </button>
        </div>

        <footer className="text-left text-gray-500 text-sm mt-4">
              <p>Built with React, TypeScript, and Tailwind CSS.</p>
              <p>This is a visual representation and not a real tax invoice.</p>
        </footer>
      </div>

      {/* Receipt Preview - This ref is now used to copy the HTML for printing */}
      <div className="w-full max-w-sm order-1 lg:order-2 printable-area-wrapper">
        <div ref={receiptRef} className="bg-white shadow-lg p-4 sm:p-6 w-full receipt-container">
          <ReceiptHeader data={receipt} updateField={updateField} />
          <ReceiptItemsTable 
              items={receipt.lineItems} 
              updateLineItem={updateLineItem}
              addLineItem={addLineItem}
              removeLineItem={removeLineItem}
              currencySymbol={receipt.currencySymbol}
              unitSeparator={receipt.unitSeparator}
              addItemLabel={receipt.addItemLabel}
              updateField={updateField}
              updateLineItemTotal={updateLineItemTotal}
          />
          <ReceiptSummary
            itemCount={itemCount}
            total={total}
            cash={receipt.cash}
            paidAmount={receipt.paidAmount}
            updateField={updateField}
            updateFinalTotal={updateFinalTotal}
            itemsCountLabel={receipt.itemsCountLabel}
            totalLabel={receipt.totalLabel}
            cashLabel={receipt.cashLabel}
            paidAmountLabel={receipt.paidAmountLabel}
            currencySymbol={receipt.currencySymbol}
          />
          <ReceiptFooter 
              barcodeValue={receipt.invoiceNo}
              qrCodeValue={qrCodeValue}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
