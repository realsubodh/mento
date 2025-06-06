import { Menu } from "../components/landing/navbar-menu";
import logo from "../assets/logomento.png";
import { Button } from "../components/landing/button";
import { useNavigate } from "react-router-dom";
import { Heading } from "../components/landing/header";
import { Title } from "../components/landing/heading";
import Dashboard from "../assets/dashboard.png";
import { WobbleCard } from "../components/landing/wobble-card";
import { Cta } from "../components/landing/cta";
import { Footer } from "../components/landing/footer";
export const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* First Page */}
      <div
        className=" min-h-screen w-full flex flex-col items-center justify-between gap-36 sm:gap-24 md:gap-24 lg:gap-50"
        style={{ backgroundColor: "oklch(0.923 0.003 48.717)" }}
      >
        <div className=" flex justify-center">
          <Menu>
            <img src={logo} alt="Logo" className="h-35 w-auto " />
            <Button label={"Login"} onClick={() => navigate("/signin")} />
          </Menu>
        </div>
        <div className="w-[60%] h-auto">
          <Heading />
          <img
            src={Dashboard}
            alt=""
            className="w-full h-fit rounded-4xl text-center mt-10 mb-10"
          />
        </div>
      </div>

      {/* Second Page */}
      <div className="w-full min-h-screen flex flex-col items-center bg-black">
        <Title />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl p-15 pt-0 mx-auto w-full mt-20">
          <WobbleCard
            containerClassName="col-span-1 lg:col-span-2 h-full bg-gradient-to-br from-purple-800 to-indigo-700 min-h-[500px] lg:min-h-[300px]"
            className=""
          >
            <div className="max-w-md">
              <h2 className="text-left text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-white">
                Save What Matters, Instantly.
              </h2>
              <p className="mt-4 text-left text-base text-neutral-200">
                Mento helps you bookmark videos, posts, and resources with smart
                tags so you never lose a gem again.
              </p>
            </div>
            <img
              src="/dash.webp"
              width={400}
              height={400}
              alt="Save demo"
              className="absolute -right-10 lg:-right-[25%] -bottom-7 object-contain rounded-2xl"
            />
          </WobbleCard>

          <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-gradient-to-br from-pink-600 to-rose-500">
            <h2 className="max-w-80 text-left text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-white">
              Smarter Search, Less Scroll.
            </h2>
            <p className="mt-4 text-left text-base text-neutral-100">
              Use intelligent search and filters to retrieve your saved content
              in seconds — no more endless scrolling.
            </p>
          </WobbleCard>

          <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-gradient-to-br from-blue-900 to-blue-700 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
            <div className="max-w-md">
              <h2 className="text-left text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-white">
                Start Your Mento Journey Today.
              </h2>
              <p className="mt-4 text-left text-base text-neutral-200">
                In a world overflowing with content, keeping track of valuable
                insights, reels, videos, and resources shouldn’t be a chore.
                <br /> Join early adopters who are taking control of their
                digital memory. It's free and powerful.
              </p>
            </div>
            <img
              src="/human.webp"
              width={400}
              height={400}
              alt="User journey demo"
              className="absolute -right-10 md:-right-[15%] lg:-right-[10%] -bottom-10 object-contain rounded-2xl"
            />
          </WobbleCard>
        </div>
      </div>

      {/* Third page */}
      <div className="w-full h-fit sm:min-h-[500px] md:min-h-[600px] flex items-center justify-center px-4">
        <div className="w-full max-w-6xl bg-black/100 backdrop-blur-lg m-6 rounded-2xl p-5 md:m-[5%] shadow-lg">
          <img
            src="/mentoarch.png"
            alt="Mento Architecture"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* Fourth Page */}
      <div className="w-full h-fit">
        <Cta />
      </div>

      {/* Footer */}
      <div>
        <Footer />
      </div>
    </>
  );
};
