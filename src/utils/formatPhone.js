export default function formatPhone(str) {
  if (!str.length) return str;

  const digitsOnly = str.replace(/\D/g, "");

  if (!["7", "8", "9"].includes(digitsOnly[0])) return `+${digitsOnly}`;

  const data = digitsOnly[0] === "9" ? digitsOnly : digitsOnly.slice(1);
  let result = digitsOnly[0] === "8" ? "8" : "+7";

  if (!data.length) return result;

  result += ` (${data.slice(0, 3)}`;

  if (data.length < 4) return result;

  result += `) ${data.slice(3, 6)}`;

  if (data.length < 7) return result;

  result += ` ${data.slice(6, 8)}`;

  if (data.length < 8) return result;

  result += `-${data.slice(8, 10)}`;

  return result;
}
