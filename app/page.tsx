import Dock from "./components/Dock/Dock";
import Header from "./components/Header/Header";

export default function Home() {
  return (
    <div className="MainPage">
      <Header />
      <div className="MainPageContent"></div>
      <Dock />
    </div>
  );
}
