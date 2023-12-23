import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "../css/Mainpage.css";
import "../css/popup.css"



const Mainpage = ( onCancel ) => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);

  const loadData = async () => {
    const response = await axios.get("http://localhost:3030/");
    setStudents(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  // const deletestudent = (id) => {
  //   console.log(id);
  //     axios.delete(`http://localhost:3030/remove/${id}`);
  //   }
  // };

  const [searchTerm, setSearchTerm] = useState("");

  const handlesearch = () => {
    console.log(searchTerm);
    axios
      .get(`http://localhost:3030/hello?name=${searchTerm}`)
      .then(function (data) {
        console.log(data.data)
        setStudents(data.data);
      });
  };

  function searchFunc(e) {
    console.log(e.target.value);
    setSearchTerm(e.target.value);
    handlesearch()
  }


  const [showDeletePopup, setShowDeletePopup] = useState(false);


 
  const handleDelete = (id) => {
    console.log(id);
    // Send DELETE request to the server
    axios.delete(`http://localhost:3030/remove/${id}`)
    window.location.reload();
    setShowDeletePopup(false)
  };



  const handleCancel = () => {
    // Close the popup
    setShowDeletePopup(false);
  };




   

  

  return (
   <div> 
  
    
          <h3>Student Management System</h3>
      <div className="container">
        <div className="searchbar">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={searchFunc}
          />
          <svg 
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
              stroke="#D0D0D0"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M20.9999 21.0004L16.6499 16.6504"
              stroke="#D0D0D0"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div className="addbtn">
          <Link to={"addusers"}>
            <button>Add</button>
          </Link>
        </div>
      </div>
      <table
        border={1}
        cellPadding={"20px"}
        cellSpacing={"0px"}
        className="maintable"
      >
        <thead style={{ textAlign: "center" }}>
          <tr>
            <td>ID</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Location</td>
            <td>Email</td>
            <td>DOB</td>
            <td>Education</td>
            <td>Action</td>
            <td>Delete</td>
          </tr>
        </thead>
        <tbody>
          {students.map((item, index) => {
            return (
              <tr key={item.id} style={{ textAlign: "center" }}>
                <td scope="row">{index + 1}</td>
                <td>{item.FirstName}</td>
                <td>{item.LastName}</td>
                <td>{item.Location}</td>
                <td>{item.Email}</td>
                <td>{item.Dob}</td>
                <td>{item.Education}</td>
                <td>
                  <Link to={"/update/" + item.ID} style={{textDecoration:"none", color:"#4C5EFF"}}>
                    <i
                      style={{ color: "#4C5EFF" }}
                      class="fa-solid fa-user-pen"
                    ></i>
                    Edit
                  </Link>
                </td>
                <td
                  style={{ color: "#FF4C4C", textDecoration: "none", cursor:"pointer"}}
                  onClick={() => setShowDeletePopup(true)}>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="23"
                    viewBox="0 0 23 23"
                    fill="none"
                  >
                    <path
                      d="M18.208 6.70801C17.9538 6.70801 17.7101 6.80898 17.5304 6.9887C17.3506 7.16842 17.2497 7.41218 17.2497 7.66634V18.3911C17.2222 18.8757 17.0043 19.3298 16.6435 19.6545C16.2827 19.9792 15.8082 20.1482 15.3234 20.1247H7.67592C7.1911 20.1482 6.71661 19.9792 6.35582 19.6545C5.99503 19.3298 5.77716 18.8757 5.74967 18.3911V7.66634C5.74967 7.41218 5.64871 7.16842 5.46898 6.9887C5.28926 6.80898 5.04551 6.70801 4.79134 6.70801C4.53717 6.70801 4.29342 6.80898 4.1137 6.9887C3.93397 7.16842 3.83301 7.41218 3.83301 7.66634V18.3911C3.86036 19.3841 4.28015 20.3259 5.00043 21.01C5.72071 21.6942 6.68277 22.0651 7.67592 22.0414H15.3234C16.3166 22.0651 17.2786 21.6942 17.9989 21.01C18.7192 20.3259 19.139 19.3841 19.1663 18.3911V7.66634C19.1663 7.41218 19.0654 7.16842 18.8856 6.9887C18.7059 6.80898 18.4622 6.70801 18.208 6.70801Z"
                      fill="#FF4C4C"
                    />
                    <path
                      d="M19.1667 3.83301H15.3333V1.91634C15.3333 1.66218 15.2324 1.41842 15.0526 1.2387C14.8729 1.05897 14.6292 0.958008 14.375 0.958008H8.625C8.37083 0.958008 8.12708 1.05897 7.94735 1.2387C7.76763 1.41842 7.66666 1.66218 7.66666 1.91634V3.83301H3.83333C3.57917 3.83301 3.33541 3.93397 3.15569 4.1137C2.97597 4.29342 2.875 4.53717 2.875 4.79134C2.875 5.04551 2.97597 5.28926 3.15569 5.46898C3.33541 5.64871 3.57917 5.74967 3.83333 5.74967H19.1667C19.4208 5.74967 19.6646 5.64871 19.8443 5.46898C20.024 5.28926 20.125 5.04551 20.125 4.79134C20.125 4.53717 20.024 4.29342 19.8443 4.1137C19.6646 3.93397 19.4208 3.83301 19.1667 3.83301ZM9.58333 3.83301V2.87467H13.4167V3.83301H9.58333Z"
                      fill="#FF4C4C"
                    />
                    <path
                      d="M10.5417 16.2917V9.58333C10.5417 9.32917 10.4407 9.08541 10.261 8.90569C10.0813 8.72597 9.8375 8.625 9.58333 8.625C9.32917 8.625 9.08541 8.72597 8.90569 8.90569C8.72597 9.08541 8.625 9.32917 8.625 9.58333V16.2917C8.625 16.5458 8.72597 16.7896 8.90569 16.9693C9.08541 17.149 9.32917 17.25 9.58333 17.25C9.8375 17.25 10.0813 17.149 10.261 16.9693C10.4407 16.7896 10.5417 16.5458 10.5417 16.2917Z"
                      fill="#FF4C4C"
                    />
                    <path
                      d="M14.3747 16.2917V9.58333C14.3747 9.32917 14.2737 9.08541 14.094 8.90569C13.9143 8.72597 13.6705 8.625 13.4163 8.625C13.1622 8.625 12.9184 8.72597 12.7387 8.90569C12.559 9.08541 12.458 9.32917 12.458 9.58333V16.2917C12.458 16.5458 12.559 16.7896 12.7387 16.9693C12.9184 17.149 13.1622 17.25 13.4163 17.25C13.6705 17.25 13.9143 17.149 14.094 16.9693C14.2737 16.7896 14.3747 16.5458 14.3747 16.2917Z"
                      fill="#FF4C4C"
                    />
                  </svg>
                  Delete
                </td>
                {showDeletePopup && (
                <div className="delete-popup">
      <div className="popup-content">
      <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 65 65" fill="none">
  <path d="M51.4585 18.958C50.7402 18.958 50.0513 19.2434 49.5434 19.7513C49.0355 20.2592 48.7501 20.948 48.7501 21.6663V51.9753C48.6724 53.3449 48.0567 54.6283 47.0371 55.546C46.0175 56.4636 44.6765 56.9412 43.3064 56.8747H21.6939C20.3237 56.9412 18.9828 56.4636 17.9632 55.546C16.9436 54.6283 16.3279 53.3449 16.2502 51.9753V21.6663C16.2502 20.948 15.9648 20.2592 15.4569 19.7513C14.949 19.2434 14.2601 18.958 13.5418 18.958C12.8235 18.958 12.1347 19.2434 11.6267 19.7513C11.1188 20.2592 10.8335 20.948 10.8335 21.6663V51.9753C10.9108 54.7818 12.0972 57.4432 14.1327 59.3768C16.1683 61.3103 18.8872 62.3584 21.6939 62.2914H43.3064C46.1131 62.3584 48.832 61.3103 50.8676 59.3768C52.9031 57.4432 54.0895 54.7818 54.1668 51.9753V21.6663C54.1668 20.948 53.8815 20.2592 53.3735 19.7513C52.8656 19.2434 52.1768 18.958 51.4585 18.958Z" fill="black"/>
  <path d="M54.1666 10.833H43.3333V5.41634C43.3333 4.69805 43.048 4.00917 42.5401 3.50126C42.0322 2.99335 41.3433 2.70801 40.625 2.70801H24.375C23.6567 2.70801 22.9678 2.99335 22.4599 3.50126C21.952 4.00917 21.6667 4.69805 21.6667 5.41634V10.833H10.8333C10.115 10.833 9.42616 11.1183 8.91825 11.6263C8.41034 12.1342 8.125 12.823 8.125 13.5413C8.125 14.2596 8.41034 14.9485 8.91825 15.4564C9.42616 15.9643 10.115 16.2497 10.8333 16.2497H54.1666C54.8849 16.2497 55.5738 15.9643 56.0817 15.4564C56.5896 14.9485 56.875 14.2596 56.875 13.5413C56.875 12.823 56.5896 12.1342 56.0817 11.6263C55.5738 11.1183 54.8849 10.833 54.1666 10.833ZM27.0833 10.833V8.12467H37.9167V10.833H27.0833Z" fill="black"/>
  <path d="M29.7917 46.0417V27.0833C29.7917 26.365 29.5063 25.6762 28.9984 25.1683C28.4905 24.6603 27.8016 24.375 27.0833 24.375C26.365 24.375 25.6762 24.6603 25.1683 25.1683C24.6603 25.6762 24.375 26.365 24.375 27.0833V46.0417C24.375 46.76 24.6603 47.4488 25.1683 47.9567C25.6762 48.4647 26.365 48.75 27.0833 48.75C27.8016 48.75 28.4905 48.4647 28.9984 47.9567C29.5063 47.4488 29.7917 46.76 29.7917 46.0417Z" fill="black"/>
  <path d="M40.6252 46.0417V27.0833C40.6252 26.365 40.3398 25.6762 39.8319 25.1683C39.324 24.6603 38.6351 24.375 37.9168 24.375C37.1985 24.375 36.5097 24.6603 36.0018 25.1683C35.4938 25.6762 35.2085 26.365 35.2085 27.0833V46.0417C35.2085 46.76 35.4938 47.4488 36.0018 47.9567C36.5097 48.4647 37.1985 48.75 37.9168 48.75C38.6351 48.75 39.324 48.4647 39.8319 47.9567C40.3398 47.4488 40.6252 46.76 40.6252 46.0417Z" fill="black"/>
</svg>
        <p className="quote">Are you sure you want to delete?</p>
        <div className="button-container">
        <button className="cancelbtn" onClick={handleCancel}>Cancel</button>
          <button className="dltbtn" onClick={()=>{handleDelete(item.ID);}}>Yes</button>
     
        </div>
      </div>
    </div>)}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Mainpage;
