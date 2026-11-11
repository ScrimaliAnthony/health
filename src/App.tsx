import { useState } from "react";
import connectGoogle from "./services/googleAuth";
import { readGoogleSheet,  writeGoogleSheet } from "./services/googleSheets";

function App() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  async function handleConnect() {
    try {
      const token = await connectGoogle();
      setAccessToken(token);
    } catch (error) {
      console.error("Erreur de connexion :", error);
    }
  }

  function handleRead() {
    if (!accessToken) return;

    readGoogleSheet(accessToken);
  }

  function handleWrite() {
    if (!accessToken) return;

    writeGoogleSheet(accessToken);
  }

  return (
    <>
      <h1>HEALTH</h1>

      <button onClick={handleConnect}>
        Se connecter avec Google
      </button>

      <button onClick={handleRead} disabled={!accessToken}>
        Lire Google Sheets
      </button>

      <button onClick={handleWrite} disabled={!accessToken}>
        Écrire dans Google Sheets
      </button>
    </>
  );
}

export default App;