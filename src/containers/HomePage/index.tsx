import "./index.css";


function HomePage() {
  return (
    <div className="homepage" >
      <header className="App-header" style={{background: "linear-gradient(#e66465, #9198e5)"}}>
        <p style={{color: "white", fontSize: "30", fontFamily: "brandon-grot-w01-light" }}> 
          Best,
        </p>
        <a
          className="App-link"
          href="https://www.bestcomma.co/"
          target="_blank"
          rel="noopener noreferrer"
        >
          About Us
        </a>
      </header>
    </div>
  );
}

export default HomePage;
