import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface keyword {
  created_at: string;
  keyword: string;
  month: string;
  volume: number;
  __v: number;
  _id: string;
}

const App: React.FC = () => {
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [searchItem, setSearchItem] = useState<string>("");
  const [displayList, setDisplayList] = useState<boolean>(false);
  const [keywordList, setKeywordList] = useState<keyword[]>([]);

  const addSearchItem = async () => {
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/api/keywordcount`, {
        keyword: searchItem,
      })
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log("Error config:", error.config);
      });
  };

  const getKeyWords = async (month: string) => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/monthlysearch/${month}`, {
        withCredentials: true,
      })
      .then((response) => {
        setDisplayList(true);
        setKeywordList(response.data.keywords);
      })
      .catch((error) => {
        console.log("Error config:", error.config);
      });
  };

  return (
    <>
      <h1 className=" text-3xl font-bold text-center my-5">
        Sellerkin Keyword volume calculation feature
      </h1>

      <div className=" flex flex-row justify-center items-center space-x-2">
        <input
          type="text"
          value={searchItem}
          onChange={(event) => setSearchItem(event.target.value)}
          placeholder="search here"
          className=" w-1/3 px-2 py-1 rounded-md border-2"
        />
        <button
          className=" border-2 rounded-xl text-lg px-2 py-1"
          onClick={() => addSearchItem()}
        >
          Search
        </button>
      </div>

      <div>
        <h1 className=" text-2xl font-bold text-center mt-20 mb-7">
          Dashboard Section
        </h1>
        <div className=" w-full flex flex-row justify-center h-full flex-wrap">
          {months.map((item, index) => {
            return (
              <div key={index} className="lg:w-1/12 text-center py-1">
                <h1
                  className=" text-xl font-medium mx-1 border-2 rounded-md pb-2"
                  onClick={() => getKeyWords(item)}
                >
                  {item}
                </h1>
              </div>
            );
          })}
          {!displayList ? (
            <h1 className=" text-3xl font-bold mt-24 text-gray-600">
              Select a month to display keywords
            </h1>
          ) : (
            <div className="my-5">
              {keywordList.length === 0 ? (
                <h1 className=" text-xl font-medium mt-24">
                  Nothing is searched in this month yet ...
                </h1>
              ) : (
                <div className=" space-y-3">
                  <span className=" text-2xl font-bold pb-5">
                    Searched Items ...
                  </span>
                  {keywordList.map((item) => {
                    return (
                      <li className=" text-xl font-medium">
                        {`${item.keyword} (${item.volume})`}{" "}
                      </li>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <Toaster />
    </>
  );
};

export default App;
