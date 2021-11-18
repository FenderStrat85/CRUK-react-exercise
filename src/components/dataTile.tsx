import React, { useState, useEffect } from "react";
import apiService from "../apiService";

function DataTile(props: any) {
  // //access to href
  // console.log(props.dataFromApi);
  // console.log(props.dataFromApi.data[0].nasa_id);
  const [mediaData, setMediaData] = useState<string>("");
  const [message, setMessage] = useState("");

  const { title, nasa_id, location, media_type, description } =
    props.dataFromApi.data[0];

  const mediaApiCall = async (id: string) => {
    const assetMedia = await apiService.getAssetMedia(id);
    console.log(assetMedia.collection.items[0].href);
    setMediaData(assetMedia.collection.items[0].href);
    if (media_type === "video") {
      setMessage("Click to watch the video!");
    }
    if (media_type === "audio") {
      setMessage("Click to listen to the audio!");
    }
  };

  useEffect(() => {
    mediaApiCall(nasa_id);
  }, []);

  return (
    <div>
      {media_type === "image" ? (
        <div>
          <h1>{title}</h1>
          <h2>{location}</h2>
          <p>{description}</p>
          {mediaData ? <img src={mediaData} /> : null}
        </div>
      ) : (
        <div>
          <h1>{title}</h1>
          <h2>{location}</h2>
          {mediaData ? <a href={mediaData}>{message}</a> : null}
        </div>
      )}
    </div>
  );
}

export default DataTile;
