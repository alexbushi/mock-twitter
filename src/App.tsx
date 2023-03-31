import { Grid, GridItem } from "@chakra-ui/react";

function App() {
  return (
    <Grid templateColumns="repeat(3, 1fr)" padding={1}>
      <GridItem w="100%" h="10" bg="green.500">
        Menu
      </GridItem>
      <GridItem w="100%" h="10" bg="blue.500">
        Main
      </GridItem>
      <GridItem w="100%" h="10" bg="yellow.500">
        Suggestions
      </GridItem>
    </Grid>
  );
}

export default App;
