// import React from "react";
// import "./Card.css";
// import { GiRoundStar } from "react-icons/gi";
// import { MdCodeOff } from "react-icons/md";
// import '../fonts.css'


// const CardsList = ({ prevSearchTerm, repos, clearRepos }) => {
  
//   const clear=()=>{
//     clearRepos()
//   }
//   return (
//     <div className="cardsList">
//       <div className="repoListControl">
//         {" "}
//         <p>Search term: {prevSearchTerm}</p>
//         <button onClick={clear}>X &nbsp; Clear</button>
//       </div>
//       <div className="repo-list">
//         {repos &&
//           repos.map((repo) => (
//             <div key={repo.id} className="card">
//               <div
//                 className="card-title"
                
//               >
//               <a href={repo.html_url}>
//                 <img
//                   src={repo.owner.avatar_url}
//                   alt="Avatar"
//                   width={"100"}
//                   height={100}
//                 /></a>
//                 <h2>
//                   {repo.name.length < 20
//                     ? repo.name
//                     : repo.name.substring(0, 20) + "..."}
//                 </h2>
//                 <p title={
//                   "watchers:" + repo.watchers_count + " | score:" + repo.score
//                 }><GiRoundStar color="yellow"/>: {repo.stargazers_count}</p>
//               </div>
//               <div className="details">
//                 <p>Description: 
//                   </p>
//                 <p style={{marginTop:'-10px', height:'120px', fontWeight:'300'}}>
//                 {/* {(String(repo.description).length)} */}
//                   {String(repo.description).length <250 ? String(repo.description) : String(repo.description).substring(250)+'...'  || "No description available."}
//                   {/* abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMN */}
                  
//                 </p>
//                 <hr/>
//                 <div className="furtherDetails">
//                 <span style={{fontSize:'20px', marginBottom:'0',  fontFamily: 'Barlow Condensed, sans-serif'}}><MdCodeOff /> {repo.language || "Language Not specified"}</span>
//                 {/* <button> Read more</button> */}
//                 </div>
//               </div>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default CardsList;


import React, { useState, useEffect } from "react";
import "./Card.css";
import { GiRoundStar } from "react-icons/gi";
import { MdCodeOff } from "react-icons/md";
import "../fonts.css";

const CardsList = ({ prevSearchTerm, repos, clearRepos }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Number of items per page

  const clear = () => {
    clearRepos();
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = repos.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1); // Reset to the first page when new data is loaded
  }, [repos]);

  return (
    <div className="cardsList">
      <div className="repoListControl">
        {" "}
        <p>Search term: &nbsp;"<> {prevSearchTerm} </>"</p>
        <button onClick={clear}>X &nbsp; Clear</button>
      </div>
      <div className="repo-list">
        {currentItems.map((repo) => (
          <div key={repo.id} className="card">
            <div className="card-title">
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" title={'Visit repo ' + (repo.name.length < 10
                  ? repo.name
                  : repo.name.substring(0, 8) + "...")}>
                <img
                  src={repo.owner.avatar_url}
                  alt="Avatar"
                  width={"100"}
                  height={100}
                />
              </a>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" title={'Visit repo ' + repo.name}
              // (repo.name.length < 10? 
              // repo.name
                  // : repo.name.substring(0, 8) + "...")}
                  >
              <h2>
                {repo.name.length < 25
                  ? repo.name
                  : repo.name.substring(0, 25) + "..."}
              </h2>
              </a>
              <p
                title={"watchers:" + repo.watchers_count + " | score:" + repo.score}
              >
                <GiRoundStar color="yellow" />: {repo.stargazers_count}
              </p>
            </div>
            <div className="details">
              <p>Description:</p>
              <p style={{ marginTop: "-10px", height: "120px", fontWeight: "300" }}>
                {String(repo.description).length < 250
                  ? String(repo.description)
                  : String(repo.description).substring(250) + "..." ||
                    "No description available."}
              </p>
              <hr />
              <div className="furtherDetails">
                <span style={{ fontSize: "20px", marginBottom: "0", fontFamily: 'Barlow Condensed, sans-serif' }} title={'Languages: '+repo.language}>
                  <MdCodeOff /> {repo.language || "Language Not specified"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        {/* Render pagination buttons */}
        {Array.from({ length: Math.ceil(repos.length / itemsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "pgno active" : "pgno"}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CardsList;
