import React from "react";
import apiService from "../apiService";

function DataTile(props: any) {
  //access to href
  console.log(props.dataFromApi);
  console.log(props.dataFromApi.data[0].nasa_id);

  const { title, nasa_id, location, media_type } = props.dataFromApi.data[0];

  const mediaApiCall = async (id: string) => {
    const mediaData = await apiService.getAssetMedia(id);
    console.log(mediaData);
  };

  mediaApiCall(nasa_id);

  return (
    <div>
      {media_type === "image" ? (
        <div>
          <h1>{title}</h1>
          <h2>{location}</h2>
          <p>I am an image</p>
        </div>
      ) : (
        <div>
          <h1>{title}</h1>
          <h2>{location}</h2>
          <p>I am not an image</p>
        </div>
      )}
    </div>
  );
}

export default DataTile;
