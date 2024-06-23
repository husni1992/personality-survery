import { useState } from 'react';
import './App.css';
import { questions } from './data';

type Question = {
  key: string;
  value: string;
}

function App() {
  const [name, setName] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isNameSubmitted, setIsNameSubmitted] = useState<boolean>(false);

  const handleCheckboxChange = (key: string) => {
    setSelectedItems(prev =>
      prev.includes(key)
        ? prev.filter(item => item !== key)
        : [...prev, key]
    );
  };

  const handleNameSubmit = () => {
    setIsNameSubmitted(true);
  };

  const handleSubmit = () => {
    const selectedValues = questions.filter(question => selectedItems.includes(question.key));
    console.log("User Name:", name);
    console.log("Selected items:", selectedValues);
    alert(`User ${name} selected ${selectedValues.length} items. ${JSON.stringify(selectedValues, null, 2)}`);
  };

  return (
    <div className="App">
      <h1>Personality Quiz</h1>
      {!isNameSubmitted ? (
        <form onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation()
        }}>
          <div className="name-form">
            <label htmlFor="name">Enter your name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="button" style={{width: 200}} onClick={handleNameSubmit} className="submit-button">
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
          <button type="button" onClick={handleSubmit} className="submit-button">
            Submit Answers
          </button>
        </form>
      )}
    </div>
  );
}

export default App;
