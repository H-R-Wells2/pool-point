import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormProps {
  onSubmit: (names: string[]) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [names, setNames] = useState(["", "", "", ""]);

  const handleChange = (index: number, value: string) => {
    const newNames = [...names];
    newNames[index] = value;
    setNames(newNames);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(names);
  };

  return (
    <div className="flex w-full justify-center items-center mt-16">
      <form
        className="flex flex-col justify-center items-center w-fit bg-gray-700 px-3 py-5 rounded-lg"
        onSubmit={handleSubmit}
      >
        {names.map((name, index) => (
          <input
            key={index}
            type="text"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(index, e.target.value)
            }
            placeholder={`Player ${index + 1}`}
            className="mb-2 p-2 rounded-lg outline-none text-black"
            required
            minLength={3}
          />
        ))}
        <button
          type="submit"
          className="bg-teal-500 text-white px-4 py-2 rounded-lg"
        >
          Start Game
        </button>
      </form>
    </div>
  );
};

export default Form;
