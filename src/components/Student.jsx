import { Box, Heading, Text, Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export const Student = () => {
  const { id } = useParams();
  console.log("id", id);
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:4000/myStudent/*/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((r) => {
        console.log(r, "result");
        setData(r.student);
      })
      .catch((e) => {
        console.log("error", e);
      });
  }, []);
  console.log(data, "data");
  console.log(data, "data", data);
  return (
    <>
      {data ? (
        <Box>
          <Heading>Name: {data.name}</Heading>
          <Heading>Gender: {data.gender}</Heading>
          <Heading>Grade: {data.grade}</Heading>
          <Heading>age: {data.age}</Heading>
          {/* <Heading>Gender:{data.gender}</Heading>
          <Heading>Gender:{data.gender}</Heading> */}
          <Grid templateColumns="repeat(3, 1fr)" gap={6} mt="10">
            {data.testID.map((e) => {
              return (
                <>
                  <Box bg="#F1E0AC" borderRadius="15" m="2">
                    <Heading>{e.name}</Heading>
                    <Text fontSize="xl">Subject:{e.subject}</Text>
                    <Text fontSize="xl">Marks: {"   " + e.marks}</Text>
                    <Text fontSize="xl">Date: {e.date}</Text>
                  </Box>
                </>
              );
            })}
          </Grid>
        </Box>
      ) : (
        <Heading>Student Data not exiset</Heading>
      )}
    </>
  );
};
