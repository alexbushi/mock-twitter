import { Grid, GridItem } from "@chakra-ui/react";
import MenuList from "./components/MenuList";
import MainList from "./components/MainList";
import SearchList from "./components/SearchList";

function App() {
  return (
    <Grid templateColumns="repeat(3, 1fr)" padding={1}>
      <GridItem w="100%" paddingLeft={20}>
        <MenuList />
      </GridItem>
      <GridItem w="100%" borderX="1px" borderColor="gray.100">
        <MainList />
      </GridItem>
      <GridItem w="100%" paddingX={20}>
        <SearchList />
      </GridItem>
    </Grid>
  );
}

export default App;
