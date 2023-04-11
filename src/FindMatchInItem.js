const FindMatchInItem = ({ items, text }) => {
  return (
    <>
      {items
        .filter((value) => value === text)
        .map((val) => {
          return (
            <>
              <span>"{val}" found in items</span> <hr></hr>
            </>
          );
        })}
    </>
  );
};

export default FindMatchInItem;
