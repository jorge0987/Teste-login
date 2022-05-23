import styled from "styled-components";
import React, { useState } from "react";

import api from "../../services/api";
import { Container, FormGroup, TextField, InputAdornment } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import ReCAPTCHA from "react-google-recaptcha";
import IconButton from "@mui/material/IconButton";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
  margin-bottom: 10%;
  width: 100%;
`;

const StyledSignIn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
`;

const DivRecaptcha = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verificarRobo, setVerificarRobo] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Campo Obrigatório"),
      email: Yup.string()
        .required("Campo Obrigatório")
        .email("E-mail inválido"),
      password: Yup.string()
        // .matches(
        //   /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]))/,
        //   'A senha deve conter ao menos uma letra minúscula, uma letra maiúscula e um número')
        .min(6, "A senha deve conter ao menos 6 caracteres")
        .required("Campo Obrigatório"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "As senhas devem ser iguais!")
        .required("Campo Obrigatório"),
    }),
    onSubmit: (values) => {
      request(values);
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
    // console.log(formik.errors.password);
  };

  function onChange(value) {
    // console.log("Captcha value:", value);
    setVerificarRobo(true);
  }

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //select

  async function request(values) {
    try {
      const response = await api.post("/user/cadaster", {
        name: values.username,
        password: values.password,
        email: values.email,
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <StyledSignIn>
      <Form>
        <Container style={{ maxWidth: 600 }}>
          <Title>One Blue APP</Title>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup></FormGroup>
            {/* ------------------------------------------------------------------- */}

            {/* {verificarRobo == true ? ( */}
            <Container>
              <FormGroup>
                <TextField
                  id="formGridName"
                  label="Nome de usuário"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  name="username"
                  placeholder="Nome de usuário"
                  type="text"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.username && formik.errors.username}
                  helperText={
                    formik.touched.username &&
                    formik.errors.username &&
                    formik.errors.username
                  }
                />
              </FormGroup>
              <br />
              <FormGroup>
                <TextField
                  id="formGridName"
                  label="Email"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  name="email"
                  placeholder="Endereço de e-mail"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && formik.errors.email}
                  helperText={
                    formik.touched.email &&
                    formik.errors.email &&
                    formik.errors.email
                  }
                />
              </FormGroup>
              <br />

              <FormGroup>
                <TextField
                  InputLabelProps={{
                    style: { pointerEvents: "auto" },
                    shrink: true,
                  }}
                  id="formGridResp"
                  label={<div>Senha</div>}
                  variant="outlined"
                  name="password"
                  placeholder="Senha"
                  type={showPassword ? "text" : "password"}
                  value={formik.values.password}
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
                        >
                          {showPassword}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={formik.touched.password && formik.errors.password}
                  helperText={
                    formik.touched.password &&
                    formik.errors.password &&
                    formik.errors.password
                  }
                />
              </FormGroup>
              <br />

              <FormGroup>
                <TextField
                  id="formGridResp"
                  label="Confirmar senha"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  name="confirmPassword"
                  placeholder="Senha"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showConfirmPassword}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                  helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                />
              </FormGroup>
              <br />

              {/* ------------------------------------------------------------------- */}
              <FormGroup>
                {/* <Button
              variant="contained"
              color="primary"
              type="submit"
              size="large"
            >
              {" "}
              Cadastrar{" "}
            </Button> */}
                {/* <Snackbar
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  open={openAccess}
                  autoHideDuration={2500}
                  onClose={handleClose}
                >
                  <Alert severity="success">
                    Cadastro efetuado com sucesso!
                  </Alert>
                </Snackbar>
               
                </Snackbar>
                <Snackbar
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  open={openRecaptch}
                  autoHideDuration={2500}
                  onClose={handleClose}
                >
                  <Alert severity="warning" onClose={handleClose}>
                    Verificação recaptch obrigatória!
                  </Alert>
                </Snackbar>
                <Snackbar
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  open={openError}
                  autoHideDuration={2500}
                  onClose={handleClose}
                >
                  <Alert severity="error" onClose={handleClose}>
                    O E-mail já está cadastrado no Sistema.
                  </Alert>
                </Snackbar> */}
              </FormGroup>

              <DivRecaptcha>
                {/* recaptcha ---------------------------------- */}
                <ReCAPTCHA
                  sitekey="6LdRp7AaAAAAAPZMYi9qSmXCJJMG0D1TH2URxPpj"
                  render="explicit"
                  // onloadCallback={loadRecapt}
                  hl="pt-BR"
                  onChange={onChange}
                />
              </DivRecaptcha>
              <br />

              <FormGroup>
                <Button
                  style={{ width: "100%" }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  size="large"
                >
                  {" "}
                  Cadastrar{" "}
                </Button>
              </FormGroup>
            </Container>

            <ButtonCadastrar>
              <span> Já possui uma conta? </span>
              <a
                href="/signin"
                color="primary"
                type="submit"
                size="large"
                text-decoretion="none"
              >
                Faça Login
              </a>
            </ButtonCadastrar>
          </form>

          {/* <Backdrop open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop> */}
        </Container>
      </Form>
    </StyledSignIn>
  );
};

export default SignUp;
