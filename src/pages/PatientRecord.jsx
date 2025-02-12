import React, { useState, useEffect, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Modal,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const PatientRecord = () => {
  const [patients, setPatients] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const token = localStorage.getItem("jwtToken");

  const fetchPatients = useCallback(async () => {
    try {
      const response = await fetch(
        "https://deaddiction-project-backend.onrender.com/api/centre/patients",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.patients) {
        setPatients(data.patients);
      }
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  }, [token]);

  const handleDelete = useCallback(
    async (id) => {
      try {
        const response = await fetch(
          `https://deaddiction-project-backend.onrender.com/api/centre/patients/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          setPatients((prevPatients) =>
            prevPatients.filter((patient) => patient._id !== id)
          );
        } else {
          console.error("Error deleting patient");
        }
      } catch (error) {
        console.error("Error deleting patient:", error);
      }
    },
    [token]
  );

  const handleDetailClick = useCallback((patient) => {
    const treatmentDetails = {
      admissionDate: patient.admissionDate,
      problem: patient.problem,
      treatmentSummary: patient.treatmentSummary,
      progressSummary: patient.progressSummary,
      dischargeDate: patient.dischargeDate,
    };
    setSelectedTreatment(treatmentDetails);
    setOpenModal(true);
  }, []);

  useEffect(() => {
    if (token) {
      fetchPatients();
    }
  }, [token, fetchPatients]);

  return (
    <Box sx={{ p: 4, bgcolor: "background.default", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          mb: 3,
          fontWeight: "bold",
          color: "primary.main",
        }}
      >
        Patient Record
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Button variant="contained" color="primary" href="/add-patient">
          Add New Data
        </Button>
        <Button variant="contained" color="primary" href="/profilepage">
          Go to Profile Page
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Table>
          <TableHead sx={{ bgcolor: "primary.main" }}>
            <TableRow>
              {["Name", "Gender", "Age", "Mobile No", "Address", "Action"].map(
                (header) => (
                  <TableCell
                    key={header}
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    {header}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.length > 0 ? (
              patients.map((row, index) => (
                <TableRow
                  key={row._id}
                  sx={{
                    bgcolor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                    "&:hover": { bgcolor: "#f1f5fb" },
                  }}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.gender}</TableCell>
                  <TableCell>{row.age}</TableCell>
                  <TableCell>{row.mobileNumber}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mr: 1 }}
                      onClick={() => handleDetailClick(row)}
                      startIcon={<Edit />}
                    >
                      Detail
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(row._id)}
                      startIcon={<Delete />}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No patients found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedTreatment && (
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxWidth: 600,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 4,
              p: 3,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                mb: 2,
                textAlign: "center",
                color: "primary.main",
              }}
            >
              Treatment Details
            </Typography>
            <Box
              sx={{
                bgcolor: "#f4f6f8",
                p: 2,
                borderRadius: 1,
                mb: 2,
              }}
            >
              <Typography sx={{ mb: 1 }}>
                <strong>Admission Date:</strong>{" "}
                {selectedTreatment.admissionDate}
              </Typography>
              <Typography sx={{ mb: 1 }}>
                <strong>Problem:</strong> {selectedTreatment.problem}
              </Typography>
              <Typography sx={{ mb: 1 }}>
                <strong>Treatment Summary:</strong>{" "}
                {selectedTreatment.treatmentSummary}
              </Typography>
              <Typography sx={{ mb: 1 }}>
                <strong>Progress Summary:</strong>{" "}
                {selectedTreatment.progressSummary}
              </Typography>
              <Typography sx={{ mb: 1 }}>
                <strong>Discharge Date:</strong>{" "}
                {selectedTreatment.dischargeDate}
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setOpenModal(false)}
              >
                Close
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default PatientRecord;
