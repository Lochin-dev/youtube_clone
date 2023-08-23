import { Stack } from "@mui/material";
import { category } from "../../constants";
import { colors } from "../../constants/colors";

const Category = ({ selectedCategotyHandler, selectedCategoty }) => {
  return (
    <Stack
      direction={"row"}
      sx={{
        mt: 6,
        overflowX: "scroll",
        position: "fixed",
        top: "0px",
        zIndex: 99,
      }}
    >
      {category.map((item) => (
        <button
          key={item.name}
          className="category-btn"
          style={{
            borderRadius: "0",
            background: item.name === selectedCategoty && colors.secondary,
            color: item.name === selectedCategoty && "#fff",
          }}
          onClick={() => selectedCategotyHandler(item.name)}
        >
          <span
            style={{
              color: item.name === selectedCategoty ? "#fff" : colors.secondary,
              marginRight: "15px",
            }}
          >
            {<item.icon />}
          </span>
          <span style={{ opacity: "1" }}>{item.name}</span>
        </button>
      ))}
    </Stack>
  );
};

export default Category;
