import React from "react";
import styles from "../../data/styles";
import "./StylesList.css";

function StylesSelect({bar}) {
  return (
    <ul>
      {styles.filter(style => style.Bars.includes(bar.id)).map((element, index) =>
        <li key={element.StyleID}>{element.Style}</li>
      )}
    </ul>
  );
}

export default StylesSelect;
