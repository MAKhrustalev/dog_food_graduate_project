import { createContext } from "react";

const Ctx = createContext({
  searchResult: "", // необязательное описание типа данных для дальнейшей передачи (подсказки)
  setBaseData: () => {},
});

export default Ctx;
