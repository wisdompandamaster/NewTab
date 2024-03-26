import Background from "@/components/background/background";
import Nav from "./components/nav/nav";
import "./App.css";

function App() {
  return (
    <>
      <Background
        src="https://newtab.wisdompanda.com/pic/background/cool-background1.png"
        cover={30}
        blur={0}
      />
      <Nav />
    </>
  );
}

export default App;
