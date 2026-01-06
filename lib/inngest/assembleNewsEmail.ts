// lib/inngest/assembleNewsEmail.ts

export function assembleNewsContent({
  userSymbols,
  sectionMap,
  fallbackSection,
}: {
  userSymbols: string[];
  sectionMap: Record<string, string>;
  fallbackSection: string;
}) {
  const sections: string[] = [];

  for (const symbol of userSymbols) {
    if (sectionMap[symbol]) {
      sections.push(sectionMap[symbol]);
    }
  }

  if (sections.length === 0) {
    sections.push(fallbackSection);
  }

  return sections.join("\n");
}