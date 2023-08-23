import React, { useState, useEffect } from "react";
import { colors } from "../../constants/colors";
import { Stack, Box, Container, Typography } from "@mui/material";
import { Category, Videos } from "..";
import { ApiServise } from "../../service/api.service";

const Main = () => {
  const [selectedCategoty, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);

  const selectedCategotyHandler = (category) => setSelectedCategory(category);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await ApiServise.fetching(
          `search?part=snippet&q=${selectedCategoty}`
        );
        setVideos(data.items);
      } catch (error) {
        console.log(error);
      }
    };
    getData();

    // ApiServise.fetching("search").then((data) => setVideos(data));
  }, [selectedCategoty]);

  return (
    <Stack>
      <Category
        selectedCategotyHandler={selectedCategotyHandler}
        selectedCategoty={selectedCategoty}
      />
      <Box p={2} sx={{ height: "95vh" }}>
        <Container maxWidth={"100%"}>
          <Typography variant="h4" fontWeight={"bold"} mb={2}>
            {selectedCategoty}
            <span style={{ color: colors.secondary }}> videos</span>
          </Typography>
          <Videos pt={4} videos={videos} />
        </Container>
      </Box>
    </Stack>
  );
};

export default Main;
