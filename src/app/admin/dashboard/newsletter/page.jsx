"use client";
import React, { useContext, useEffect, useState } from "react";
import "./form.modules.scss";
import Link from "next/link";
import TableNav from "../../../../components/tableNav/TableNav";

function page() {
  const data = [
    {
      email: "nitish@gmail.com",
    },
    {
      email: "nitish@gmail.com",
    },
  ];

  const [expandedUser, setExpandedUser] = useState(null);

  const toggleUserDetails = (userId) => {
    if (expandedUser === userId) {
      setExpandedUser(null);
    } else {
      setExpandedUser(userId);
    }
  };

  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = data.slice(startIndex, endIndex);

  return (
    <div className="usersList">
      <div className="box1"></div>
      <div className="box2">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Email Id</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((data, index) => (
              <React.Fragment key={index}>
                <tr className={index % 2 === 1 ? "lightgray" : ""}>
                  <td>{startIndex + index + 1}</td>
                  <td>{data.email}</td>
                  <td>
                    <div
                      style={{
                        width: "5rem",
                        backgroundColor: "red",
                        color: "white",
                        padding: "4px 10px",
                        borderRadius: "8px",
                        marginLeft: "8px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className="tableNav">
        <TableNav
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

export default page;
