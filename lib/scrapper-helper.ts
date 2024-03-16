export const extractPriceNumber = (price: string): number => {
  return parseFloat(price.replace(/[^0-9.-]+/g, ''))
}
