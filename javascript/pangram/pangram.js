//
// This is only a SKELETON file for the 'Pangram' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const isPangram = (str) => {
  const charHash = new Map();
  str = str.toLowerCase();
  for(let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    if(charCode >= 97 && charCode <= 122) {
      charHash.set(str.charAt(i), true);
    }
  }
  return charHash.size === 26;
};
