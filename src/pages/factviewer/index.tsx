import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import Loading from "@/src/components/Loading";
import { getRandomFact, getFactOfTheDay, Fact } from "@/src/services/factAPI";

import ukFlag from "@/public/uk-flag.png";
import germanFlag from "@/public/germany-flag.png";

const FactViewer = () => {
    const { user, isLoading: userLoading } = useUser();
    const [fact, setFact] = useState<Fact | null>(null);
    const [savedFacts, setSavedFacts] = useState<Fact[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const savedFactsFromLocalStorage = localStorage.getItem("savedFacts");
        if (savedFactsFromLocalStorage) {
            setSavedFacts(JSON.parse(savedFactsFromLocalStorage));
        }
    }, []);

    useEffect(() => {
        if (!userLoading && user === undefined) {
            router.push("/");
        }
    }, [userLoading, router, user]);

    useEffect(() => {
        setFactToRandomFact();
    }, [selectedLanguage]);

    const setFactToRandomFact = () => {
        getRandomFact(selectedLanguage)
            .then((fact) => {
                setFact(fact);
            })
            .catch((error) => {
                console.error("Error fetching random fact:", error);
            });
    }

    const saveFactToLocalStorage = (fact: Fact) => {
        const updatedSavedFacts = [fact, ...savedFacts];
        setSavedFacts(updatedSavedFacts);
        localStorage.setItem("savedFacts", JSON.stringify(updatedSavedFacts));
    };

    const handleSaveFact = () => {
        if (fact) {
            saveFactToLocalStorage(fact);
            setFact(null);
            setFactToRandomFact();
        }
    };

    const handleDeleteFact = (index: number) => {
        const updatedSavedFacts = savedFacts.filter((_, i) => i !== index);
        setSavedFacts(updatedSavedFacts);
        localStorage.setItem("savedFacts", JSON.stringify(updatedSavedFacts));
    };

    const handleDeleteAllFacts = () => {
        setSavedFacts([]);
        localStorage.removeItem("savedFacts");
    };

    const handleNextFact = () => {
        setFactToRandomFact();
    };

    const handleTodaysFact = () => {
        getFactOfTheDay(selectedLanguage)
            .then((fact) => {
                setFact(fact)
            })
            .catch((error) => {
                console.error("Error fetching fact of the day:", error)
            });
    };

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLanguage(event.target.value);
    };

    const handleLogout = async () => {
        setIsLoading(true);
        await router.push("/api/auth/logout?returnTo=/", undefined, { shallow: true });
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center opacity-90 hover:opacity-90 min-h-screen md:text-lg text-xs md:font-normal font-light">
            {isLoading && <Loading />}
            {!userLoading && (
                <div className="w-full flex flex-col items-center my-auto fixed md:top-24 top-4 md:bottom-24 bottom-6 md:p-0 p-6">
                    <div className="flex items-center duration-300 justify-between w-full md:max-w-3xl max-w-md p-4 bg-white border border-gray-300 rounded-xl">
                        <p className="text-black">
                            {fact ? fact.text : "Fetching a random fact..."}
                        </p>
                        {user ? (
                            <button
                                className="duration-300 text-blue-500 hover:text-blue-600 ml-2 hover:bg-gray-200 md:bg-white bg-gray-200 rounded-full p-2"
                                onClick={handleSaveFact}
                            >
                                <FaPlus />
                            </button>
                        ) : (
                            <a
                                href="/api/auth/login"
                                className="duration-300 text-blue-500 hover:text-blue-600 ml-2 hover:bg-gray-200 rounded-full p-2"
                            >
                                <FaPlus />
                            </a>
                        )}
                    </div>
                    <div className="flex md:mt-8 mt-4 md:h-12">
                        <div className="items-center m-auto mr-3 md:block hidden">
                            <Image
                                src={selectedLanguage === "en" ? ukFlag : germanFlag}
                                alt={selectedLanguage === "en" ? "UK Flag" : "German Flag"}
                                width={45}
                            />
                        </div>
                        <select
                            className="duration-300 bg-white border cursor-pointer border-gray-300 hover:ring-2 hover:ring-teal-500 text-gray-900 md:font-medium font-normal md:py-2 md:px-4 px-1 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent flex items-center"
                            value={selectedLanguage}
                            onChange={handleLanguageChange}
                        >
                            <option value="en">English</option>
                            <option value="de">German</option>
                        </select>
                        <button
                            className="duration-300 hover:bg-teal-500 hover:border-teal-600 bg-slate-600 border-slate-600 text-white md:font-medium font-normal md:py-2 md:px-4 px-2 rounded-xl ml-4"
                            onClick={handleTodaysFact}
                        >
                            Today&apos;s Fact
                        </button>
                        <button
                            className="duration-300 hover:bg-teal-500 hover:border-teal-600 bg-slate-600 border-slate-600 text-white md:font-medium font-normal md:py-2 md:px-4 px-2 rounded-xl ml-4"
                            onClick={handleNextFact}
                        >
                            Next Fact
                        </button>
                        {savedFacts.length > 0 && (
                            <button
                                className="duration-300 hover:bg-red-700 hover:border-red-700 bg-red-500 border-red-500 text-white md:font-medium font-normal md:py-2 md:px-4 px-2 rounded-xl ml-4"
                                onClick={handleDeleteAllFacts}
                            >
                                Delete All Facts
                            </button>
                        )}
                        {user && (
                            <button
                                disabled={isLoading}
                                className={`duration-300 hover:bg-red-700 hover:border-red-700 bg-red-500 border-red-500 text-white md:font-medium font-normal md:py-2 md:px-4 rounded-xl ml-4 min-h-12 px-2 ${isLoading ? "cursor-wait" : ""
                                    }`}
                                onClick={handleLogout}
                            >
                                {isLoading ? "Loading..." : "Logout"}
                            </button>
                        )}
                    </div>
                    <div className="duration-300 md:mt-8 mt-4 px-4 rounded-md w-full md:max-w-3xl max-w-md min-h-64 max-h-screen scrollbar overflow-y-scroll overflow-visible">
                        {savedFacts.map((savedFact, index) => (
                            <div
                                key={index}
                                className="flex bg-gray-800 shadow-md opacity-95 shadow-gray-800 rounded-md p-3 justify-between items-center mb-2"
                            >
                                <p className="text-white">{savedFact.text}</p>
                                <button
                                    className="duration-300 text-red-500 hover:text-red-600 ml-2 rounded-full hover:bg-gray-700 p-2"
                                    onClick={() => handleDeleteFact(index)}
                                >
                                    <FaMinus />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FactViewer;
