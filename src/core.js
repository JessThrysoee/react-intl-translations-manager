import { getDefaultMessages } from "./getDefaultMessages";
import { getLanguageReport } from "./getLanguageReport";

function core(languages, hooks) {
  const {
    provideExtractedMessages,
    outputSingleFile,
    outputDuplicateKeys,
    beforeReporting,
    provideLangTemplate,
    provideTranslationsFile,
    provideWhitelistFile,
    reportLanguage,
    afterReporting,
  } = hooks;

  const extractedMessages = provideExtractedMessages();

  if (typeof outputSingleFile === "function") {
    outputSingleFile(extractedMessages);
  }

  const defaultMessages = getDefaultMessages(extractedMessages);

  if (typeof outputDuplicateKeys === "function") {
    outputDuplicateKeys(defaultMessages.duplicateIds);
  }

  if (typeof beforeReporting === "function") beforeReporting();

  for (const lang of languages) {
    const langResults = provideLangTemplate(lang);

    const file = provideTranslationsFile(langResults);
    const whitelistFile = provideWhitelistFile(langResults);

    if (!file) langResults.noTranslationFile = true;
    if (!whitelistFile) langResults.noWhitelistFile = true;

    langResults.report = getLanguageReport(defaultMessages.messages, file, whitelistFile);

    if (typeof reportLanguage === "function") reportLanguage(langResults);
  }

  if (typeof afterReporting === "function") afterReporting();
}

export { core };
