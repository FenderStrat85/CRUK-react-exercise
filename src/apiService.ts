import { IFormValues } from "./interfaces";

const apiService: { [key: string]: any } = {};

apiService.getData = (values: IFormValues) => {
  console.log(values);
  const { keywords, mediaType, yearStart } = values;
  return fetch(
    `https://images-api.nasa.gov/search?keywords=${keywords}&media_type=${mediaType}&year_start=${yearStart}`
  )
    .then((res) => res.json())
    .catch((err) => console.log("error", err));
};

apiService.getAssetMedia = (id: string) => {
  return fetch(`https://images-api.nasa.gov/asset/${id}`)
    .then((res) => res.json())
    .catch((err) => console.log("error", err));
};

export default apiService;
