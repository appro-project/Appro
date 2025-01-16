import React, { useState } from "react";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { axiosPostLogin } from "@/services/server-data";
import { CustomSnackbar } from "./custom-snackbar.component";

const Login: React.FC = () => {
  const [password, setPassword] = useState("");
  const [isWrongPass, setWrongPass] = useState(false);
  const redirectUrl = new URLSearchParams(location.search).get("redirect") || "/";

  const handlePasswordSubmit = async () => {
    try {
      const response = await axiosPostLogin(password);
      if (response.status === 200) {
        window.location.href = redirectUrl;
      } else {
        setWrongPass(true);
      }
    } catch (err: any) {
      setWrongPass(true);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Введите пароль
        </Typography>
        <TextField
          label="Пароль"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handlePasswordSubmit}
          fullWidth
        >
          Отправить
        </Button>
      </Box>

      <CustomSnackbar
        title={"Неверный пароль, попробуйте снова"}
        open={isWrongPass}
        severity="error"
        handleClose={() => setWrongPass(false)}
      />
    </Container>
  );
};

export default Login;