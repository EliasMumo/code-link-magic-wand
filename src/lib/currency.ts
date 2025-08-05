export const getCurrencySymbol = (currency: string): string => {
  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    CAD: '$',
    AUD: '$',
    JPY: '¥',
    CNY: '¥',
    INR: '₹',
    KES: 'KSh',
    NGN: '₦',
    ZAR: 'R',
    GHS: '₵'
  };
  
  return symbols[currency] || currency;
};

export const formatPrice = (price: number, currency: string): string => {
  const symbol = getCurrencySymbol(currency);
  
  // For currencies like KSh that should come before the number
  if (currency === 'KES') {
    return `${symbol} ${price.toLocaleString()}`;
  }
  
  // For most currencies, symbol comes before
  return `${symbol}${price.toLocaleString()}`;
};