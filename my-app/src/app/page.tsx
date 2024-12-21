"use client";
import Footer from "./components/footer/footer";
import Auth from "./(pages)/auth/page";

export default function Home() {
  return (
    <div className="home-component">
      <div className="home-component-in">
       <Auth/>
      </div>
      <div className="home-component-footer">
        <Footer />
      </div>
    </div>
  );
}
