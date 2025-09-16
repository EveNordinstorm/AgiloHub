import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbTack,
  faQuoteLeft,
  faQuoteRight,
} from "@fortawesome/free-solid-svg-icons";

export interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
}

export function TestimonialCard({ quote, name, title }: TestimonialCardProps) {
  return (
    <div>
      <div className="flex justify-center">
        <FontAwesomeIcon
          icon={faThumbTack}
          className="text-primary-purple w-10 h-10 md:w-12 md:h-12 absolute"
        />
      </div>

      <div className="bg-dark-purple p-6 md:p-10 text-white mt-5">
        <FontAwesomeIcon icon={faQuoteLeft} className="w-5 h-5 md:w-8 md:h-8" />
        <p className="my-4 text-base md:text-lg">{quote}</p>
        <div className="flex justify-end">
          <FontAwesomeIcon
            icon={faQuoteRight}
            className="w-5 h-5 md:w-8 md:h-8"
          />
        </div>

        <h3 className="text-lg md:text-xl font-semibold mt-3">{name}</h3>
        <p className="text-sm md:text-base mt-2">{title}</p>
      </div>
    </div>
  );
}
