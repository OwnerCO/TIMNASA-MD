const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0M5amQrVEZQNmpKc2ZnS2JlM2JOM2V3WkhQR3JOQVFFdi85YzNmYTdIdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUZrSzU1Q0NyT3BWU3RVSCtnM3JqYTJKTUhkS0diMnJyUU1qVmtXc3RtST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJQ1lkOTRDTG1LTWJSSGwxMnVFeFFNSnk3VzJmUzlGSGRmd0RvREVtN0ZJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJUOFQrcVYwK0hjWWp0azdhUDhFK0ZPZDhQZDJPUXY3VnJRVitiaEQxdTJZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVEbmpmU1hHdVZ6MnJ6aThqMTREWDJPOG90TjcyWEEyNnEwWTJIN2tMblU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdNZWt1OEtsTEl4bXRFWSs0S3FER2UzMTl4NzRSbzRRZXFWcWgxRXkwUU09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0IvbW5pajVSS3ZUcjE4STlhem9uRGF2c09mYkhkZ3RUSlR3WmNkSkJtMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVDhyS3gzR2hjN3pDZlk4UFhwVFJsb0hhUzdmUHppMGRHc1JmSm5yZ2lqST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikpsck1CY29uR0VMSHRPTkxHYVZCK0gwSFVFWGRlUE5Ua0pmWEs2Y2YyMElGSDM3aE9GNlpkVEcvTWRnRk44dFpscjJPbGx3VlBCRzJDckpiSFg1RmpnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQ3LCJhZHZTZWNyZXRLZXkiOiJiUk15YTZra3VOV2ZHNngvSUNXTFhldU9oSXVTNUZmZUp1SzlEcU9BZXV3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjUxOTc4MTk0OTMzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjRDQjIwNjZBRTUxRjdFQUMwMjM5MkYxOTgxMzhGMkM1In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MzM3ODU4Mjd9LHsia2V5Ijp7InJlbW90ZUppZCI6IjUxOTc4MTk0OTMzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkRCRUQzQTREN0FGNzc2OURFQzk3QkNCRjVDN0NENEY5In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MzM3ODU4Mjd9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImNIVTY4MUk2UWFDN3BnYW5jRFNEZVEiLCJwaG9uZUlkIjoiN2ZlZTI1ZWMtYzdmMS00MmQxLWIxZjctYWRhNzMwNWRiOWQ2IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJxOHhHSkVwNDhkaFEwdGFjUDVjb3laZmVSbz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4bnE3aWdwTldDY3lvNHJzaFFKM2p0cHAzbjA9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRzQ5UVZIQksiLCJtZSI6eyJpZCI6IjUxOTc4MTk0OTMzOjM4QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IlN5c3NvbHV0aW9ucyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTnFRbHZVR0VOWHgzYm9HR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiejRuUVJmTEZiSFpRanNWU0FhVG5FejJ6RDFuWis4OStEY3dPTzVwTzVSZz0iLCJhY2NvdW50U2lnbmF0dXJlIjoibWVqaGZBY2hQZFp3eGQwK0w2NXNzbmpZbCtlSkNpTFhueWQrdjF4SFJDY3lzYkhMTW51QUprNzRlODVlaE9acStFMUhVS2xNa2ROeFNkbGxlME5TQmc9PSIsImRldmljZVNpZ25hdHVyZSI6InBVM0VYbTVjbkk2MmgySmtOYi9iV0txRDNxUEtyeEMvRGpPamk4Tm1LcDd5bngzMitKbS9aMmFOUFl1WElGclIxeUNpbHQ4SC8vSSsyazFUUVFjemlRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNTE5NzgxOTQ5MzM6MzhAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYytKMEVYeXhXeDJVSTdGVWdHazV4TTlzdzlaMmZ2UGZnM01EanVhVHVVWSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczMzc4NTgyNSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFQNUIifQ==',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "@CyberPsycho",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "51978194933",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'yes',
    BOT : process.env.BOT_NAME || 'CYBER MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/347ba7a613b4d025b89a8.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
