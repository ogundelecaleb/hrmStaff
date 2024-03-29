import React, { useState, useEffect } from "react";
import { Md6K } from "react-icons/md";
import { Link } from "react-router-dom";
import { Button, Flex } from "@chakra-ui/react";
import { Box, Heading, Text, List, ListItem } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import JobCard from "./JobCard";
import CreateJobModal from "./CreateJobModal";
import CommonButton from "../../../components/commonbutton/Button";
import api from "../../../api";
import { useSnackbar } from "notistack";

const JobOpening = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [createJobModalOpen, setCreateJobModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const [jobListings, setJobListings] = useState([]);
  
  useEffect(() => {
    if (jobListings) {
      fetchJobDetails();
    }
  }, []);

  async function fetchJobDetails() {
    try {
      setIsLoading(true);
      const response = await api.fetchJobs()
      console.log("User Details:", response);
      setJobListings(response.data)
    } catch (error) {
      console.error("Error fetching your basic details", error);
      enqueueSnackbar(error.message, { variant: 'error' })
    }finally {
      setIsLoading(false);
    }
  }

  const openCreateJobModal = () => {
    setCreateJobModalOpen(true);
  };

  const closeCreateJobModal = () => {
    setCreateJobModalOpen(false);
  };

  const handleCreateJob = (newJob) => {
    newJob.requirements = Array.isArray(newJob.requirements)
      ? newJob.requirements
      : newJob.requirements.split(',').map(item => item.trim());

    // Add the new job to the jobListings array
    setJobListings((prevListings) => [...prevListings, { id: prevListings.length + 1, ...newJob }]);
  };

  return (
    <Box>
      <Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          px='7'
          justifyContent='space-between'>
          <Text fontSize={"2xl"}></Text>{" "}
          <CommonButton action={openCreateJobModal} title={"Create Job"} />
        </Box>
      </Box>
      <div className="container" style={{ paddingLeft: "6%", paddingRight: "6%" }}>
        <div className="row mt-2">
          {jobListings.map((job) => (
            <div key={job.id} className="col-lg-6 mb-4">
              <JobCard job={job} />
            </div>
          ))}
          <CreateJobModal isOpen={createJobModalOpen} onClose={closeCreateJobModal} onCreateJob={handleCreateJob} />
        </div>

      </div>
    </Box>
  );
};

export default JobOpening;
