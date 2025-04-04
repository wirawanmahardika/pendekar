import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Ticker() {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const news = [
        { title: 'Hello world', img: '/img/login.png' },
        { title: 'My name is', img: '/img/login.png' },
        { title: 'wirawan', img: '/img/login.png' }
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000);
        return () => clearInterval(interval);
    }, [index]);

    const nextSlide = () => {
        setDirection(1);
        setIndex((prev) => (prev + 1) % news.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setIndex((prev) => (prev - 1 + news.length) % news.length);
    };

    return (
        <div className="relative flex items-center justify-center w-full h-full overflow-hidden shadow">
            <button
                className="p-2 bg-gray-200 h-full"
                onClick={prevSlide}
            >
                <FaChevronLeft size={20} />
            </button>

            <div className="relative w-full h-full flex justify-center items-center overflow-hidden">
                <AnimatePresence custom={direction}>
                    <motion.div
                        key={index}
                        initial={{ x: direction === 1 ? "100%" : "-100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: direction === 1 ? "-100%" : "100%", opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute w-full text-center text-lg font-semibold bg-gray-400 text-white h-full flex items-center justify-evenly"
                    >
                        <img src={news[index].img} alt="login" className="h-full" />
                        <span className=" text-black">{news[index].title}</span>
                    </motion.div>
                </AnimatePresence>
            </div>

            <button
                className="p-2 bg-gray-200 h-full"
                onClick={nextSlide}
            >
                <FaChevronRight size={20} />
            </button>
        </div>
    );
}

export default function FlashNews() {
    return <div className="p-4 bg-white rounded shadow">
        <h2 className="font-bold text-xl">Kabar Desa Terbaru</h2>
        <div className="flex mt-4 gap-x-6">
            <button className="px-9 py-4 font-bold text-lg text-white rounded bg-orange-500">Flash News</button>
            <div className="grow rounded bg-white">
                <Ticker />
            </div>
        </div>
    </div>
}

