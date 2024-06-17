import createMiddleware from "next-intl/middleware";
import { defaultLocale, localePrefix, locales } from "./const/intl";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix,
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
