import {
  Autocomplete,
  Container,
  Divider,
  IconButton,
  InputBase,
  Paper,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";

function Search() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm();

  const theme = useTheme();

  const onSubmit = (data) => {
    router.push(`?search=${data.search}`);
    reset();
  };

  return (
    <Container maxWidth="sm">
      <Paper
        component="form"
        variant="outlined"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          borderColor: theme.palette.primary.main,
        }}
      >
        <InputBase
          {...register("search", { required: true })}
          placeholder="Search"
          autoFocus
          sx={{
            px: 1,
            width: "100%",
          }}
        />

        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton type="submit" color="primary" aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </Container>
  );
}

export default Search;
