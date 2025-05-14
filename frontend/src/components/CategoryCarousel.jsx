import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
    "Frontend Developer",
    "Backend Developer",
    "FullStack Developer",
    "Data Science",
    "UI/UX Designer",
    "Mobile Developer",
    "DevOps Engineer",
    "Graphic Designer",
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        // dispatch(setSearchedQuery(query));
        navigate("/jobs");
    };

    return (
        <section className="py-14 bg-white">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">🔍 Explore by Job Categories</h2>
                <Carousel className="w-full relative px-6">
                    <CarouselContent className="-ml-4">
                        {category.map((cat, index) => (
                            <CarouselItem key={index} className="pl-4 basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                                <div className="w-full h-full">
                                    <Button
                                        onClick={() => searchJobHandler(cat)}
                                        variant="outline"
                                        className="w-full py-4 rounded-xl border-gray-300 hover:bg-[#6A38C2] hover:text-white transition duration-200"
                                    >
                                        {cat}
                                    </Button>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* Add more spacing between arrows and carousel items */}
                    <CarouselPrevious className="-left-10" />
                    <CarouselNext className="-right-10" />
                </Carousel>
            </div>
        </section>
    );
};

export default CategoryCarousel;
