import React, { FC } from "react";

function DataTile(data: any) {
  //access to href
  // console.log(data.data);

  //access to title etc
  // console.log(data.data.data[0].center);
  // console.log(data.data.links);
  //need to perform additional search to return full data from the api call
  //therefore will need to have another api call from this component.
  return (
    <div>
      <h1>{data.data.data[0].title}</h1>
      <h3>{data.data.data[0].center}</h3>
      <img src={data.data.links[0].href} />
    </div>
  );
}

export default DataTile;
