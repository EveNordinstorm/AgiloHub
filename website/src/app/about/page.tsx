import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbTack } from "@fortawesome/free-solid-svg-icons";

export default function AboutPage() {
  return (
    <div className="bg-dark-blue">
      <section>
        <h2 className="text-white font-semibold text-2xl md:text-3xl xl:text-4xl text-center pt-10">
          About Us
        </h2>
        <div className="p-10 md:px-24">
          <div className="flex justify-center">
            <FontAwesomeIcon
              icon={faThumbTack}
              className="text-yellow text-4xl md:text-5xl absolute"
            />
          </div>

          <div className="bg-primary-blue p-6 md:p-10 text-white mt-5">
            <p className="my-4 text-base md:text-lg">
              AgiloHub started as a solution to organise our startup dev team.
              We found making our daily workload fun through gamification,
              having full insight into our project timeline, and easy connection
              to everyone involved, so crucial in our success that we had to
              bring it to other teams.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
