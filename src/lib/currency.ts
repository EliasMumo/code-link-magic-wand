// Comprehensive list of world currencies with their symbols
export interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
  prefix?: boolean; // If true, symbol goes before number (like KSh 1000)
}

export const WORLD_CURRENCIES: CurrencyInfo[] = [
  // Major currencies
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', prefix: true },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar' },

  // African currencies
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', prefix: true },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
  { code: 'GHS', symbol: '₵', name: 'Ghanaian Cedi' },
  { code: 'UGX', symbol: 'USh', name: 'Ugandan Shilling', prefix: true },
  { code: 'TZS', symbol: 'TSh', name: 'Tanzanian Shilling', prefix: true },
  { code: 'RWF', symbol: 'RF', name: 'Rwandan Franc', prefix: true },
  { code: 'ETB', symbol: 'Br', name: 'Ethiopian Birr', prefix: true },
  { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc', prefix: true },
  { code: 'XAF', symbol: 'FCFA', name: 'Central African CFA Franc', prefix: true },
  { code: 'MAD', symbol: 'MAD', name: 'Moroccan Dirham', prefix: true },
  { code: 'EGP', symbol: 'E£', name: 'Egyptian Pound' },

  // Middle Eastern currencies
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal' },
  { code: 'QAR', symbol: 'ر.ق', name: 'Qatari Riyal' },
  { code: 'ILS', symbol: '₪', name: 'Israeli Shekel' },
  { code: 'JOD', symbol: 'JD', name: 'Jordanian Dinar', prefix: true },
  { code: 'LBP', symbol: 'ل.ل', name: 'Lebanese Pound' },
  { code: 'KWD', symbol: 'د.ك', name: 'Kuwaiti Dinar' },
  { code: 'BHD', symbol: '.د.ب', name: 'Bahraini Dinar' },
  { code: 'OMR', symbol: 'ر.ع.', name: 'Omani Rial' },
  { code: 'IRR', symbol: '﷼', name: 'Iranian Rial' },

  // Asian currencies
  { code: 'THB', symbol: '฿', name: 'Thai Baht' },
  { code: 'VND', symbol: '₫', name: 'Vietnamese Dong' },
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', prefix: true },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', prefix: true },
  { code: 'PHP', symbol: '₱', name: 'Philippine Peso' },
  { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee' },
  { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka' },
  { code: 'LKR', symbol: 'Rs', name: 'Sri Lankan Rupee', prefix: true },
  { code: 'NPR', symbol: 'Rs', name: 'Nepalese Rupee', prefix: true },
  { code: 'MMK', symbol: 'K', name: 'Myanmar Kyat', prefix: true },
  { code: 'KHR', symbol: '៛', name: 'Cambodian Riel' },
  { code: 'LAK', symbol: '₭', name: 'Lao Kip' },

  // European currencies (non-Euro)
  { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone', prefix: true },
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona', prefix: true },
  { code: 'DKK', symbol: 'kr', name: 'Danish Krone', prefix: true },
  { code: 'PLN', symbol: 'zł', name: 'Polish Zloty' },
  { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna' },
  { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint' },
  { code: 'RON', symbol: 'lei', name: 'Romanian Leu', prefix: true },
  { code: 'BGN', symbol: 'лв', name: 'Bulgarian Lev' },
  { code: 'HRK', symbol: 'kn', name: 'Croatian Kuna', prefix: true },
  { code: 'RSD', symbol: 'din', name: 'Serbian Dinar', prefix: true },
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
  { code: 'UAH', symbol: '₴', name: 'Ukrainian Hryvnia' },
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },

  // South American currencies
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', prefix: true },
  { code: 'ARS', symbol: '$', name: 'Argentine Peso' },
  { code: 'CLP', symbol: '$', name: 'Chilean Peso' },
  { code: 'COP', symbol: '$', name: 'Colombian Peso' },
  { code: 'PEN', symbol: 'S/', name: 'Peruvian Sol', prefix: true },
  { code: 'UYU', symbol: '$', name: 'Uruguayan Peso' },
  { code: 'PYG', symbol: '₲', name: 'Paraguayan Guarani' },
  { code: 'BOB', symbol: 'Bs', name: 'Bolivian Boliviano', prefix: true },
  { code: 'VES', symbol: 'Bs.S', name: 'Venezuelan Bolívar', prefix: true },

  // North American currencies
  { code: 'MXN', symbol: '$', name: 'Mexican Peso' },
  { code: 'GTQ', symbol: 'Q', name: 'Guatemalan Quetzal', prefix: true },
  { code: 'HNL', symbol: 'L', name: 'Honduran Lempira', prefix: true },
  { code: 'NIO', symbol: 'C$', name: 'Nicaraguan Córdoba', prefix: true },
  { code: 'CRC', symbol: '₡', name: 'Costa Rican Colón' },
  { code: 'PAB', symbol: 'B/.', name: 'Panamanian Balboa', prefix: true },
  { code: 'DOP', symbol: 'RD$', name: 'Dominican Peso', prefix: true },
  { code: 'JMD', symbol: 'J$', name: 'Jamaican Dollar', prefix: true },

  // Oceania currencies
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', prefix: true },
  { code: 'FJD', symbol: 'FJ$', name: 'Fijian Dollar', prefix: true },
  { code: 'PGK', symbol: 'K', name: 'Papua New Guinea Kina', prefix: true },
  { code: 'WST', symbol: 'T', name: 'Samoan Tala', prefix: true },
  { code: 'TOP', symbol: 'T$', name: 'Tongan Paʻanga', prefix: true },

  // Other currencies
  { code: 'ISK', symbol: 'kr', name: 'Icelandic Króna', prefix: true },
  { code: 'AMD', symbol: '֏', name: 'Armenian Dram' },
  { code: 'GEL', symbol: '₾', name: 'Georgian Lari' },
  { code: 'AZN', symbol: '₼', name: 'Azerbaijani Manat' },
  { code: 'KZT', symbol: '₸', name: 'Kazakhstani Tenge' },
  { code: 'UZS', symbol: 'soʻm', name: 'Uzbekistani Som', prefix: true },
  { code: 'KGS', symbol: 'с', name: 'Kyrgyzstani Som' },
  { code: 'TJS', symbol: 'ЅМ', name: 'Tajikistani Somoni', prefix: true },
  { code: 'TMT', symbol: 'm', name: 'Turkmenistani Manat', prefix: true },
  { code: 'AFN', symbol: '؋', name: 'Afghan Afghani' },
  { code: 'BTC', symbol: '₿', name: 'Bitcoin' },
  { code: 'ETH', symbol: 'Ξ', name: 'Ethereum' },
];

export const getCurrencySymbol = (currency: string): string => {
  const currencyInfo = WORLD_CURRENCIES.find(c => c.code === currency);
  return currencyInfo?.symbol || currency;
};

export const getCurrencyInfo = (currency: string): CurrencyInfo | undefined => {
  return WORLD_CURRENCIES.find(c => c.code === currency);
};

export const formatPrice = (price: number, currency: string): string => {
  const currencyInfo = getCurrencyInfo(currency);
  const symbol = currencyInfo?.symbol || currency;
  const formattedPrice = price.toLocaleString();
  
  // Check if currency should be prefixed (like KSh 1000)
  if (currencyInfo?.prefix) {
    return `${symbol} ${formattedPrice}`;
  }
  
  // For most currencies, symbol comes before (like $1000)
  return `${symbol}${formattedPrice}`;
};