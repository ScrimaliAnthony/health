export async function readGoogleSheet(accessToken: string) {
  const spreadsheetId = import.meta.env.VITE_GOOGLE_SPREADSHEET_ID;
  const range = "A1:D10";

  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const data = await response.json();

    console.log("Données Google Sheets :", data);
  } catch (error) {
    console.error("Erreur de lecture :", error);
  }
}

export async function writeGoogleSheet(accessToken: string) {
  const spreadsheetId = import.meta.env.VITE_GOOGLE_SPREADSHEET_ID;
  const range = encodeURIComponent("'Feuille 1'!A:D");

  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append` +
    "?valueInputOption=RAW&insertDataOption=INSERT_ROWS";

  const values = [
    ["2026-11-09", 82.5, "Test depuis React", "Question de test"],
  ];

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        majorDimension: "ROWS",
        values,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Erreur Google Sheets :", error);
      return;
    }

    const data = await response.json();
    console.log("Écriture réussie :", data);
  } catch (error) {
    console.error("Erreur d'écriture :", error);
  }
}