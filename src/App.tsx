import { useState } from "react";
import axios from "axios";
import "./App.css";
import { questions } from "./data";

const ENDPOINT = "https://qx24vjuooi.execute-api.us-east-1.amazonaws.com/dev";

function App() {
  const [name, setName] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isNameSubmitted, setIsNameSubmitted] = useState<boolean>(false);

  const handleCheckboxChange = (key: string) => {
    setSelectedItems((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const handleNameSubmit = () => {
    setIsNameSubmitted(true);
  };

  const handleSubmit = async () => {
    const selectedValues = questions
      .filter((question) => selectedItems.includes(question.key))
      .map((item) => item.value);

    const data = {
      name,
      selectedValues,
    };

    console.log(data);

    try {
      await axios.post(ENDPOINT, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert(`Success`);
    } catch (error) {
      alert("Failed to submit data.");
    }
  };

  return (
    <div className="App">
      <h1>Personality Quiz</h1>
      {!isNameSubmitted ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <div className="name-form">
            <label htmlFor="name">Enter your name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              type="button"
              style={{ width: 200 }}
              onClick={handleNameSubmit}
              className="submit-button"
            >
              Start
            </button>
          </div>
        </form>
      ) : (
        <form>
          {questions.map(({ key, value }) => (
            <div key={key} className="question-item">
              <input
                type="checkbox"
                id={`question-${key}`}
                checked={selectedItems.includes(key)}
                onChange={() => handleCheckboxChange(key)}
              />
              <label htmlFor={`question-${key}`}>{value}</label>
            </div>
          ))}
          <button
            type="button"
            onClick={handleSubmit}
            className="submit-button"
          >
            Submit Answers
          </button>
        </form>
      )}
    </div>
  );
}

export default App;
