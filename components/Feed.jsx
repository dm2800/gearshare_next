"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import InstrumentCard from "./InstrumentCard";
import Link from "next/link";

const InstrumentCardList = ({ data, handleTagClick }) => {
    return (
        <div className="mt-16 prompt_layout">
            {data.map((instrument) => (
                <InstrumentCard
                    key={instrument._id}
                    instrument={instrument}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    );
};

const Feed = () => {
    const [instruments, setInstruments] = useState([]);

    //search states
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);
    const [searchText, setSearchText] = useState("");

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);

        //debounce method

        setSearchTimeout(
            setTimeout(() => {
                const searchResult = filterInstruments(e.target.value);
                setSearchedResults(searchResult);
            }, 500)
        );
    };

    const filterInstruments = (searchtext) => {
        const regex = new RegExp(searchtext, "i");
        return instruments.filter(
            (item) =>
                regex.test(item.creator.username) || regex.test(item.title)
        );
    };

    useEffect(() => {
        const getAllInstruments = async () => {
            try {
                const res = await fetch("/api/instrument/all");
                const data = await res.json();
                setInstruments(data);
                console.log("get instrus response", data);
            } catch (error) {
                console.log("Get all instru fetch error", error);
            }
        };

        getAllInstruments();
    }, []);


    return (
        <div>
            <section className="feed">
                <form className="relative w-full flex-center">
                    <input
                        type="text"
                        placeholder="Search for gear"
                        value={searchText}
                        onChange={handleSearchChange}
                        required
                        className="search_input peer"
                    ></input>
                </form>

                {searchText ? (
                    <InstrumentCardList data={searchedResults} />
                ) : (
                    <InstrumentCardList data={instruments} />
                )}

            </section>

        </div>
    );
};

export default Feed;
