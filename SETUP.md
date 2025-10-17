# Snehaye Nagaraya - Concert Pre-Registration Website

A beautiful, responsive Next.js website for pre-registering attendees for the "Snehaye Nagaraya" live concert, featuring Google Sheets integration for storing registrations.

## Features

- 🎵 Professional pink and white themed design
- 🌐 Fully responsive across all devices (mobile, tablet, desktop)
- 🇱🇰 Sinhala font support using Noto Sans Sinhala
- 📝 Registration form with validation
- 📊 Google Sheets integration for storing registrations
- ✅ Real-time form submission feedback
- 🔒 Secure API endpoint for data submission

## Pages

1. **Home Page** (`/`) - Concert information and pre-registration details
2. **Registration Form** (`/register`) - Form to collect attendee information

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Google Sheets

#### A. Create a Google Cloud Project and Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API
4. Create a Service Account:
   - Go to "IAM & Admin" > "Service Accounts"
   - Click "Create Service Account"
   - Give it a name and click "Create"
   - Skip granting roles (click "Continue")
   - Click "Done"
5. Create a key for the service account:
   - Click on the service account you just created
   - Go to "Keys" tab
   - Click "Add Key" > "Create new key"
   - Choose JSON format
   - Save the downloaded file

#### B. Create and Configure Google Sheet

1. Create a new Google Sheet
2. Note the Sheet ID from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
3. Share the sheet with the service account email:
   - Open your service account JSON file
   - Copy the `client_email` value
   - Click "Share" on your Google Sheet
   - Paste the email and give it "Editor" access

#### C. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

2. Edit `.env.local` and add:

   - `GOOGLE_SHEET_ID`: Your Google Sheet ID from step B.2
   - `GOOGLE_SERVICE_ACCOUNT_BASE64`: Base64 encoded service account JSON

To encode your service account JSON file:

**Windows PowerShell:**

```powershell
[Convert]::ToBase64String([System.IO.File]::ReadAllBytes("path\to\service-account.json"))
```

**Linux/Mac:**

```bash
base64 -w 0 path/to/service-account.json
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### 4. Build for Production

```bash
npm run build
npm start
```

## Form Fields

The registration form collects:

- **නම (Name)** - Required
- **දුරකථන අංකය (Contact Number)** - Required
- **විද්‍යුත් තැපෑල (Email)** - Required
- **නගරය (City)** - Optional

All submissions are automatically saved to your Google Sheet with a timestamp.

## Google Sheet Structure

The data is saved with the following columns:

| Timestamp | Name | Contact Number | Email | City |
| --------- | ---- | -------------- | ----- | ---- |

Headers are automatically created if they don't exist.

## Contact Information

**Organized by Kandyanz Events**

- Phone: +94 70 282 5777
- Email: bsanka27@gmail.com

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript
- **Fonts:** Noto Sans Sinhala, Inter
- **API Integration:** Google Sheets API via googleapis
- **Deployment Ready:** Vercel, Netlify, or any Node.js hosting

## Troubleshooting

### Google Sheets API Errors

1. **Authentication Error**: Ensure your service account JSON is correctly base64 encoded
2. **Permission Error**: Make sure you've shared the sheet with the service account email
3. **API Not Enabled**: Enable Google Sheets API in your Google Cloud project

### Form Submission Issues

1. Check browser console for errors
2. Verify `.env.local` file exists and contains correct values
3. Ensure the API route is accessible at `/api/SaveToSheet`

## License

This project is created for Snehaye Nagaraya concert event.
