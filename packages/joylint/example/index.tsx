function App() {
  if (Math.random() > 0.1) {
    throw 0;
  }

  return <div className="App">1</div>
}

export default App
