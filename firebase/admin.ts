// Add a comment to indicate this file should only be used on the server
// This file should only be imported in server components or API routes
import * as admin from "firebase-admin";

// Define the service account credentials using the downloaded JSON file
const serviceAccount = {
  type: "service_account",
  project_id: "prepwise-e4127",
  private_key_id: "7dfc67731696ad70e8f90d7cb5a7750cf030819b",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDRcB2pRoEykImc\n9imzzVywqd8tZwoQg0kl9DnCtisGJ2ZS2jcFRzIyDVOBPEPWgAwt6o/Y256QueYc\nQeq5+hCp231ky8k+jDDS9/+j33kDypPCv+QZtUNIYsLJFMmymITdyR21xrCddkGn\ns6/c3EwUtNjFkY7S4ofj+CEbQOwM6Jboz+4UiGMmPId5H4lHro/IgvCGRS7H0yI1\nB0SL8JBSaUMZRlerPfmv1tZlX5D0s2HEpvWyre1Utmxo370MwQEJyNnWOAQHoliB\nxLHKZ6UcPm4Os/9iK+bzDoEto7zlar/zxEc3lUscGpkTnAU5G6wDny5i5ZOMc/vS\nRLkIejh3AgMBAAECggEABAxc9UTlQf6ZFu+LdT4zUvcpDbTUYsJTdtqPmLBpLTPr\nDDQ5LZxwn3JW7M2Ce5tNl9J5qlXJkX9OZrmSB02KnVgwtBduUecePjJIR+/W0eq6\nAyoKPjAc++YjF+Du6pJ8lCEv2ua2ytD2ATYQBRoYuhhOzcpE/GfWsr4GBl8M9ZaY\nr3kKI9lXxiINBpMrWNpgVQhfDMsC/Mpm3SiWPYY+Hi+YEx3K1RKS4pLTM7Pag+UC\nKpe1yD6pFN3Dy2XsbWFFti8Ypcm7jinBWpvEZtF+FQgO0nVbcwkC/nry1PqsVl/t\noRH2bxAKDUpTcXKmNDoSthFv6JLIyWMEUCImSoFB0QKBgQDsd/iuDIiuG53QNvOO\nrFfU95TKYquSJ0MaFP4sFwbeIyp1pAm6jipW8D9DxULhSc2FfaMP9GaNPealMIxw\n7SFufgWdk3n8GDhzk0VEi3xTrcxfeQb2oxtQvtfC/4Tb/l9aUiESBOdfys+uez9z\nl2CGTeIN7OXyglVQErqiUtAV5wKBgQDivJeVpteVKPfj8636vyKVO2culDx64By9\nOb1C7hiNIW6HZH2Q4sPR+ltTAYkIWQTwyH2qT2cb7/ScrUKpGBOyH6CnqgD0BZv3\nBFs47nPY9Eykkpu+3LxtI4ZCK+k7mceJ3OcFeLyPzpFIJioH8w7d6XFgx6yzcCfE\nh/kmf7ZW8QKBgQDIniwj9cxL8nAcQ1K1O7A0pWvdnIK1N4wtZ5wQaeTQt4MBVY9P\nb+ep5J+37naETioIVAPwuEf9EoRIp3yvHe+cH1zCSGlYoG/cVhiRQ8nR8ISQh0yK\nGO1GvvKspD3iqtfY+A7Ii9KEqbsy66t0dPxWVWMwr0iTS1H34jvnFV0nBwKBgQCJ\nYHMHvVsJiRUJDG/xaTVu7dsKoc4zNO60x/MgRlqhyAvMBNr/miXDZ8lFdbytTiJs\nMU3SjuGOT8kJ1QB6q5fjaL5SV/LT50IkXINY70FJxltZq2qqLdwM1GVYWnqqHfaE\nVU+0RP8asrHb4SO+RUpQskx7sv+0iNPPhAM1jFPSQQKBgQDjP0K2/y3ueo4DiUdx\nacV8zxAQeEhCrTUZdmXOeKxtzJ3ouO2f9ikYnk9scIGOkeVNAmcfYcqCHEdvWoaD\nkNUgFn7i9ojm5x0FotMscu6HNqjNnwBpJctOpsDJ+KmICCsG/a/ghGQ8h/c+piTm\nOjQqSpEBMTHf5/b31MF8fGz5OA==\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-fbsvc@prepwise-e4127.iam.gserviceaccount.com",
  client_id: "110463576855323884775",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40prepwise-e4127.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

// Simple initialization to avoid issues with Next.js
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      storageBucket: "prepwise-e4127.firebasestorage.app",
    });
    console.log("Firebase Admin initialized successfully");
  } catch (error) {
    console.error("Firebase admin initialization error:", error);
  }
}

// Export the admin instance
export const firebaseAdmin = admin;

// Export Firestore for easier access
export const db = admin.firestore();

// Export Auth for easier access
export const auth = admin.auth();

// Export Storage for easier access
export const storage = admin.storage();
