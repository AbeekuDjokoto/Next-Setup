import React from 'react';

import countriesData from '@/data/countries.json';
function useCountriesData() {
  const getAllCountriesData = () => {
    const formattedData = countriesData.map(
      (country: { name: { common: any }; idd: any; flags: { svg: any } }) => ({
        label: country.name.common,
        code:
          country.name.common === 'Antarctica' ||
          country.name.common === 'Heard Island and McDonald Islands'
            ? '+672'
            : country?.idd?.root + '' + country?.idd?.suffixes[0],
        image: country.flags.svg,
      }),
    );

    return formattedData;
  };

  const countries = React.useMemo(() => {
    const data = getAllCountriesData();
    return data;
  }, []);

  return { countries };
}

export { useCountriesData };
