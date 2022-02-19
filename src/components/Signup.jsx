import {
  FormControl,
  FormLabel,
  Input,
  Button,
  InputRightElement,
  InputGroup
} from "@chakra-ui/react";
// import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  let init = { name: "", email: "", password: "" };
  const [form, setForm] = useState(init);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();

  const handleSubmit = () => {
    fetch("https://immense-spire-14125.herokuapp.com/signup", {
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
        navigate("/login");
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
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          id="name"
          type="name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <FormLabel htmlFor="email">Email address</FormLabel>
        <Input
          id="email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <FormLabel htmlFor="password">Password</FormLabel>
        {/* <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup> */}
        <Input
          id="password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <Button
          mt={4}
          colorScheme="teal"
          // isLoading={props.isSubmitting}
          type="submit"
          onClick={handleSubmit}
        >
          Signup
        </Button>
      </FormControl>
    </>
  );
};
