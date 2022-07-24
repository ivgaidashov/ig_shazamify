export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function removeHyphens(string) {
  return string.replaceAll("-", " ");
}

export function urldecode(str) {
  return decodeURIComponent((str + "").replace(/\+/g, "%20"));
}

export function capitalizeEveryWord(string) {
  const words = string.split(" ");

  return urldecode(
    words
      .map((word) => {
        return word[0].toUpperCase() + word.substring(1);
      })
      .join(" ")
  );
}

export function getShorter(string) {

  if (Array.isArray(string)) string = string.join("");
  
  if (string.length >= 30) string = string.substring(0, 30)+"...";

  return string;
}
