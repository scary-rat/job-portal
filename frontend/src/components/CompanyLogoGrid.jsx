import React from "react";

const companies = [
    {
        name: "Google",
        logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    },
    {
        name: "Amazon",
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    },
    {
        name: "Microsoft",
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    },
    {
        name: "Netflix",
        logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    },
    {
        name: "Meta",
        logo: "https://1000logos.net/wp-content/uploads/2021/10/Meta-Logo.png",
    },
    {
        name: "Apple",
        logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    },
];

const CompanyLogoGrid = () => {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">🤝 Trusted by Top Companies</h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                    {companies.map((company, index) => (
                        <div
                            key={index}
                            className="w-full aspect-[5/2] bg-gray-100 rounded-lg flex items-center justify-center p-12 shadow-sm hover:shadow-md transition duration-300"
                        >
                            <img src={company.logo} alt={company.name} className="h-full w-full object-contain" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CompanyLogoGrid;
