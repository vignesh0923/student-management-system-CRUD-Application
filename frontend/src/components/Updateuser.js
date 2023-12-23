import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Adduser.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const intialState = {
  FirstName: "",
  LastName: "",
  Location: "",
  Email: "",
  Dob: "",
  Education: "",
  about: "",
};

const Updateuser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3030/${id}`).then((data) => {
      setState(data.data[0]);
    });
  }, [0]);

  const [state, setState] = useState(intialState);

  const { FirstName, LastName, Location, Email, Dob, Education, About } = state;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !FirstName ||
      !LastName ||
      !Location ||
      !Email ||
      !Dob ||
      !Education ||
      !About
    ) {
      alert("Please Provide value into each input feild");
    } else {
      axios
        .post("http://localhost:3030/update", {
          FirstName,
          LastName,
          Location,
          Email,
          Dob,
          Education,
          About,
          id
        })
        .then(() => {
          setState({FirstName: "",LastName: "",Location: "",Email: "",Dob: "",Education: "",About: "",
          });
        })
        .catch((err) => toast.error(err.response.data));
      toast.success("Studentsdetais Added Successfully");
      setTimeout(() => navigate("/"), 500);
    }
  };

  const handleinputsubmit = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="45"
        height="45"
        viewBox="0 0 45 45"
        fill="none"
        onClick={() => {
          navigate("/");
        }}
      >
        <path
          d="M35.625 22.5H9.375"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M22.5 35.625L9.375 22.5L22.5 9.375"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <h3>Edit Student Details</h3>

      <form onSubmit={handleSubmit}>
        <table>
          <tr>
            <td>
              <label htmlFor="Firstname">FirstName:</label>
            </td>
            <td>
              <input
                type="text"
                placeholder="Enter your first name"
                value={FirstName}
                name="FirstName"
                onChange={handleinputsubmit}
              />
            </td>

            <td>
              <label htmlFor="Firstname">LastName:</label>
            </td>
            <td>
              <input
                type="text"
                placeholder="Enter Your Last Name"
                value={LastName}
                name="LastName"
                onChange={handleinputsubmit}
              />
            </td>
          </tr>

          <tr>
            <td>
              <label htmlFor="Email">Email:</label>
            </td>
            <td>
              <input
                name="Email"
                type="Email"
                placeholder="Enter your email"
                value={Email}
                onChange={handleinputsubmit}
              />
            </td>

            <td>
              <label htmlFor="dob">DOB:</label>
            </td>
            <td>
              <input
                type="Date"
                style={{ width: "60%" }}
                onChange={handleinputsubmit}
                value={Dob}
                name="Dob"
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="Education">Education:</label>
            </td>
            <td>
              <input
                type="text"
                placeholder="Enter your education"
                onChange={handleinputsubmit}
                value={Education}
                name="Education"
              />
            </td>

            <td>
              <label htmlFor="location">Location:</label>
            </td>
            <td>
              <input
                type="text"
                placeholder="Enter your location"
                onChange={handleinputsubmit}
                value={Location}
                name="Location"
              />
            </td>
          </tr>

          <tr>
            <td>
              <label htmlFor="about">About:</label>
            </td>
            <td colSpan={4}>
              <textarea
                style={{ height: "100px", width: "92%", padding:"10px" }}
                placeholder="Enter your details"
                onChange={handleinputsubmit}
                name="About"
                value={About}
              ></textarea>
            </td>
          </tr>
          <tr>
            <td></td>
            <input type="submit" value="Update" />
          </tr>
        </table>
      </form>
    </div>
  );
};

export default Updateuser;
