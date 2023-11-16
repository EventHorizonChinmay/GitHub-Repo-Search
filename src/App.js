import React, { useState, useEffect } from "react";
import "./App.css";
import RainfallAnimation from "./components/WordDropper";
import Header from "./components/Header";
import CardsList from "./components/CardsList";
import { IoMdRefresh } from "react-icons/io";
import { BiFontSize, BiSortDown } from "react-icons/bi";
import { FaGithub } from "react-icons/fa";


function App() {
  const [repos, setRepos] = useState([]); //List of Repos

  const [searchTerm, setSearchTerm] = useState(""); // Search Keyword term
  const [sortOption, setSortOption] = useState("watchers"); //Sorting options
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [prevSearchTerm, setPrevSearchTerm] = useState(searchTerm);
  const [prevSortOption, setPrevSortOption] = useState(sortOption);
  const [searchedButNoResult, setSearchedButNoResult] = useState(false)
  const [prevResults,setPrevResults] = useState(repos)
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    console.log("Loading", loading);
    console.log("Searching", searching);
    console.log(
      "SearchTerm",
      searchTerm ? true : false,
      searchTerm,
      searchTerm.length
    );
    console.log("repos", repos);

    console.log(
      "REQUEST:" +
        `https://api.github.com/search/repositories?q=${searchTerm}&sort=${sortOption}&order=desc`
    );
    console.log("PrevSortOption:", prevSortOption);
    console.log("sortOption:", sortOption);
    console.log('searchedButNoResults',searchedButNoResult);
    console.log("prevResults",prevResults)

  });
  const emptySearch = () => {
    return <div>Please enter search keywords</div>;
  };
  const fetchData = async () => {
    if (
      searchTerm == prevSearchTerm &&
      repos.length > 0 &&
      sortOption == prevSortOption
    ) {
      return;
    }

    try {

      setSearchedButNoResult(false)
      setSearched(false)
      if (!searchTerm) {
        emptySearch();
        alert("please enter search keywords");
      } else {
        setLoading(true);
        setSearching(true);

        const response = await fetch(
          `https://api.github.com/search/repositories?q=${searchTerm}&sort=${sortOption}&order=${sortOption.includes('nam')? 'asc':'desc'}`
        );
        const data = await response.json();
        console.log(
          "REQUEST:" +
            `https://api.github.com/search/repositories?q=${searchTerm}&sort=${sortOption}&order=${sortOption.includes('nam')? 'asc':'desc'}`
        );
        console.log("API response:", data); // Log the data

        setRepos(data.items);
        if (repos.length===0 && searched){
          setSearchedButNoResult(true)
        }
        else{
          setSearchedButNoResult(false)
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching data:", error);
    }
    setLoading(false);
    setSearching(false);
    setSearched(true)
    setPrevSearchTerm(searchTerm);
    setPrevSortOption(sortOption);
    setPrevResults(repos)
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    // e.preventDefault()
    setSortOption(e.target.value);
    // console.log('sortOption:',sortOption)
    fetchData();
  };

  const clearRepos = () => {
    setRepos([]);
    setPrevResults([])
    setPrevSearchTerm('')
  };

  useEffect(()=>{
    if(repos.length==0 ){
      setSearchedButNoResult(true)
    }
    else{
      setSearchedButNoResult(false)
    }
  },[repos])

  return (
    <div className="App">
      <Header />
      <div
        className={
          repos && repos.length === 0
            ? "searchField beforeSearchField"
            : "searchField afterSearchField"
        }
      >
        <p>
          {repos.length==0 && 'Hello, Welcome to the'}  </p> {repos.length==0 && <span style={{fontSize:'35px', fontWeight:400}}><span style={{fontSize:'40px'}}>dice </span> Github Repo Search!</span>}
        <p >
          {repos.length==0 && 'An easy way to search for your favorite public repositories on GitHub'  }<span> {repos.length===0 && <FaGithub/> } </span> </p>
          <p>Enter a search term/keyword:{" "}
        </p>

        <div className="search-cum-sort-container">
          <div
            className={
              repos && repos.length === 0
                ? "search beforeSearch"
                : "search afterSearch"
            }
          >
            <div
              className={
                repos && repos.length === 0
                  ? "searchInput beforeSearchInput"
                  : "searchInput afterSearchInput"
              }
            >
              <img
                src="https://www.freeiconspng.com/thumbs/search-icon-png/search-icon-png-5.png"
                alt=""
                height={"20px"}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <button style={{ cursor: "pointer" }} onClick={fetchData}>
              <img
                src="https://icons.veryicon.com/png/o/miscellaneous/mirror-icon/enter-19.png"
                height={"16px"}
                alt=""
              />
            </button>
          </div>



          {repos.length > 0 && (
            <div className="sortOptions">
              <div className="list-and-search">
              <label className="sortLogo"><BiSortDown color="black" height={'20px'}/> </label>
              <select value={sortOption} onChange={handleSortChange}>
                <option value="stars">Stars</option>
                <option value="watchers">Watchers</option>
                <option value="score">Score</option>
                <option value="name">Name</option>
                <option value="created_at">Created At</option>
                <option value="updated_at">Updated At</option>
              </select>
              <button onClick={fetchData} className="refreshBtn" title="Update results">
                {" "}
                <IoMdRefresh />{" "}
              </button>
              </div>
            </div>
          )}
        </div>
      </div>
      { prevSearchTerm!=='' && searchedButNoResult===true && (repos.length === 0 && prevResults.length===0) && <h3 style={{color:'orangered',fontWeight:'400', marginTop:'-70px'}}>Sorry, no results found for <span style={{fontWeight:'500'}}> "{prevSearchTerm}" </span> 
      <p>Please try again...</p></h3>}
      <div className="search-results">

        {repos.length > 0 && (
          <CardsList
            prevSearchTerm={prevSearchTerm}
            repos={repos}
            clearRepos={clearRepos}
          />
        )}
       
      </div>

      {/* {loading &&<img src='https://i.giphy.com/media/xTkcEQACH24SMPxIQg/giphy.webp' width={200} alt='' className='loadingGIF'/>} */}
      {loading && <RainfallAnimation searchTerm={searchTerm} />}

      {(!repos || repos.length < 0) &&
        searchTerm.length !== 0 &&
        searching &&
        "No repos found with this query"}
        <div className="contact">
      <p style={{fontSize:'14px'}}> Facing issues? Pl contact: </p>
      <p style={{fontSize:'14px'}}> 
      Website: <a href="https://chinmay-g.netlify.app/" target="_blank" rel="noopener noreferrer">https://chinmay-g.netlify.app/</a> |
      Email: <a href="mailto:chinmay.g2022@gmail.com" target="_blank" rel="noopener noreferrer"> chinmay.g2022@gmail.com</a> 
      </p>
      </div>
    </div>
  );
}

export default App;
