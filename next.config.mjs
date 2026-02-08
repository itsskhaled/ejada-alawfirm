import createNextIntlPlugin from "next-intl/plugin";

/** اربط next-intl مع ملف الكونفيغ تبعه */
const withNextIntl = createNextIntlPlugin("./i18n/request.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true
};

export default withNextIntl(nextConfig);
