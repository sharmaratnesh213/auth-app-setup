"use client";
import React, { useEffect, useState } from "react";
import "./form.modules.scss";
import Link from "next/link";
import TableNav from "../../../../components/tableNav/TableNav";
import axios from "axios";
import Loader from "@/components/loader/Loader";

function page() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const assembleData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/data/newsletter");
      // console.log(res.data);
      setData(res.data);

    } catch (err) {
      console.log(err);

    } finally {
      setLoading(false);

    }
  };

  useEffect(() => {
    const assembleDataWrapper = async () => {
      try {
        await assembleData();
      } catch (err) {
        console.log(err);
      }
    }

    assembleDataWrapper();

  }, []);

  if (loading) {
    return (
      <Loader />
    );
  }

  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = data.slice(startIndex, endIndex);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete("/api/data/newsletter/single", { data: { id } });
      await assembleData();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="usersList">
      <div className="box1"></div>
      <div className="box2">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Email Id</th>
              <th>Date of subscribing</th>
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
                    {new Date(data?.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })},
                    {" "}{new Date(data?.createdAt).toLocaleTimeString()}
                  </td>
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
                      onClick={() => handleDelete(data._id)}
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
