import "./App.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import HighlightQueryText from "./HighlightQueryText";

function App() {
  const [inputSearch, setSearch] = useState();
  const [crossIcon, setCrossIcon] = useState(false);
  const [apiData, setApiData] = useState();
  const [matchedData, setMatchedData] = useState();
  const resultsRef = useRef();
  const inputRef = useRef();
  const [focusElement, setFocusElement] = useState();

  useEffect(() => {
    (async () => {
      const {data} = await axios.get("http://www.mocky.io/v2/5ba8efb23100007200c2750c");
      setApiData(data);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      if (inputSearch) {
        const reg = new RegExp(`(${inputSearch})`, "gi");
        setMatchedData(apiData.filter((val) => JSON.stringify(val).match(reg)));
      }
    })();
  }, [inputSearch]);

  useEffect(() => {
    if (matchedData) {
      document.body.addEventListener("keydown", onKeyDown);
    } else {
      document.body.removeEventListener("keydown", onKeyDown);
    }
    return () => {
      document.body.removeEventListener("keydown", onKeyDown);
    };
  }, [matchedData]);

  function onKeyDown(event) {
    const isUp = event.key === "ArrowUp";
    const isDown = event.key === "ArrowDown";
    let resultsItems;
    if (resultsRef && resultsRef.current) {
      resultsItems = Array.from(resultsRef.current.children);
    }

    if (isUp) {
      setFocusElement((focusElement) => {
        let itemIndex;
        if (focusElement === undefined) {
          itemIndex = 0;
        } else if (resultsItems[focusElement - 1]) {
          itemIndex = focusElement - 1;
        } else {
          inputRef.current.focus();
        }
        resultsItems[itemIndex]?.scrollIntoView();
        return itemIndex;
      });
    }

    if (isDown) {
      setFocusElement((focusElement) => {
        let itemIndex;
        if (focusElement === undefined) {
          itemIndex = 0;
        } else if (resultsItems[focusElement + 1]) {
          itemIndex = focusElement + 1;
        } else {
          inputRef.current.focus();
        }
        resultsItems[itemIndex]?.scrollIntoView();
        return itemIndex;
      });
    }
  }
  
  return (
    <div className="App">
      <div className="wrapper">
        <div className="input-wrapper">
          <input
            className="Search-input"
            type="text"
            placeholder="Search Users by ID, address, name"
            onChange={(e) => setSearch(e.target.value)}
            onClick={(e) => setCrossIcon(true)}
            value={inputSearch}
            ref={inputRef}
          />
          {crossIcon && (
            <span
              onClick={(e) => {
                setSearch("");
                setCrossIcon(false);
              }}
              className="cross-icon"
            >
              x
            </span>
          )}
        </div>
        {inputSearch && (
          <ul
            className="card-container"
            ref={resultsRef}
            type="none"
            onMouseOver={(e) => {
              console.log("move IN")

              if (e.target.tagName === "LI") {
                setFocusElement(parseInt(e.target.dataset.index));
              }
            }}
            onMouseOut={(e) => {
              console.log("move out")
              setFocusElement();
            }}
          >
            {matchedData && matchedData.length > 0 ? (
              matchedData.map((value, index) => (
                <HighlightQueryText
                  key={index}
                  value={value}
                  filterValue={inputSearch}
                  indexTab={index}
                  selected={index === focusElement}
                />
              ))
            ) : (
              <div className="no-data">No data</div>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
