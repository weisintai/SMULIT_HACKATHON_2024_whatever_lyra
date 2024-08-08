import { useState } from "react";
import { lyra_backend } from "declarations/lyra_backend";
import { Button } from "@/components/ui/button";


import ChatLog from './components/chatLog.jsx';



function App() {
  const [greeting, setGreeting] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    lyra_backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });
    return false;
  }

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <Button variant="outline">Button</Button>
      <h1 className="text-3xl text-red-100 font-medium">Welcome to Lyra</h1>
      <br />
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input id="name" alt="Name" type="text" />
        <button type="submit">Click Me!</button>
      </form>
      <section id="greeting">{greeting}</section>

      <ChatLog/>
    </main>
  );
}

export default App;
