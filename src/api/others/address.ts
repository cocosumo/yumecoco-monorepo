

export const getPrefectures = async (area?: string) => {

  return kintone.proxy(`http://geoapi.heartrails.com/api/json?method=getPrefectures${area ? `&area=${area}` : ''}`, 'GET', {}, {})
    .then(([body]: any[]) => {
      const {
        response: {
          prefecture,
        },
      } : {
        response: {
          prefecture: string[]
        }
      } = JSON.parse(body as string);

      return prefecture;
    });
};


interface GetCitiesResp {
  response: {
    location: {
      city: string,
      city_kana: string,
    }[]
  }
}

export type GetCitiesRespLocation = GetCitiesResp['response']['location'];

export const getCities = async (params : {
  area?: string,
  prefecture?: string,
}) : Promise<GetCitiesRespLocation> => {

  const { prefecture } = params;
  return kintone.proxy(`http://geoapi.heartrails.com/api/json?method=getCities${prefecture ? `&prefecture=${prefecture}` : ''}`, 'GET', {}, {})
    .then(([body]: any[]) => {

      const {
        response: {
          location,
        },
      } : GetCitiesResp = JSON.parse(body as string);

      return location;
    });
};


interface GetTownsResp {
  response: {
    location: {
      city: string,
      city_kana: string,
      town: string,
      town_kana: string,
      postal: string,
    }[]
  }
}

export type GetTownsResponseLocation = GetTownsResp['response']['location'];

export const getTowns = async (params : {
  city?: string,
  prefecture?: string,
}) : Promise<GetTownsResp['response']['location']>  => {

  const { city } = params;
  return kintone.proxy(`http://geoapi.heartrails.com/api/json?method=getTowns${city ? `&city=${city}` : ''}`, 'GET', {}, {})
    .then(([body]: any[]) => {

      const {
        response: {
          location,
        },
      } :GetTownsResp = JSON.parse(body as string);

      return location;
    });
};

export const getAreas = async () => {

  return kintone.proxy('http://geoapi.heartrails.com/api/json?method=getAreas', 'GET', {}, {})
    .then(([body]: any[]) => {
      const {
        response: {
          area,
        },
      } : {
        response: {
          area: string[]
        }
      } = JSON.parse(body as string);

      return area;
    });
};