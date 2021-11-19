import React, { useState, useEffect } from "react";
import apiService from "../apiService";
import { Button } from "@cruk/cruk-react-components";
import styled from "styled-components";

const Tile = styled.div`
  background: linear-gradient(to right, #00b6ed, #0083b0);
  /* background: linear-gradient(to right, #00b4db, ); */
  border-radius: 10px;
  padding: 0 10px 10px 10px;
  margin: 20px 100px;
  box-shadow: 0px 2px 6px 2px rgba(0.2, 0.2, 0.2, 0.4);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
`;

const InfoAndImageContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const TextBox = styled.div`
  padding: 0 40px;
  margin-right: 20px;
  border: solid 1px #090909ad;
  border-radius: 10px;
  box-shadow: 0px 2px 6px 2px rgba(0.2, 0.2, 0.2, 0.4);
  background-color: #f0ededf8;
  line-height: 1.5;
`;

const Img = styled.img`
  height: 300px;
  width: 450px;
  border-radius: 10px;
  box-shadow: 0px 2px 6px 2px rgba(0.2, 0.2, 0.2, 0.4);
`;

function DataTile(props: any) {
  const [mediaData, setMediaData] = useState("");
  const [message, setMessage] = useState("");

  const { title, nasa_id, location, media_type, description } =
    props.dataFromApi.data[0];
  console.log(props.dataFromApi);

  const mediaApiCall = async (id: string) => {
    const assetMedia = await apiService.getAssetMedia(id);
    console.log(assetMedia);
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
  });

  return (
    <Tile>
      {media_type === "image" ? (
        <Container>
          <h1>Title: {title}</h1>
          <h2>Location: {location}</h2>
          <InfoAndImageContainer>
            <TextBox>
              <p>{description}</p>
            </TextBox>
            {mediaData ? <Img src={mediaData} alt={description} /> : null}
          </InfoAndImageContainer>
        </Container>
      ) : (
        <Container>
          <h1>Title: {title}</h1>
          {mediaData ? <Button href={mediaData}>{message}</Button> : null}
        </Container>
      )}
    </Tile>
  );
}

export default DataTile;
