import countries from 'world-countries';

export const countryList = countries
  .map(c => ({
    name: c.name.common,
    code: c.cca2,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export const getCountryName = (code: string) => {
  const country = countryList.find(c => c.code === code);
  return country ? country.name : code;
};
