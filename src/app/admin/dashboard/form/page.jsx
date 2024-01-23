"use client";
import React, { useContext, useEffect, useState } from "react";
import "./form.modules.scss";
import Link from "next/link";
import TableNav from "../../../../components/tableNav/TableNav";
import ReactDOM from "react-dom";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function form() {
  // const [data, setData] = useState([]);

  // const { dispatch, isFetchingData } = useContext(Context);

  // useEffect(() => {
  //   const assembleData = async () => {
  //     const res1 = await axiosPrivate.get("/api/admin/data");
  //     setData(res1.data);

  //     const res2 = await axiosPrivate.get("/api/admin/summary");
  //     setMetData(res2.data);
  //   };

  //   assembleData();
  // }, []);

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const data = [
    {
      name: "nitish",
      email: "nitish@gmail.com",
      contact: "9879879877",
      subject: "Unicorn company",
      comment: "call not picked",
    },
    {
      name: "nitish",
      email: "nitish@gmail.com",
      contact: "9879879877",
      subject: "Unicorn company",
      comment: "positive",
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

  // if (isFetchingData) {
  //   return (
  //     <center>
  //       <h1>Loading...</h1>
  //     </center>
  //   );
  // }
  return (
    <div className="usersList">
      <div className="box1"></div>

      <div className="box2">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email Id</th>
              <th>Contact No</th>
              <th>Subject</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((data, index) => (
              <React.Fragment key={index}>
                <tr className={index % 2 === 1 ? "lightgray" : ""}>
                  <td>{startIndex + index + 1}</td>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.contact}</td>
                  <td>{data.subject}</td>
                  <td>{data.comment}</td>
                  <td>
                    <Link href="" onClick={() => toggleUserDetails(index + 1)}>
                      {expandedUser === index + 1 ? "Close" : "More Details"}
                    </Link>
                  </td>
                </tr>
                {expandedUser === index + 1 && (
                  <tr className="expandedRow">
                    <td colSpan="6">
                      <div className="expanded">
                        <div className="col1">
                          <div>
                            <b>Time: </b>
                          </div>
                          <div>
                            <b>Param2: </b>
                          </div>
                        </div>
                        <div className="col2">
                          <div>
                            <b>Param3: </b>
                          </div>
                          <div>
                            <b>Param4:</b>
                          </div>

                          {/* <
                            href={{
                              pathname: "/users/users-profile/singleuser/edit",
                            }}
                            state={{
                              data: data,
                            }}
                          > */}
                          <div
                            style={{
                              float: "right",
                              backgroundColor: "red",
                              color: "white",
                              padding: "4px 10px",
                              borderRadius: "8px",
                              marginLeft: "8px",
                              cursor: "pointer",
                            }}
                          >
                            Delete query
                          </div>

                          <div
                            style={{
                              float: "right",
                              backgroundColor: "#d6d6d6",
                              color: "black",
                              padding: "4px 10px",
                              borderRadius: "8px",
                              marginRight: "10px",
                              cursor: "pointer",
                            }}
                            onClick={openModal}
                          >
                            Update Comment
                          </div>
                          <Modal
                            isOpen={modalIsOpen}
                            onAfterOpen={afterOpenModal}
                            onRequestClose={closeModal}
                            style={customStyles}
                            contentLabel="Example Modal"
                          >
                            <button
                              style={{ float: "right" }}
                              onClick={closeModal}
                            >
                              X
                            </button>
                            <br />
                            <div>Enter Comment</div>
                            <form>
                              <input type="text" style={{ width: "300px" }} />
                              <br />
                              <br />
                              <button style={{ float: "right" }}>Save</button>
                            </form>
                          </Modal>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
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

export default form;
