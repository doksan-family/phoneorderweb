export function isExternalHref(href: string) {
  return href.startsWith("//") || /^[a-z][a-z\d+.-]*:/i.test(href);
}
