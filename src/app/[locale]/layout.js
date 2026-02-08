import {NextIntlClientProvider} from "next-intl";
import {notFound} from "next/navigation";
import {setRequestLocale, getMessages} from "next-intl/server";

const locales = ["ar", "en"];

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({children, params}) {
  const {locale} = await params;

  if (!locale || !locales.includes(locale)) notFound();

  await setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
