import axios from "axios";
import { debounce } from "lodash";

import NavBar from "@/components/NavBar";
import { useCallback, useState } from "react";
import Spinner from "@/components/Spinner";
import FunctionButton from "@/components/FunctionButton";
import SearchInput from "@/components/SearchInput";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");

  const searchWord = useCallback(async (word) => {
    try {
      if (word != "") {
        const response = await axios.get(
          "http://localhost:8000/api/v1/search",
          {
            params: {
              searchWord: word,
            },
          }
        );
        if (response.status === 200) {
          setSearchResults(response.data.mostSimilarityWords);
        }
        setSearchText(word);
      }
    } catch (error) {
      console.log("Error when searching: ", error);
    }
    setIsLoading(false);
  }, []);

  const deleteWord = useCallback(async () => {
    try {
      console.log(searchText);
      const response = await axios.delete(
        "http://localhost:8000/api/v1/search",
        {
          params: {
            deletedWord: searchText,
          },
        }
      );
      if (response.status === 200) {
        setIsLoading(true);
        searchWord(searchText);
      }
    } catch (error) {
      console.log("Error when searching: ", error);
    }
  }, [searchText]);

  const debouncedSearch = useCallback(
    debounce((word) => {
      searchWord(word);
    }, 500),
    []
  );

  const searchHandler = (event) => {
    setSearchResults([]);
    setIsLoading(true);
    debouncedSearch(event.target.value);
  };

  return (
    <main className="bg-white px-10 dark:bg-gray-900 md:px-20 lg:px-40">
      <section className="min-h-screen">
        <NavBar setDarkMode={() => {}} />
        <SearchInput searchHandler={searchHandler} />
        {isLoading ? (
          <div className="text-center">
            <Spinner />
          </div>
        ) : null}
        {searchResults.length > 0 ? (
          <>
            <div className="flex flex-row gap-3 items-stretch justify-center">
              <FunctionButton
                onClick={() => {}}
                title={`Thêm từ: ${searchText}`}
                className="bg-green-300 hover:bg-green-500"
              />
              <FunctionButton
                onClick={deleteWord}
                title={`Xoá từ: ${searchText}`}
                className="bg-red-300 hover:bg-red-500"
              />
            </div>

            <p className="text-3xl  text-gray-300">Kết quả:</p>

            <div className="mt-3 gap-3 flex flex-row items-stretch justify-center">
              {searchResults.map((result, index) => (
                <div
                  className="dark:text-black rounded-xl flex-1 text-center p-4 bg-white"
                  key={index}
                >
                  {result.word}
                </div>
              ))}
            </div>
          </>
        ) : null}
      </section>
    </main>
  );
}
