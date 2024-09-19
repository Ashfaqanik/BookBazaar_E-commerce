import { useParams } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import { useState, useEffect, React } from "react";
import { GrLanguage } from "react-icons/gr";

function BookDetails() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `http://localhost:1000/api/v1/getBookById/${id}`
      );
      console.log(res);
      setData(res.data.data);
    };
    fetch();
  }, []);
  return (
    <>
      {data.length === 0 && (
        <div className="h-screen bg-slate-100 flex items-center justify-center">
          <Loader />
        </div>
      )}
      {data !== 0 && (
        <div className="px-4 md:px-12 py-8 bg-slate-100 flex flex-col md:flex-row gap-8">
          <div className="bg-slate-300 p-2 h-[58vh] lg:h-[68vh] w-full lg:w-3/6 flex items-center justify-center">
            <img
              src={data.url}
              alt="/"
              className="h-[50vh] lg:h-[60vh] rounded-xl"
            />
          </div>
          <div className="p-4 w-full lg:w-3/6">
            <h1 className="text-4xl text-slate-600 font-semibold mr-8">
              {data.title}
            </h1>
            <p className=" text-slate-500 mt-1"> by {data.author}</p>
            <p className="text-xl text-slate-700 mt-4">{data.desc}</p>
            <p className="flex items-center justify-start text-slate-700 mt-4">
              <GrLanguage className="me-3" />
              {data.language}
            </p>
            <p className="mt-4 text-slate-600 text-3xl font-semibold">
              Price: $ {data.price}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default BookDetails;