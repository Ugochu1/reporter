import React from "react"
import classes from "./Table.module.css";
import MessageBox from "../messages/MessageBox";


function Table({
  item,
  watchItems,
  index,
  removeKeyValue,
  setModifyIndex,
  setShowAddRow,
  modifyTableValue,
}) {
  return (
    <div
      className={classes.fullBody + " mt-3 relative px-2"}
      ref={(el) => (watchItems.current[index] = el)}
    >
      <button
        className={classes.close + " absolute"}
        onClick={() => removeKeyValue(index)}
      >
        &#x58;
      </button>
      <div
        className={
          classes.description + " flex px-3 justify-between items-center"
        }
      >
        <div className="uppercase text-blue-700">{item.name}</div>
        <div>
          <button
            className={classes.modifyButton}
            onClick={() => modifyTableValue(index)}
          >
            Modify
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex justify-center items-center flex-col">
          <table className={classes.table + " mb-3 w-full"}>
            {item.data.map((data_arr, i) =>
              i === 0 ? (
                <thead key={i}>
                  <tr className={classes.thead + " p-2"}>
                    {data_arr.map((header_value, h_i) => (
                      <th
                        key={h_i}
                        className={
                          classes.table_header + " p-3 uppercase text-xs w-2/3"
                        }
                      >
                        {header_value}
                      </th>
                    ))}
                  </tr>
                </thead>
              ) : (
                <tbody key={i}>
                  <tr>
                    {data_arr.map((body_value, h_i) => (
                      <td
                        key={h_i}
                        className={classes.table_body + " py-3 px-4"}
                      >
                        {body_value}
                      </td>
                    ))}
                  </tr>
                </tbody>
              )
            )}
          </table>
          <div className="">
            <button
              className={classes.modifyButton}
              onClick={() => {
                setModifyIndex(index);
                setShowAddRow(true);
              }}
            >
              Add Row
            </button>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <MessageBox
          type="Warning"
          message="Be careful while adding rows, as you cannot modify individual rows. But you can overwrite the entire table by clicking on the 'Modify' button."
        />
      </div>
    </div>
  );
}

export default Table;
