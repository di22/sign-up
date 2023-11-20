
// this function to check if all or some of the letters of the first string exist in the second one or not
export function  lettersExistRegex(firstString: string, secondString: string, all: boolean = true): boolean {
  firstString = firstString.toLowerCase();
  secondString = secondString.toLowerCase();

  const pattern = new RegExp(`[${firstString}]`, 'g');
  const matches = secondString.match(pattern);

  if (!matches) {
    return false;
  }

  const firstStringChars = firstString.split('');

  if (all) {
    return firstStringChars.every(char => matches.includes(char));
  } else {
    return firstStringChars.some(char => matches.includes(char));
  }
}
