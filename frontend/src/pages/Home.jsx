import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from "axios";

function Home() {
  const [complaints, setComplaints] = useState([]);
  const [notProcess, setNotProcess] = useState([]);
  const [inProcess, setInProcess] = useState([]);
  const [closedComplaints, setClosedComplaints] = useState([]);
  useEffect(() => {
    const fetchComplaints = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/complaint-history`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200) {
        const allComplaints = res.data.complaints;

        const notProcessed = allComplaints.filter(
          (complaint) => complaint.status === "Not processed yet"
        );
        const inProcess = allComplaints.filter(
          (complaint) => complaint.status === "In process"
        );
        const closedComplaints = allComplaints.filter(
          (complaint) => complaint.status === "Closed"
        );

        setComplaints(allComplaints);
        setNotProcess(notProcessed);
        setInProcess(inProcess);
        setClosedComplaints(closedComplaints);
      }
    };
    fetchComplaints();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="font-['ubuntu']">
      <Navbar />
      <div className="flex flex-col sm:flex-row gap-5">
        <Sidebar />
        <div className="p-5 w-full">
          <h3 className="sm:text-4xl text-2xl text-center sm:text-left uppercase">
            Dashboard Analytics
          </h3>
          <div className="w-full sm:mt-20 mt-5">
            <div className="w-full flex flex-col sm:flex-row sm:gap-20 gap-10 items-center justify-around mt-10">
              <div className="sm:w-1/2 w-full bg-[#FF9149] px-4 py-2 text-white rounded-lg">
                <h4 className="text-2xl">{complaints.length}</h4>
                <h3 className="text-2xl">Total Complaints</h3>
              </div>
              <div className="sm:w-1/2 w-full bg-[#343A40] px-4 py-2 text-white rounded-lg">
                <h4 className="text-2xl">{notProcess.length}</h4>
                <h3 className="text-2xl">Pending Complaints</h3>
              </div>
            </div>
            <div className="w-full flex flex-col sm:flex-row sm:gap-20 gap-10 items-center justify-around mt-10">
              <div className="sm:w-1/2 w-full bg-[#28D094] px-4 py-2 text-white rounded-lg">
                <h4 className="text-2xl">{inProcess.length}</h4>
                <h3 className="text-2xl">In Process Complaints</h3>
              </div>
              <div className="sm:w-1/2 w-full bg-[#666EE8] px-4 py-2 text-white rounded-lg">
                <h4 className="text-2xl">{closedComplaints.length}</h4>
                <h3 className="text-2xl">Closed Complaints</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
