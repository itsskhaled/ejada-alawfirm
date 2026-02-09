import { getRequestConfig } from "next-intl/server";

import ar from "../src/messages/ar.json";
import en from "../src/messages/en.json";

const locales = ["ar", "en"];
const messages = { ar, en };

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !locales.includes(locale)) locale = "ar";

  return {
    locale,
    messages: messages[locale],
  };
});
