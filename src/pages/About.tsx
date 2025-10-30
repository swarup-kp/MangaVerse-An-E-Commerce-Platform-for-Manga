import React from "react";

const teamMembers = [
  {
    name: "Swarup Kumar Patro",
    role: "Founder & CEO",
    img: "https://via.placeholder.com/150",
    bio: "Passionate about manga and bringing the best collection to fans.",
  },
  {
    name: "K Mercy",
    role: "Lead Designer",
    img: "https://via.placeholder.com/150",
    bio: "Designs beautiful user experiences and interfaces for MangaVerse.",
  },
  {
    name: "B Akhil Kumar",
    role: "Lead Developer",
    img: "https://via.placeholder.com/150",
    bio: "Ensures smooth functionality and fast performance for the website.",
  },
];

const About: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-rose-50 via-amber-50 to-rose-100 min-h-screen font-sans">
      {/* Hero Section */}
      <section className="text-center py-24 bg-gradient-to-r from-rose-200 via-pink-200 to-amber-200 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-rose-700 animate-fadeIn">
            About MangaVerse
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-6 text-rose-800 animate-fadeIn delay-200">
            We are dedicated to bringing your favorite manga to your fingertips with a modern shopping experience.
          </p>
          <a
            href="/shop"
            className="bg-rose-700 text-white font-semibold px-6 py-3 rounded-lg hover:bg-rose-600 transition animate-fadeIn delay-400 shadow-lg"
          >
            Explore Shop
          </a>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto py-16 px-6">
        <h2 className="text-4xl font-bold mb-6 text-rose-700 text-center">
          Our Mission
        </h2>
        <p className="text-gray-700 text-lg max-w-3xl mx-auto text-center leading-relaxed">
          MangaVerse is built for manga enthusiasts. Our goal is to provide an easy-to-use platform where fans can discover, shop, and share their favorite manga. 
          We focus on curated collections, great customer experience, and fostering a vibrant manga community.
        </p>
      </section>

      {/* Team Section */}
      <section className="container mx-auto py-16 px-6">
        <h2 className="text-4xl font-bold mb-12 text-rose-700 text-center">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition transform hover:-translate-y-2"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-rose-800">{member.name}</h3>
              <p className="text-rose-600 mb-2">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-action */}
      <section className="text-center py-16 bg-amber-50">
        <h2 className="text-3xl font-bold mb-4 text-rose-700">
          Can't Decide?
        </h2>
        <p className="mb-6 text-gray-700">
          Explore our shop and discover featured manga collections to find your next favorite series!
        </p>
        <a
          href="/shop"
          className="bg-rose-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-rose-600 transition shadow-md"
        >
          Browse Shop
        </a>
      </section>
    </div>
  );
};

export default About;
