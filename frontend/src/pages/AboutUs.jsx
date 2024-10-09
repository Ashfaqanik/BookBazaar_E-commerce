import React from "react";

function AboutUs() {
  return (
    <div className="bg-slate-100 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto bg-slate-100 rounded-lg overflow-hidden">
        <div className="p-8">
          <h1 className="flex items-center justify-center text-3xl font-semibold text-slate-500 mb-8">
            About Us
          </h1>
          {/* Our Story */}
          <section className="mb-8">
            <h2 className="flex items-center justify-center text-2xl font-semibold text-slate-400 mb-4">
              Our Story
            </h2>
            <p className="text-gray-700 leading-relaxed">
              BookBazaar was founded with a mission to create a haven for book
              lovers. Whether you're looking for the latest bestsellers, classic
              literature, or academic resources, we provide a curated selection
              that caters to readers of all interests and ages.
            </p>
          </section>

          {/* Mission & Vision */}
          <section className="mb-8">
            <h2 className="flex items-center justify-center text-2xl font-semibold text-slate-400 mb-4">
              Mission & Vision
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our mission is to make quality literature accessible and
              affordable. We envision a world where every book finds its reader,
              fostering a lifelong love of reading and learning.
            </p>
          </section>

          {/* Contact Section */}
          <section className="text-center">
            <h2 className="text-2xl font-semibold text-slate-400 mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-700 mb-4">
              Got a question? Reach out to us at:
            </p>
            <p className="text-lg text-slate-400 font-medium">
              support@bookbazaar.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
