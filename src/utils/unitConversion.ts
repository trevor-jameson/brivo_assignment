export function convertCelciusToFahrenheit(tempInFah: number): number {
  return (tempInFah - 32) * (5 / 9);
}

export function convertFahrenheitToCelcius(tempInCel: number): number {
  return (tempInCel * (9 / 5)) + 32;
}