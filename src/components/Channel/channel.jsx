import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { ApiServise } from "../../service/api.service";
import { ChannelCard, Videos } from "../";
const Channel = () => {
  const { id } = useParams();
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const dataChannelDetail = await ApiServise.fetching(
          `channels?part=snippet&id=${id}`
        );
        setChannelDetail(dataChannelDetail.items[0]);
        const dataVideos = await ApiServise.fetching(
          `search?channelId=${id}&part=snippet%2Cid&order=date`
        );
        setVideos(dataVideos?.items);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [id]);

  console.log(videos);

  return (
    <Box minHeight={"95vh"} mt={8}>
      <Box>
        <Box
          width={"100%"}
          height={"200px"}
          zIndex={10}
          sx={{
            backgroundImage: `url(${channelDetail?.brandingSettings?.image?.bannerExternalUrl})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            objectFit: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></Box>
        <ChannelCard video={channelDetail} marginTop={"-100px"} />
      </Box>
      <Container width={"90%"}>{<Videos videos={videos} />}</Container>
    </Box>
  );
};

export default Channel;
