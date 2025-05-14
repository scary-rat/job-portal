import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

const reviews = [
    {
        name: "Anjali Sharma",
        position: "Frontend Developer",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        review: "This platform helped me land my dream job in just 2 weeks!",
    },
    {
        name: "Ravi Patel",
        position: "Backend Developer",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        review: "Great UI and super easy to use. Found tons of job opportunities.",
    },
    {
        name: "Sneha Iyer",
        position: "UI/UX Designer",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
        review: "Love the experience and the quick filtering features.",
    },
    {
        name: "Aman Verma",
        position: "FullStack Developer",
        image: "https://randomuser.me/api/portraits/men/45.jpg",
        review: "Got a call from 3 companies within the first week!",
    },
];

const ReviewsCarousel = () => {
    return (
        <section className="py-14 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">💬 What Our Users Say</h2>

                <Carousel className="w-full relative px-6">
                    <CarouselContent className="-ml-4">
                        {reviews.map((review, index) => (
                            <CarouselItem key={index} className="pl-4 basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/3">
                                <div className="bg-white p-6 rounded-xl shadow-md h-full flex flex-col items-center text-center hover:shadow-lg transition">
                                    <img src={review.image} alt={review.name} className="w-16 h-16 rounded-full mb-4" />
                                    <p className="text-gray-600 italic mb-3">"{review.review}"</p>
                                    <h3 className="text-lg font-semibold text-gray-800">{review.name}</h3>
                                    <p className="text-sm text-gray-500">{review.position}</p>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <CarouselPrevious className="-left-10" />
                    <CarouselNext className="-right-10" />
                </Carousel>
            </div>
        </section>
    );
};

export default ReviewsCarousel;
