import Ctabutton from "./ctabutton";

export function Cta() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="text-6xl mt-16 text-center">
          <h2>
            Turn chaos into clarity. <br />
            Build your personal library of the internet.
          </h2>
        </div>
        <div className="mt-10 mb-10">
            <Ctabutton/>
        </div>
      </div>
    </>
  );
}
