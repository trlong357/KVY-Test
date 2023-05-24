import axios from "axios";
import { debounce } from "lodash";
import toast from "react-hot-toast";

import NavBar from "@/components/NavBar";
import { useCallback, useState } from "react";
import Spinner from "@/components/Spinner";
import FunctionButton from "@/components/FunctionButton";
import SearchInput from "@/components/SearchInput";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");

  // Search handler
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
        } else {
          toast.error(response.data.msg);
        }
        setSearchText(word);
      }
    } catch (error) {
      console.log("Error when searching: ", error);
      toast.error("Đã xảy ra lỗi");
    }
    setIsLoading(false);
  }, []);
  const debouncedSearch = useCallback(
    debounce((word) => {
      searchWord(word);
    }, 500),
    []
  );

  const searchHandler = (event) => {
    setSearchResults([]);
    setIsLoading(true);
    debouncedSearch(event.target.value.trim());
  };
  // -----

  // Delete handler
  const deleteWord = useCallback(async () => {
    try {
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
        toast.success("Đã xoá thành công");
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      if (error.response && error.response.data.msg) {
        toast.error(error.response.data.msg);
      } else {
        console.log("Error when deleting: ", error);
        toast.error("Đã xảy ra lỗi");
      }
    }
  }, [searchText]);
  // -----

  // Add handler
  const addWord = useCallback(async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/v1/search", {
        addedWord: searchText,
      });
      if (response.status === 200) {
        setIsLoading(true);
        searchWord(searchText);

        toast.success("Đã thêm từ mới thành công");
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      if (error.response && error.response.data.msg) {
        toast.error(error.response.data.msg);
      } else {
        console.log("Error when adding: ", error);
        toast.error("Đã xảy ra lỗi");
      }
    }
  }, [searchText]);
  // -----

  return (
    <main className=" bg-white px-10 dark:bg-gray-900 md:px-20 lg:px-40">
      <section className="min-h-screen">
        <NavBar />
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
                onClick={addWord}
                title={`Thêm từ: ${searchText}`}
                className="bg-green-300 hover:bg-green-500"
              />
              <FunctionButton
                onClick={deleteWord}
                title={`Xoá từ: ${searchText}`}
                className="bg-red-300 hover:bg-red-500"
              />
            </div>

            <p className="text-3xl text-gray-600 dark:text-gray-300">
              Kết quả:
            </p>

            <div className="mt-3 gap-3 flex flex-row items-stretch justify-center">
              {searchResults.map((result, index) => (
                <div
                  className="dark:text-black dark:bg-white text-white bg-gray-700 rounded-xl flex-1 text-center p-4 "
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
