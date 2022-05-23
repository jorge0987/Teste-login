import React from "react";
import styled from "styled-components";
import api from "../../services/api";
import { FormGroup, TextField, InputAdornment } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import "./styles.css";

const StyledSignIn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
`;

const Bnts = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  justify-content: space-between;
`;

const ButtonCadastrar = styled(Button)`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  height: 50px;
  background-color: #00bcd4;
  color: #fff;
  font-size: 16px;
  text-transform: none !important;

  border-radius: 5px;
  border: none;

  &:hover {
    background-color: #00acc1;
  }
  a {
    text-decoration: none;
    margin-left: 4px;
  }
`;

const SignIn = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      senha: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Campo Obrigatório"),
      senha: Yup.string().required("Campo Obrigatório"),
    }),
    onSubmit: (values) => {
      request(values);
    },
  });

  async function request(values) {
    try {
      const response = await api.post("/login", {
        name: values.email,
        password: values.senha,
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <StyledSignIn>
      <h1>One Blue APP</h1>

      <FormGroup
        sx={{
          "& .MuiTextField-root": { m: 2, width: "30ch" },
        }}
      >
        <TextField
          id="formGridName"
          label="Email"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          name="email"
          placeholder="Endereço de e-mail"
          fullWidth="true"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email}
          helperText={
            formik.touched.email && formik.errors.email && formik.errors.email
          }
        />
      </FormGroup>

      <FormGroup
        sx={{
          "& .MuiTextField-root": { m: 2, width: "30ch" },
        }}
      >
        <TextField
          id="formGridResp"
          label="Senha"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          name="senha"
          placeholder="Senha"
          type={showPassword ? "text" : "password"}
          value={formik.values.senha}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                ></IconButton>
              </InputAdornment>
            ),
          }}
          error={formik.touched.senha && formik.errors.senha}
          helperText={
            formik.touched.senha && formik.errors.senha && formik.errors.senha
          }
        />
      </FormGroup>
      <Bnts>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          size="large"
          onClick={() => {
            request(formik.values);
          }}
        >
          {" "}
          Entrar{" "}
        </Button>
      </Bnts>
      <br />
      <br />
      <ButtonCadastrar>
        <span> Ainda não possui uma conta? </span>
        <a
          href="/signup"
          color="primary"
          type="submit"
          size="large"
          text-decoretion="none"
        >
          Cadastre-se
        </a>
      </ButtonCadastrar>

      {/* <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={3500}
        onClose={handleClose}
      >
        <Alert severity="error">
          Houve um problema com o login, verifique suas credenciais!
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={openAccess}
        autoHideDuration={4500}
        onClose={handleClose}
      >
        <Alert severity="success">Login efetuado com sucesso!</Alert>
      </Snackbar> */}

      {/* <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop> */}
    </StyledSignIn>
  );
};

export default SignIn;
