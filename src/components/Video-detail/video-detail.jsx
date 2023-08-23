import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiServise } from "../../service/api.service";
import { Avatar, Box, Chip, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import {
  CheckCircle,
  FavoriteBorderOutlined,
  MarkChatRead,
  Tag,
  Visibility,
} from "@mui/icons-material";
import { Loader, Videos } from "../";

const VideoDetail = () => {
  const { id } = useParams();
  const [videoDetail, setVideoDetail] = useState(null);
  const [relatedvideo, setRelatedvideo] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await ApiServise.fetching(
          `videos?part=snippet,statistics&id=${id}`
        );
        setVideoDetail(data?.items[0]);

        const relatedData = await ApiServise.fetching(`search?part=snippet`);
        setRelatedvideo(relatedData.items);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [id]);

  if (!videoDetail?.snippet) return <Loader />;
  return (
    <Box maxHeight={"70vh"} mb={10} mt={8}>
      <Box display={"flex"} sx={{ flexDirection: { xs: "column", md: "row" } }}>
        <Box width={{ xs: "100%", md: "75%" }} pl={2} pb={7}>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}`}
            className="react-player"
            controls
          />

          {videoDetail?.snippet?.tags?.map((item, idx) => {
            <Chip
              label={item}
              key={idx}
              sx={{ marginTop: "10px", cursor: "pointer", ml: "10px" }}
              deleteIcon={<Tag />}
              onDelete={() => {}}
              variant="outlined"
            />;
          })}

          <Typography variant="h5" fontWeight="botd" p={2}>
            {videoDetail?.snippet.title}
          </Typography>
          <Typography variant="subtitle2" sx={{ opacity: ".7" }} p={2}>
            {videoDetail?.snippet.localized.description}
          </Typography>
          <Stack
            direction={"row"}
            gap={"20px"}
            alignItems={"center"}
            py={1}
            px={2}
          >
            <Stack sx={{ opacity: 0.7 }} direction={"row"} gap={"3px"}>
              <Visibility />
              {parseInt(videoDetail?.statistics?.likeCount).toLocaleString()}
              likes
            </Stack>
            <Stack sx={{ opacity: 0.7 }} direction={"row"} gap={"3px"}>
              <FavoriteBorderOutlined />
              {parseInt(videoDetail?.statistics?.viewCount).toLocaleString()}
              views
            </Stack>
            <Stack sx={{ opacity: 0.7 }} direction={"row"} gap={"3px"}>
              <MarkChatRead />
              {parseInt(videoDetail?.statistics?.commentCount).toLocaleString()}
              comment
            </Stack>
          </Stack>
          <Stack direction={"row"} py={1} px={2}>
            <Link to={`/channel/${videoDetail?.snippet?.channelId}`}>
              <Stack
                direction={"row"}
                marginTop={"5px"}
                alignItems={"center"}
                gap={"5px"}
              >
                <Avatar src={videoDetail?.snippet?.thumbnails?.high?.url} />
                <Typography variant="subtitle2" sx={{ color: "gray" }}>
                  {videoDetail?.snippet?.channelTitle}
                  <CheckCircle sx={{ fontSize: "12px", ml: "5px" }} />
                </Typography>
              </Stack>
            </Link>
          </Stack>
        </Box>
        <Box
          width={{ xs: "100%", md: "25%" }}
          overflow={"scroll"}
          maxHeight={"200vh"}
        >
          <Videos videos={relatedvideo} />
        </Box>
      </Box>
    </Box>
  );
};

export default VideoDetail;
