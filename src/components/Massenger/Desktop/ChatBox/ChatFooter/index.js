import { Telegram } from "@mui/icons-material";
import { Container, Grid } from "@mui/material";
import React, {  useState } from "react";
// import useWidthDimensions from "../../../../../Hook/useWidthDimensions";
import InputEmoji from "react-input-emoji";
function Index() {
  //------------pick emoji--------------------

  const [text, setText] = useState("");
  const handleOnEnter = (text) => {
    console.log("enter", text);
    setText("");
  };

  //-------------WidthDimensions------------

  // const { width } = useWidthDimensions();
  // const [xs, setXs] = useState({ small: 2, big: 10 });
  // useEffect(() => {
  //   if (width <= 1300 && width > 600) {
  //     setXs({ small: 1, big: 11 });
  //   } else {
  //     setXs({ small: 1, big: 11 });
  //   }
  // }, [width]);
  return (
    <Container sx={{ height: "100%" }} maxWidth="lg">
      <Grid item sx={{ width: "100%", height: "100%" }}>
        <Grid
          container
          sx={{ width: "100%", height: "100%" }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={11}>
            <InputEmoji
              value={text}
              onChange={setText}
              cleanOnEnter
              onEnter={handleOnEnter}
              placeholder="Your message ..."
              fontSize={18}
              borderRadius={15}
              maxLength={140}
              height={30}
            />
          </Grid>
          <Grid item xs={1} sx={{ height: "100%" }}>
            <Grid container alignItems="center" sx={{ height: "100%" }}>
              <Grid item>
                <Telegram
                  sx={{ fontSize: 35, cursor: "pointer" }}
                  style={
                    text.length > 0 ? { color: "#FF6B00" } : { color: "gray" }
                  }
                  
                  onClick={() => handleOnEnter(text)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Index;
