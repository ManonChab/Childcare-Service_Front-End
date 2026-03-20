import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Grid, MenuItem, Box, Tooltip, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function ColorSelect({ register }) {
  const { handleSubmit } = useForm();

  const colors = [
    { hex: "#FF0000", name: "Red" },
    { hex: "#00FF00", name: "Green" },
    { hex: "#0000FF", name: "Blue" },
    { hex: "#FFFF00", name: "Yellow" },
    { hex: "#00FFFF", name: "Cyan" },
    { hex: "#FF00FF", name: "Magenta" },
    { hex: "#000000", name: "Black" },
    { hex: "#FFFFFF", name: "White" },
    { hex: "#808080", name: "Gray" },
    { hex: "#FFA500", name: "Orange" },
    { hex: "#800080", name: "Purple" },
    { hex: "#FFC0CB", name: "Pink" },
    { hex: "#A52A2A", name: "Brown" },
    { hex: "#32CD32", name: "Lime Green" },
    { hex: "#000080", name: "Navy" },
    { hex: "#008080", name: "Teal" },
    { hex: "#808000", name: "Olive" },
    { hex: "#800000", name: "Maroon" },
    { hex: "#C0C0C0", name: "Silver" },
    { hex: "#FFD700", name: "Gold" },
  ];

  return (
    <Grid>
      <TextField
        select
        fullWidth
        label="Color"
        defaultValue="#FF0000"
        {...register("color", { required: true })}
      >
        {colors.map((color) => (
          <MenuItem key={color.hex} value={color.hex}>
            <Box
              component="span"
              sx={{
                display: "inline-block",
                width: 16,
                height: 16,
                backgroundColor: color.hex,
                marginRight: 1,
                border: "1px solid #ccc",
                verticalAlign: "middle",
              }}
            />
            {color.name}
          </MenuItem>
        ))}
      </TextField>
    </Grid>
  );
}