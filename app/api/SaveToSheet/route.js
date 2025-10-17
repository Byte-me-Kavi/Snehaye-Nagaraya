import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, contactNumber, email, city } = body;

    // Validate required fields
    if (!name || !contactNumber || !email) {
      return NextResponse.json(
        { message: "Name, contact number, and email are required" },
        { status: 400 }
      );
    }

    // Get credentials from environment variables
    const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
    const GOOGLE_SERVICE_ACCOUNT_BASE64 = process.env.GOOGLE_SERVICE_ACCOUNT_BASE64;

    if (!GOOGLE_SHEET_ID || !GOOGLE_SERVICE_ACCOUNT_BASE64) {
      console.error("Missing environment variables");
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    // Decode the base64 credentials
    const credentials = JSON.parse(
      Buffer.from(GOOGLE_SERVICE_ACCOUNT_BASE64, "base64").toString("utf-8")
    );

    // Initialize Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Get current timestamp
    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Colombo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    // Prepare row data
    const rowData = [timestamp, name, contactNumber, email, city || ""];

    // Check if headers exist, if not add them
    try {
      const headerResponse = await sheets.spreadsheets.values.get({
        spreadsheetId: GOOGLE_SHEET_ID,
        range: "Sheet1!A1:E1",
      });

      if (!headerResponse.data.values || headerResponse.data.values.length === 0) {
        // Add headers if they don't exist
        await sheets.spreadsheets.values.update({
          spreadsheetId: GOOGLE_SHEET_ID,
          range: "Sheet1!A1:E1",
          valueInputOption: "RAW",
          requestBody: {
            values: [["Timestamp", "Name", "Contact Number", "Email", "City"]],
          },
        });
      }
    } catch (error) {
      console.error("Error checking/adding headers:", error);
    }

    // Append the data to the sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: "Sheet1!A:E",
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [rowData],
      },
    });

    console.log("Data appended successfully:", response.data);

    return NextResponse.json(
      {
        message: "Registration successful",
        data: {
          name,
          contactNumber,
          email,
          city,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving to Google Sheets:", error);
    return NextResponse.json(
      {
        message: "Failed to save registration",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
