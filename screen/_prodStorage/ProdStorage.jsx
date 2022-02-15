import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProds } from "./reducer/ProdStorageSlice";
import { Box, CircularProgress, Dialog, Typography } from "@mui/material";

export default function ProdStorage() {
  const dispatch = useDispatch();
  const getStatus = useSelector((state) => state.prodStorage.getStatus);
  const isLogin = useSelector((state) => state.auth.isLogin);

  useEffect(() => {
    isLogin && dispatch(fetchProds());
  }, [dispatch, isLogin]);

  return (
    <>
      <Dialog open={Boolean(getStatus === "loading")}>
        <Box
          sx={{
            display: "flex",
            height: 100,
            width: 300,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
          <Typography sx={{ ml: 2 }} variant="h6" color="custom.primary">
            System Loading...
          </Typography>
        </Box>
      </Dialog>
    </>
  );
}
