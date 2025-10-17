# How to Create Your .env.local File

## Step-by-Step Instructions

### 1. Create the file

Create a new file named `.env.local` in the root of your project (same folder as package.json)

### 2. Add these two lines (replace the values with your actual credentials):

```
GOOGLE_SHEET_ID=1abc123def456ghi789jkl
GOOGLE_SERVICE_ACCOUNT_BASE64=ewogICJ0eXBlIjogInNlcnZpY2VfYWNjb3VudCIsC...
```

## Getting Your Values

### GOOGLE_SHEET_ID

1. Open your Google Sheet in a browser
2. Look at the URL in the address bar
3. The Sheet ID is the long string between `/d/` and `/edit`

Example URL:

```
https://docs.google.com/spreadsheets/d/1abc123def456ghi789jkl/edit#gid=0
                                      ^^^^^^^^^^^^^^^^^^^^
                                      This is your Sheet ID
```

### GOOGLE_SERVICE_ACCOUNT_BASE64

This is your service account JSON file encoded in base64.

#### If you have the JSON file:

**Windows PowerShell Command:**

```powershell
[Convert]::ToBase64String([System.IO.File]::ReadAllBytes("C:\path\to\your\service-account.json"))
```

Replace `C:\path\to\your\service-account.json` with the actual path to your file.

**Example:**

```powershell
[Convert]::ToBase64String([System.IO.File]::ReadAllBytes("C:\Users\YourName\Downloads\snehaya-project-12345-a1b2c3d4.json"))
```

This will output a very long string. Copy the ENTIRE string (it might be several lines long).

## Example .env.local File

```env
# Google Sheets Configuration for Snehaya Concert
GOOGLE_SHEET_ID=1abc123def456ghi789jkl012mnop345qrst
GOOGLE_SERVICE_ACCOUNT_BASE64=ewogICJ0eXBlIjogInNlcnZpY2VfYWNjb3VudCIsCiAgInByb2plY3RfaWQiOiAic25laGF5YS1wcm9qZWN0IiwKICAicHJpdmF0ZV9rZXlfaWQiOiAiYTFiMmMzZDRlNWY2ZzciLAogICJwcml2YXRlX2tleSI6ICItLS0tLUJFR0lOIFBSSVZBVEUgS0VZLS0tLS1cbk1JSUV2UUlCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktjd2dnU2pBZ0VBQW9JQkFRRER1bjRwS3pYdHhsU29cbi4uLiIsCiAgImNsaWVudF9lbWFpbCI6ICJzbmVoYXlhLXNlcnZpY2VAc25laGF5YS1wcm9qZWN0LmlhbS5nc2VydmljZWFjY291bnQuY29tIiwKICAiY2xpZW50X2lkIjogIjEyMzQ1Njc4OTAxMjM0NTY3ODkwMSIsCiAgImF1dGhfdXJpIjogImh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi9hdXRoIiwKICAidG9rZW5fdXJpIjogImh0dHBzOi8vb2F1dGgyLmdvb2dsZWFwaXMuY29tL3Rva2VuIiwKICAiYXV0aF9wcm92aWRlcl94NTA5X2NlcnRfdXJsIjogImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL29hdXRoMi92MS9jZXJ0cyIsCiAgImNsaWVudF94NTA5X2NlcnRfdXJsIjogImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL3JvYm90L3YxL21ldGFkYXRhL3g1MDkvc25laGF5YS1zZXJ2aWNlJTQwc25laGF5YS1wcm9qZWN0LmlhbS5nc2VydmljZWFjY291bnQuY29tIgp9Cg==
```

## Important Notes

1. **NO SPACES** around the `=` sign
2. **NO QUOTES** around the values
3. The base64 string will be VERY LONG (could be 1000+ characters)
4. Copy the ENTIRE base64 string in one line
5. Save the file as `.env.local` (not `.txt` or any other extension)

## Verify Your Setup

After creating `.env.local`:

1. **Restart the development server** (Ctrl+C then `npm run dev`)
2. Go to http://localhost:3001/register
3. Fill out the form
4. Submit
5. Check your Google Sheet for the new entry

## Troubleshooting

### "Server configuration error"

- Check that both variables are set in `.env.local`
- Make sure there are no typos in the variable names

### "Authentication Error"

- Your base64 encoding might be incorrect
- Try encoding the JSON file again
- Make sure you copied the ENTIRE base64 string

### "Permission denied"

- You need to share your Google Sheet with the service account email
- Find `client_email` in your JSON file
- Share the sheet with that email as an Editor

## Need the Service Account JSON?

If you don't have it yet:

1. Go to https://console.cloud.google.com/
2. Select your project (or create one)
3. Enable Google Sheets API
4. Go to "IAM & Admin" → "Service Accounts"
5. Create a service account
6. Create a JSON key for that account
7. Download the JSON file
8. Use the PowerShell command above to encode it

---

**Once .env.local is configured correctly, your form will save data to Google Sheets automatically!**
