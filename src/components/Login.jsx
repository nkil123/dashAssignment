import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../redux/actions/userAction";

export const Login = () => {
  let init = { email: "", password: "" };
  const [form, setForm] = useState(init);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = () => {
    fetch("https://immense-spire-14125.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })
      .then((r) => {
        return r.json();
      })
      .then((res) => {
        console.log("res", res);
        if (res.msg === "invalid credentials") {
          alert("invalid cred");
        } else {
          localStorage.setItem("token", JSON.stringify(res.token));
          dispatch(saveUser({ token: res.token, user: res.user }));
          navigate("/");
        }
      })
      .catch((e) => {
        console.log(e, "error");
      });
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setForm({ ...form, [name]: value });
  };

  return (
    <>
      <FormControl w="30%" m="auto" bg="#FFAD60" p="4" mt="9" borderRadius="15">
        <FormLabel htmlFor="email">Email address</FormLabel>
        <Input
          id="email"
          type="email"
          name="email"
          value={form.value}
          onChange={handleChange}
        />
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          id="password"
          type="password"
          name="password"
          value={form.value}
          onChange={handleChange}
        />
        <Button
          mt={4}
          colorScheme="teal"
          // isLoading={props.isSubmitting}
          type="submit"
          onClick={handleSubmit}
        >
          Login
        </Button>
      </FormControl>
    </>
  );
};
