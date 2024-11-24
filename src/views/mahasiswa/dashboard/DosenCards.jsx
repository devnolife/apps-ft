"use client";

import { useState } from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import CustomAvatar from "@core/components/mui/Avatar";


const CardDosen = ({
  dataDosenProdi,
  dataPembimbingUjian,
  dataPembimbingKKP,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("Prodi");

  const getData = () => {
    switch (selectedCategory) {
      case "Prodi":
        return dataDosenProdi;
      case "Pembimbing Ujian":
        return dataPembimbingUjian;
      case "Pembimbing KKP":
        return dataPembimbingKKP;
      default:
        return [];
    }
  };

  return (
    <Card className="bs-full">
      <CardHeader
        title="Nama Dosen"
        action={
          <Select
            size="small"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "Select Category" }}
            sx={{
              padding: "2px 6px",
              minWidth: "170px",
            }}
          >
            <MenuItem value="Prodi">Prodi</MenuItem>
            <MenuItem value="Pembimbing Ujian">Pembimbing Ujian</MenuItem>
            <MenuItem value="Pembimbing KKP">Pembimbing KKP</MenuItem>
          </Select>
        }
      />
      <Divider />
      <CardContent
        className="flex flex-col gap-4"
        sx={{
          maxHeight: "300px",
          overflowY: "scroll",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {getData().map((item, i) => (
          <div key={i} className="flex items-center gap-4">
            <CustomAvatar size={34} src={item.avatar} />
            <div className="flex items-center justify-between gap-4 is-full">
              <div>
                <Typography className="font-medium" color="text.primary">
                  {item.name}
                </Typography>
                <Typography variant="body2">{item.profession}</Typography>
              </div>
              <Typography className="font-medium" color="text.primary">
                {item.id}
              </Typography>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CardDosen;
