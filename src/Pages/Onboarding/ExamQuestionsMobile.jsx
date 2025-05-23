import React from "react";

function ExamQuestionsMobile({ number, question, selected, onSelect }) {
  return (
    <div className="mb-4 p-6 pt-0 text-[#3d3d3d]">
    <p className="text-[24px] font-bold mb-2">
      {number}. {question.text}
    </p>
    <div className="space-y-2 pb-2 text-[24px]">
      {question.options.map((option, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <input
            type="radio"
            name={`q${question.id}`}
            id={`q${question.id}_${idx}`}
            className="accent-[#785491]"
            checked={selected === idx}
            onChange={() => onSelect(question.id, idx)}
          />
          <label htmlFor={`q${question.id}_${idx}`} className="cursor-pointer">
            {String.fromCharCode(65 + idx)}.  {option}
          </label>
        </div>
      ))}
    </div>
  </div>
  );
}

export default ExamQuestionsMobile;
