import { Grid, GridItem } from "@chakra-ui/react";
import MenuList from "./components/MenuList";

function App() {
  return (
    <Grid templateColumns="repeat(3, 1fr)" padding={1}>
      <GridItem w="100%">
        <MenuList />
      </GridItem>
      <GridItem w="100%" bg="blue.500">
        Main
      </GridItem>
      <GridItem w="100%" bg="yellow.500">
        Suggestions
      </GridItem>
    </Grid>
  );
}

export default App;
