import ImageSlider from "@/components/imageSlider/imageslider";
import MainHeader from "@/components/main_header";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="hero__div">
        <div className="image__carousel">
          <ImageSlider />
        </div>
        <div className="description">
          <div className="animate__text">
            <h1>
              NextLevel Food for Foodies <br /> Who are on the Nexxxt levell!
            </h1>
          </div>
          <h4 style={{ fontFamily: "monospace", fontSize: "20px" }}>
            Taste & Share Food From All Over The World
          </h4>
          <div className="join_and_explore">
            <h2>Join the community</h2>
            <button>
              <Link
                href="/meals"
                style={{ textDecoration: "none", color: "black" }}
              >
                Explore Meals!
              </Link>
            </button>
          </div>
        </div>
      </div>
      <section className="descriptive__section">
        <h2>How it works</h2>
        <p>
          NextLevel Food is a platform for foodies to share their favorite
          recipes with the world. It&apos;s a place to discover new dishes, and
          to connect with other food lovers.
        </p>
        <p>
          NextLevel Food is a place to discover new dishes, and to connect with
          other food lovers.
        </p>
      </section>

      <section className="descriptive__section_why">
        <h2>Why NextLevel Food?</h2>
        <p>
          NextLevel Food is a platform for foodies to share their favorite
          recipes with the world. It&apos;s a place to discover new dishes, and
          to connect with other food lovers.
        </p>
        <p>
          NextLevel Food is a place to discover new dishes, and to connect with
          other food lovers.
        </p>
      </section>
    </>
  );
}
