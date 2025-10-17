# 🎵 Snehaye Nagaraya - Quick Start Guide

## ✅ What's Been Created

Your concert pre-registration website is now ready with:

### 📄 Pages Created:

1. **Home Page** (`app/page.tsx`)

   - Beautiful landing page with concert details in Sinhala and English
   - Pink and white professional theme
   - Event information (date, venue, time, artists)
   - Pre-registration benefits
   - Organizer contact information

2. **Registration Form** (`app/register/page.tsx`)

   - Form with Sinhala labels
   - Fields: Name, Contact Number, Email, City (optional)
   - Form validation
   - Success/error message display
   - Back to home button

3. **API Route** (`app/api/SaveToSheet/route.js`)
   - Handles form submissions
   - Saves data to Google Sheets
   - Includes timestamp
   - Error handling

### 🎨 Design Features:

- ✅ Pink and white color scheme
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Sinhala font support (Noto Sans Sinhala)
- ✅ Professional and readable layout
- ✅ Smooth animations and transitions
- ✅ Gradient backgrounds and shadows

## 🚀 Server Running

Your development server is currently running at:

- **Local:** http://localhost:3001
- **Network:** http://192.168.124.253:3001

## ⚙️ Next Steps - Configure Google Sheets

### 1. Set Up Environment Variables

You need to create a `.env.local` file with your Google Sheets configuration:

1. **Copy the example file:**

   ```bash
   cp .env.local.example .env.local
   ```

2. **Edit `.env.local` and add your credentials:**
   ```env
   GOOGLE_SHEET_ID=your_google_sheet_id_here
   GOOGLE_SERVICE_ACCOUNT_BASE64=your_base64_encoded_credentials_here
   ```

### 2. Get Your Google Sheet ID

1. Open your Google Sheet
2. Look at the URL: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit`
3. Copy the Sheet ID from the URL

### 3. Encode Your Service Account Credentials

If you have your service account JSON file, encode it to base64:

**On Windows PowerShell:**

```powershell
[Convert]::ToBase64String([System.IO.File]::ReadAllBytes("path\to\your\service-account.json"))
```

**The output will be a long string - copy it to your `.env.local` file**

### 4. Share Your Google Sheet

1. Open your service account JSON file
2. Find the `client_email` field (looks like: `something@project-name.iam.gserviceaccount.com`)
3. In your Google Sheet, click "Share"
4. Paste the email and give "Editor" access

### 5. Restart the Server

After adding `.env.local`, restart the development server:

Press `Ctrl+C` in the terminal, then run:

```bash
npm run dev
```

## 📊 Google Sheet Structure

When someone registers, a new row will be added with:

| Timestamp              | Name     | Contact Number  | Email            | City    |
| ---------------------- | -------- | --------------- | ---------------- | ------- |
| 12/17/2024 10:30:45 AM | John Doe | +94 XX XXX XXXX | john@example.com | Colombo |

## 🧪 Test the Form

1. Open http://localhost:3001 in your browser
2. Click "Pre-register Now"
3. Fill in the form
4. Click "Submit Registration"
5. Check your Google Sheet for the new entry!

## 📱 Pages Overview

### Home Page Features:

- Concert title in Sinhala (ස්නේහයේ නගරය)
- Tagline: "කදුකරයේ සීතලෙන් මුසපත් වී — ස්නේහයෙන් උණුසුම් වෙන්න"
- Featured artists list
- Event details (venue, date, time)
- Benefits of pre-registering
- Privacy notice
- Call to action button
- Organizer information

### Registration Form Features:

- Sinhala field labels
- Required field validation
- Email format validation
- Phone number pattern validation
- Loading state during submission
- Success/error messages
- Organizer contact info at bottom

## 🎨 Color Scheme

- **Primary Pink:** #EC4899 (pink-500)
- **Light Pink:** #FDF2F8 (pink-50)
- **White:** #FFFFFF
- **Text Gray:** #2D2D2D
- **Accent Colors:** Various pink shades for gradients

## 📞 Contact Information Displayed

- **Organization:** Kandyanz Events
- **Phone:** +94 70 282 5777
- **Email:** bsanka27@gmail.com

## 🛠️ Technologies Used

- Next.js 15 (React Framework)
- TypeScript
- Tailwind CSS 4
- Google Sheets API (googleapis)
- Noto Sans Sinhala Font
- Inter Font

## 🌐 Deploy to Production

When ready to deploy:

1. Build the project:

   ```bash
   npm run build
   ```

2. Deploy to Vercel (recommended):
   - Push code to GitHub
   - Import to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy!

## 📝 Need Help?

Check `SETUP.md` for detailed setup instructions and troubleshooting tips.

---

**Website is ready! Just configure the Google Sheets integration and you're all set! 🎉**
