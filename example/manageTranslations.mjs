import manageTranslations from "react-intl-translations-manager";

manageTranslations({
  messagesDirectory: "./src/locales/extractedMessages",
  translationsDirectory: "./src/locales/lang/",
  whitelistsDirectory: "./src/locales/whitelists/",
  languages: ["nl"],
  readFormatJsDefaultFormat: true,
});
