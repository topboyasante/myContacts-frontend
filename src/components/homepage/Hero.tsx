import { Link } from "react-router-dom";
import HeroImg from "../../assets/mycontacts.png";

function Hero() {
  return (
    <section className="bg-tertiary pt-[7vh] h-screen xl:h-full w-full">
      <section className="max-w-screen-xl h-full mx-auto">
        <section className="w-full h-full flex justify-center items-center">
          <section className="p-5 xl:px-0">
            <h1 className="text-white text-3xl lg:text-5xl font-semibold text-center">
              Access your <span className="text-secondary">contacts.</span>
              <br />
              Anywhere, Anytime and on{" "}
              <span className="text-secondary">any device.</span>
            </h1>
            <p className="my-5 text-white text-center md:w-[80%] mx-auto">
              Unlock the Power of Seamless Contact Access. Wherever You Are,
              Whenever You Need, on Any Device
            </p>
            <section className="flex justify-center">
              <Link to={`/auth/sign-up`}>
                <button className="bg-secondary text-tertiary rounded-full p-2 w-[150px]">
                  Get Started
                </button>
              </Link>
            </section>
            <section className="flex justify-center items-center xl:w-[1000px] mx-auto">
              <img src={HeroImg} alt="hero" className="w-full" />
            </section>
          </section>
        </section>
      </section>
    </section>
  );
}

export default Hero;
