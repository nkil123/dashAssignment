import "./styles.css";
import {
  Table,
  Thead,
  Tbody,
  Button,
  Tr,
  Th,
  Td,
  Select,
  Box,
  HStack,
  Input,
  Stack,
  InputGroup,
  InputLeftElement
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import ReactPaginate from "react-paginate";
import "./styles.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
export const Home = () => {
  const [list, setList] = useState({ students: [], totalPages: 0 });
  // const url = useState(1);
  const [sval, setSort] = useState(1);
  const [page, setPage] = useState(1);
  const { search } = useLocation();

  const [searchName, setSearch] = useState("");
  const [check, setCheck] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // console.log("values", list.students, list);
  const query = new URLSearchParams(search);
  const q = query.getAll({});
  // console.log(query, q, "all", search);
  useEffect(() => {
    console.log("enterd");
    fetch(
      `http://localhost:4000/allStudents?page=${searchParams.get(
        "page"
      )}&&search=${searchParams.get("search")}&&sort=${searchParams.get(
        "sort"
      )}&&filter=${searchParams.get("filter")}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then((res) => res.json())
      .then((r) => {
        console.log(r, "result");
        setList(r);
      })
      .catch((e) => {
        console.log(e, "err");
      });
    setCheck(false);
  }, [check, page, searchParams, sval]);

  const handleClick = (data) => {
    // navigate(search);
    // console.log("hello", searchParams.get("search"));
    let s = searchParams.get("search");
    // setPage(Number(data.nextSelectedPage) + 1);
    setSearchParams({ page: Number(data.nextSelectedPage) + 1, search: s });
    // console.log(searchParams.get("search"), "search");
    // setSearchParams({ page: page });

    // console.log();
  };
  const handleSelect = (e) => {
    // console.log(searchParams.get("search"), "serach");
    let sort = searchParams.get("sort");
    let page = isNaN(searchParams.get("page")) ? 1 : searchParams.get("page");
    setSearchParams({ sort: sort, filter: e.target.value, page: page });
  };
  const handleChange = (e) => {
    // console.log(searchName);
    setSearch(e.target.value);
  };
  const handleSubmit = () => {
    // console.log(searchName, "name");
    setSearchParams({ search: searchName });
    setCheck(true);
  };

  const handleSort = () => {
    setSort(!sval);
    let filter = searchParams.get("filter");
    let page = isNaN(searchParams.get("page")) ? 1 : searchParams.get("page");
    console.log(searchParams.get("page"), "page");
    setSearchParams({ sort: sval, filter: filter, page: page });
  };

  // console.log(list, "list");
  return (
    <Box p="8" m="4">
      <Stack spacing={4}>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<FiSearch />} />
          <Input
            type="text"
            value={searchName}
            placeholder="Search student name"
            onChange={handleChange}
            mb="5"
          />
          <Button onClick={handleSubmit} bg="#9AD0EC">
            Search
          </Button>
        </InputGroup>
      </Stack>
      <Box mb="3" w="40%" m="auto">
        <Select placeholder="Filter By Gender" onClick={handleSelect}>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </Select>
      </Box>
      <Box>
        <Button onClick={handleSort} bg="#9AD0EC">
          Sort By Age
        </Button>
      </Box>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>NAME</Th>
            <Th>Gender</Th>

            <Th isNumeric>age</Th>
            <Th isNumeric>Total Tests Taken</Th>
          </Tr>
        </Thead>
        <Tbody>
          {list.students.map((e) => {
            // console.log(e, "e", e.testID);
            return (
              <>
                <Tr
                  onClick={() => {
                    console.log("clicked", e._id);
                    navigate(`/myStudent/*/${e._id}`);
                  }}
                >
                  <Td>{e.id}</Td>
                  <Td>{e.name}</Td>
                  <Td>{e.gender}</Td>
                  <Td isNumeric>{e.age}</Td>
                  <Td isNumeric>{e.testID.length}</Td>
                </Tr>
              </>
            );
          })}
        </Tbody>
      </Table>

      <HStack>
        <ReactPaginate
          pageCount={list.totalPages}
          className="pagination"
          onClick={handleClick}
        />
      </HStack>
    </Box>
  );
};
