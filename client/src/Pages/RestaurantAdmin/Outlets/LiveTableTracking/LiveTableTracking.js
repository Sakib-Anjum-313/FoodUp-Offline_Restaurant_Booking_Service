import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../Context/AuthProvider";
import "./LivetableTracking.css";

const LiveTableTracking = () => {
  const { user } = useContext(AuthContext);
  const [tableInformation, setTableInformation] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/resAdmin/allTableInfo/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setTableInformation(data.Tables);
      });
  }, [user?.email]);

  console.log(tableInformation);

  // update tables to db
  const handleUpdateTable = () => {
    fetch(
      `http://localhost:5000/resAdmin/liveTableTracking/updateTable/${user?.email}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(tableInformation),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setUpdate(false);
          Swal.fire({
            title: "Wow",
            text: "Table Info Updated Successfully",
            icon: "success",
          });
          console.log(data);
        } else {
          Swal.fire({
            title: "Sorry!!!",
            text: "Error Occurs!!! Try again",
            icon: "error",
          });
        }
        console.log(data);
      });
  }

  // disable a table
  const handleDisable = (table, tablesInRow) => {
    let newTableInfo = [];
    tablesInRow.tableInfo.forEach((Tbl) => {
      if (Tbl.TableId === table.TableId) {
        Tbl.Availability = "Disable";
        newTableInfo.push(Tbl);
      } else {
        newTableInfo.push(Tbl);
      }
      const beforeTableList = tableInformation.filter(
        (tables) => tables.Row < table.Row
      );
      tablesInRow.tableInfo = newTableInfo;

      const afterTableList = tableInformation.filter(
        (tables) => tables.Row > table.Row
      );
      const newTableList = [...beforeTableList, tablesInRow, ...afterTableList];
      setTableInformation(newTableList);
      setUpdate(true);
    });
  };

  //available a table

  const handleAvailable = (table, tablesInRow) => {
    let newTableInfo = [];
    tablesInRow.tableInfo.forEach((Tbl) => {
      if (Tbl.TableId === table.TableId) {
        Tbl.Availability = "Available";
        newTableInfo.push(Tbl);
      } else {
        newTableInfo.push(Tbl);
      }
      const beforeTableList = tableInformation.filter(
        (tables) => tables.Row < table.Row
      );
      tablesInRow.tableInfo = newTableInfo;

      const afterTableList = tableInformation.filter(
        (tables) => tables.Row > table.Row
      );
      const newTableList = [...beforeTableList, tablesInRow, ...afterTableList];
      setTableInformation(newTableList);
      setUpdate(true);
    });
  };

  return (
    <div className="flex flex-col items-center mt-12  bg-slate-100">
      <div className="flex items-center relative mb-4">
        <div className="my-4 ">
          <button
            onClick={handleUpdateTable}
            disabled={!update}
            className="btn btn-active btn-secondary ml-6 "
          >
            Save
          </button>
        </div>
        <div className="flex flex-col justify-center  items-center relative left-80 mt-2">
          <p className=" font-semibold text-red-600 mb-1 border border-red-600 px-2 py-1  rounded">
            Indication
          </p>
          <div className="mt-1">
            <button className="btn btn-sm bg-lime-300 text-lime-700 border-none hover:bg-lime-400">
              Available
            </button>
            <button className="btn btn-sm bg-red-300 text-red-800 border-none ml-2 hover:bg-red-400">
              Booked
            </button>
            <button className="btn btn-sm bg-gray-300 text-gray-800 border-none ml-2 hover:bg-gray-400">
              Disable
            </button>
          </div>
        </div>
      </div>
      <div className=" shadow-xl  w-fit h-fit p-4  bg-white">
        <div className="flex flex-col ">
          {tableInformation?.map((tablesInRow, index1) => (
            <div
              className={`p-4  flex justify-${tablesInRow.alignment}`}
              key={index1}
            >
              {tablesInRow?.tableInfo?.map((table, index2) => (
                <div key={index2}>
                  <div className={`dropdown dropdown-bottom `}>
                    <label
                      tabIndex={0}
                      className={`btn table-${table.Person} ${
                        table.Availability === "Available" &&
                        `border-none mx-1 bg-lime-300 text-lime-700 hover:bg-lime-400 `
                      }  ${
                        table.Availability === "Booked" &&
                        `border-none mx-1 bg-red-300 text-red-800 hover:bg-red-400`
                      } ${
                        table.Availability === "Disable" &&
                        `border-none mx-1 bg-gray-300 text-gray-800 hover:bg-gray-400 `
                      }`}
                    >
                      {`${table.TableId}__${table.Person}P`}
                    </label>
                    <ul
                      tabIndex={0}
                      className={`dropdown-content menu  shadow rounded-box bg-slate-100 w-52 `}
                    >
                      <li>
                        <button
                          onClick={() => {
                            handleAvailable(table, tablesInRow);
                          }}
                        >
                          Available
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            handleDisable(table, tablesInRow);
                          }}
                        >
                          Disable
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveTableTracking;
