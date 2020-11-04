import React, { useState } from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./StylesSelect.css";

function StylesSelect({onStylesChange, styles}) {
  const selectAllTextAll = "Seleccionar todos";
  const selectAllTextNone = "Deseleccionar todos";
  const [selectAll, setSelectAll] = useState(true);
  const [selectAllText, setSelectAllText] = useState(selectAllTextNone);
  const onSelectAll = (checked) => {
    styles.forEach(function(style) {
      style.Checked = checked;
    });
    onStylesChange();
    if(checked) {
      setSelectAllText(selectAllTextNone);
    }
    else {
      setSelectAllText(selectAllTextAll);
    }
  };
  return (
    <form className="styles-container">
      <h4>Estilos de cerveza</h4>
      <div key="select-all" className="form-check">
          <input type="checkbox" className="form-check-input" id="select-all" defaultChecked={selectAll} onChange={() => { onSelectAll(!selectAll); setSelectAll(!selectAll); }}/>
          <label className="form-check-label" htmlFor="select-all">{selectAllText}</label>
      </div>
      {styles.map((element, index) =>
        <div key={element.StyleID} className="form-check">
            <input type="checkbox" className="form-check-input" id={element.StyleID} defaultChecked={element.Checked} checked={element.Checked} onChange={() => { element.Checked = !element.Checked; console.log(element); onStylesChange(); }}/>
            <label className="form-check-label" htmlFor={element.StyleID}>{element.Style}</label>
        </div>
      )}
    </form>
  );
}

export default StylesSelect;
