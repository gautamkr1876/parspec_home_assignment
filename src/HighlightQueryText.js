import FindMatchSearchedText from "./FindMatchSearchedText";
import FindMatchInItem from "./FindMatchInItem";

const HighlightQueryText = ({ value, filterValue, indexTab, selected }) => {
  const reg = new RegExp(`(${filterValue})`, "gi");
  const { id, name, items, address, pincode } = value;
  const listValue = [id, name, items, address, pincode];

  return (
    <li
      key={indexTab}
      data-index={indexTab}
      style={{
        border: "2px solid red",
        borderRadius: "6px",
        padding:"10px",
        ...(selected ? { background: "yellow" } : {}),
      }}
      onMouseOut={(e) => {
        e.stopPropagation();
      }}
    >
      {listValue.map((list, index) => {
        if (Array.isArray(list)) {
          return <FindMatchInItem key={index} items={list} text={filterValue} reg={reg} />;
        } else {
          return <FindMatchSearchedText key={index} text={list} reg={reg} />;
        }
      })}
    </li>
  );
};

export default HighlightQueryText;