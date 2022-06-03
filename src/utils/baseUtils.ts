export function removeExtraSpaces(text: string) {
    if (typeof text !== 'string') return;
    return text.replace(/\s+/g, ' ').trim();
  }