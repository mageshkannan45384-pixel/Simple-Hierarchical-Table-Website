import React, { useState } from "react";
import "./styles.css";

const initialData = {
  rows: [
    {
      id: "electronics",
      label: "Electronics",
      value: 1400, // auto recalculated
      children: [
        { id: "phones", label: "Phones", value: 800 },
        { id: "laptops", label: "Laptops", value: 700 },
      ],
    },
    {
      id: "furniture",
      label: "Furniture",
      value: 1000, // auto recalculated
      children: [
        { id: "tables", label: "Tables", value: 300 },
        { id: "chairs", label: "Chairs", value: 700 },
      ],
    },
  ],
};

/* ---------- helpers ---------- */

const recalc = (rows) =>
  rows.map((r) => {
    if (!r.children) return r;
    const children = recalc(r.children);
    const sum = children.reduce((a, b) => a + b.value, 0);
    return { ...r, value: +sum.toFixed(2), children };
  });

const buildMap = (rows, map = {}) => {
  rows.forEach((r) => {
    map[r.id] = r.value;
    if (r.children) buildMap(r.children, map);
  });
  return map;
};

const distribute = (row, newVal) => {
  if (!row.children) return { ...row, value: +newVal.toFixed(2) };

  const total = row.children.reduce((a, b) => a + b.value, 0);
  let used = 0;

  const children = row.children.map((c, i) => {
    let val =
      total === 0 ? newVal / row.children.length : newVal * (c.value / total);

    if (i === row.children.length - 1) val = newVal - used;
    val = +val.toFixed(2);
    used += val;
    return distribute(c, val);
  });

  return { ...row, value: +newVal.toFixed(2), children };
};

const update = (rows, id, val) =>
  rows.map((r) =>
    r.id === id
      ? distribute(r, val)
      : r.children
        ? { ...r, children: update(r.children, id, val) }
        : r,
  );

/* ---------- app ---------- */

export default function App() {
  const [data, setData] = useState(() => recalc(initialData.rows));
  const [orig] = useState(() => buildMap(recalc(initialData.rows)));

  const [inputs, setInputs] = useState({});

  const setInput = (id, v) =>
    setInputs((p) => ({ ...p, [id]: v === "" ? "" : +v }));

  const applyPercent = (id, cur) => {
    if (inputs[id] === "" || inputs[id] === undefined) return;
    const val = cur + (cur * inputs[id]) / 100;
    setData((d) => recalc(update(d, id, val)));
  };

  const applyValue = (id) => {
    if (inputs[id] === "" || inputs[id] === undefined) return;
    setData((d) => recalc(update(d, id, inputs[id])));
  };

  const render = (rows, lvl = 0) =>
    rows.map((r) => {
      const o = orig[r.id] || 0;
      const v = o ? (((r.value - o) / o) * 100).toFixed(2) : "0.00";

      return (
        <React.Fragment key={r.id}>
          <tr>
            <td style={{}}>{r.label}</td>
            <td>{r.value.toFixed(2)}</td>

            <td>
              <input
                type="number"
                value={inputs[r.id] ?? ""}
                onChange={(e) => setInput(r.id, e.target.value)}
              />
            </td>

            <td>
              <button onClick={() => applyPercent(r.id, r.value)}>
                Allocation %
              </button>
            </td>

            <td>
              <button onClick={() => applyValue(r.id)}>Allocation Val</button>
            </td>

            <td>{v}%</td>
          </tr>

          {r.children && render(r.children, lvl + 1)}
        </React.Fragment>
      );
    });

  const total = data.reduce((a, b) => a + b.value, 0);

  const reset = () => {
    setData(recalc(initialData.rows));
    setInputs({});
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Hierarchical Table</h2>
        <button className="reset-btn" onClick={reset}>
          Reset
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Label</th>
            <th>Value</th>
            <th>Input</th>
            <th>Allocation %</th>
            <th>Allocation Val</th>
            <th>Variance %</th>
          </tr>
        </thead>

        <tbody>
          {render(data)}
          <tr className="grand">
            <td>Grand Total</td>
            <td>{total.toFixed(2)}</td>
            <td colSpan="4"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
