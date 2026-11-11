export default function connectGoogle(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!window.google?.accounts?.oauth2) {
      reject(new Error("Google Identity Services n'est pas chargé"));
      return;
    }

    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      scope: "https://www.googleapis.com/auth/spreadsheets",

      callback: (response) => {
        if (response.error) {
          reject(new Error(response.error));
          return;
        }

        resolve(response.access_token);
      },

      error_callback: (error) => {
        reject(new Error(error.type));
      },
    });

    client.requestAccessToken();
  });
}