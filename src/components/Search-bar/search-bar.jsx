import React, { useState } from "react";
import { Paper, IconButton } from "@mui/material";
import { colors } from "../../constants/colors";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [value, setValue] = useState("");
  const navigatr = useNavigate();

  const submitHendler = (e) => {
    e.preventDefault();
    if (value) {
      navigatr(`/search/${value}`);
      setValue("");
    }
  };

  return (
    <Paper
      component={"form"}
      onSubmit={submitHendler}
      sx={{
        border: `1px solid ${colors.secondary}`,
        borderRadius: "25px",
        pl: 2,
        boxShadow: "none",
        ml: 2,
      }}
    >
      <input
        type="text"
        placeholder="Search..."
        className="cearch-bar"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <IconButton type="submit">
        <Search />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
