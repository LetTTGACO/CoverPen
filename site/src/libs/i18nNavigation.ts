import { localePrefix, locales } from "@/const/intl";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const { Link, usePathname, useRouter } = createSharedPathnamesNavigation({
  locales: locales,
  localePrefix: localePrefix,
});
