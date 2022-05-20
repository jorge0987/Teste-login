import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Button,
  FormGroup,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from "@material-ui/core";
import api from "../services/api";
import { useFormik } from "formik";
import { makeStyles } from "@material-ui/core/styles";

import * as Yup from "yup";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
    },
    maxWidth: "400px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    "@media (max-width: 500px)": {
      width: "inherit",
      margin: 0,
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },

  bnt: {
    "& > *": {
      margin: theme.spacing(2),
    },
    width: "auto",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    margin: "0 33%",
    height: "35px",
  },

  img: {
    marginTop: "150px",
    "@media (max-width: 500px)": {
      marginTop: "75px",
    },
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [openAccess, setOpenAccess] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const classes = useStyles();
  // const [tipo, setTipo] = React.useState(null);
  let history = useNavigate();

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

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  async function request(values) {
    try {




    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <form className={classes.root} onSubmit={formik.handleSubmit}>
          <Typography
            style={{ marginBottom: 0 }}
            variant="h6"
            align="center"
            gutterBottom
          ></Typography>
          <img alt="Logo" className={classes.img} src={logo1} />
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

          <FormGroup>
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
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={formik.touched.senha && formik.errors.senha}
              helperText={
                formik.touched.senha &&
                formik.errors.senha &&
                formik.errors.senha
              }
            />
          </FormGroup>

          <FormGroup>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              size="large"
            >
              {" "}
              Entrar{" "}
            </Button>
            <Snackbar
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
            </Snackbar>
          </FormGroup>
        </form>

        <Button href="/signup" color="primary" classes={classes.bnt}>
          {" "}
          Criar Usuário{" "}
        </Button>
        <div className={classes.bnt}>
          {" "}
          <Email />{" "}
        </div>
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Container>
    </div>
  );
};

export default SignIn;
