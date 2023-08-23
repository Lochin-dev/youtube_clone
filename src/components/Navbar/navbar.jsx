import React from "react";
import { Link } from "react-router-dom";
import { Stack, Box } from "@mui/material";
import { Logo } from "../../constants";
import { colors } from "../../constants/colors";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { SearchBar } from "..";

const Navbar = () => {
  return (
    <Stack
      className="nav_stack"
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      px={2}
      py={1}
      sx={{
        position: "fixed",
        top: 0,
        zIndex: 999,
        background: colors.primary,
      }}
    >
      <Link to={"/"}>
        <img src={Logo} alt="logo" width={"150px"} />
      </Link>
      <SearchBar />
      <AccountCircleIcon
        sx={{
          fontSize: "40px",
          position: "absolute",
          right: "20px",
          cursor: "pointer",
        }}
      />
      <Box />
    </Stack>
  );
};

export default Navbar;
