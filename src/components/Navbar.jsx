import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spacer
} from "@chakra-ui/react";
import { useState } from "react";
// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { delUser } from "../redux/actions/userAction";

export const Navbar = () => {
  const token = useSelector((store) => store.user.token);
  const dispatch = useDispatch();

  // console.log(user, "store");
  // let token = JSON.parse(localStorage.getItem("token"));
  const handleLogout = () => {
    localStorage.setItem("token", JSON.stringify(null));
    dispatch(delUser({ token: null }));

    // setToken(null);
  };
  // let token = null;
  return (
    <>
      {token ? (
        <Box m="auto" p="4" bg="#C1F4C5" w={"100%"}>
          <Flex>
            <Box p="2">
              <Heading size="md">
                <Link to="/">Dashboard</Link>
              </Heading>
            </Box>
            <Spacer />
            <Box>
              <Button colorScheme="teal" mr="4" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          </Flex>
        </Box>
      ) : (
        <Box m="auto" p="4" bg="#C1F4C5" w={"100%"}>
          <Flex>
            <Box p="2">
              <Heading size="md">
                <Link to="/login">Dashboard</Link>
              </Heading>
            </Box>
            <Spacer />
            <Box>
              <Link to="/signup">
                {" "}
                <Button colorScheme="teal" mr="4">
                  Sign up
                </Button>
              </Link>
              <Button colorScheme="teal" mr="4">
                <Link to="/login">Login</Link>
              </Button>
            </Box>
          </Flex>
        </Box>
      )}
    </>
  );
};
