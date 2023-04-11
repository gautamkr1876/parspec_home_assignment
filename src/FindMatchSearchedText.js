const FindMatchSearchedText = ({ text, reg }) => {
  const textParts = text.split(reg);
  return (
    <div style={{ fontWeight: 600, borderBottom: "1px solid black" }}>
      {textParts.map((part, index) =>
        part.match(reg) ? (
          <span key={index} style={{ fontWeight: "normal", color: "blue" }}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </div>
  );
};

export default FindMatchSearchedText;
