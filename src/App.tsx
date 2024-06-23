import { useState } from "react";
import axios from "axios";
import classNames from "classnames";
import "./App.css";
import { questions } from "./data";

const ENDPOINT = "https://qx24vjuooi.execute-api.us-east-1.amazonaws.com/dev";

function App() {
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleCheckboxChange = (key: string) => {
    setSelectedItems((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const handleSubmit = async () => {
    if (loading) return;

    setLoading(true);

    const selectedValues = questions
      .filter((question) => selectedItems.includes(question.key))
      .map((item) => item.value);

    const data = {
      name,
      password,
      selectedValues,
    };

    console.log(data);

    try {
      const response = await axios.post(ENDPOINT, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.statusCode === 403) {
        alert(`Failed: Invalid password`);
        return;
      }

      if (response.data.statusCode === 200) {
        alert(`Success`);
      } else {
        alert("Failed");
      }

      setLoading(false);
    } catch (error) {
      alert("Failed to submit data.");

      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const isBtnEnabled =
    name != "" && password != "" && !loading && selectedItems.length > 0;

  const submitBtnClassNames = classNames("submit-button-enabled", {
    "submit-button-disabled":
      name == "" || password == "" || !selectedItems.length,
  });

  return (
    <div className="App">
      <h1>Personality Quiz</h1>

      <div className="name-form">
        <label htmlFor="name">Enter your name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="password">Enter password:</label>
        <input
          type="text"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <>
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
          className={submitBtnClassNames}
          disabled={!isBtnEnabled}
        >
          {loading ? "Loading..." : "Submit Answers"}
        </button>
      </>
    </div>
  );
}

export default App;
