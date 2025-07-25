# Editable POS Receipt Generator

An interactive web application that allows users to create and edit a point-of-sale (POS) receipt. All fields, including line items, totals, barcode, and QR code, are dynamically editable and update in real-time.

## Features

- Editable receipt fields (company name, CR number, tax number, etc.)
- Add, edit, and remove line items
- Automatic calculation of totals
- Generate QR codes and barcodes
- Download receipt as an image
- Print receipt with a dedicated print view

## Prerequisites

- Node.js (latest LTS version recommended)

## Run Locally

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd editable-pos-receipt-generator-1
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set the `GEMINI_API_KEY` in a `.env.local` file:
   ```env
   GEMINI_API_KEY=your-gemini-api-key
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Build for Production

To create a production build:
```bash
npm run build
```

## Preview Production Build

To preview the production build locally:
```bash
npm run preview
```

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Vite
- Libraries: `react-qr-code`, `react-barcode`, `html2canvas`

## License

This project is licensed under the MIT License.
#
