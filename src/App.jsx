import { useEffect, useRef, useState } from "react";
import "./App.css";
import { useCallback } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setcharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenrater = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "1234567890";
    if (characterAllowed) str += "~!@#$%^&*()_+=-";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenrater();
  }, [length, numberAllowed, characterAllowed, passwordGenrater]);

  return (
    <>
      <div className="w-full display-flex max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-50 text-red-500 text-bold bg-gray-800">
        <h1 className="text-white text-bold text-center my-3">
          Password Genrater
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none text-red-500 w-full py-1 px-3 bg-white"
            placeholder="Password"
            readOnly
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none ml-2  bg-blue-500 text-white px-3 py-0.5  hover:bg-red-900 shrink-0"
          >
            Copy
          </button>
        </div>
        <div className="flex text-50 gap-x-2">
          <div className="flex item-center gap-x-1">
            <input
              type="range"
              min={8}
              max={10000}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="flex items-center gap-x-0">
            <input
              type="checkbox"
              defaultChecked={characterAllowed}
              id="characterAllowed"
              onChange={() => {
                setcharacterAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
