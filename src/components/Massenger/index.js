import React, { useEffect, useState } from "react";
import Desktop from './Desktop'
import Mobile from './Mobile'
import useMediaQuery from "../../Hook/useMediaQuery";
function Index() {
  const desktop = useMediaQuery("(min-width: 700px)");
  const [page, setPage] = useState("main");
  useEffect(() => {
    const resPage = () => {
      desktop ? setPage("main") : setPage("mobile");
    };
    resPage();
  }, [desktop]);
  if (page === "main") {
    return <Desktop />;
  } else {
    return <Mobile />;
  }
}

export default Index;
