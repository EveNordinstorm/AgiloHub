import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggle, AccordionItem } from "./AccordionSlice";

interface Props {
  items: AccordionItem[];
}

export default function AccordionWeb({ items }: Props) {
  const dispatch = useAppDispatch();
  const openIndex = useAppSelector((state) => state.accordion.openIndex);

  return (
    <div className="border rounded-lg">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => dispatch(toggle(i))}
            className="w-full p-4 bg-gray-200 text-left"
          >
            {item.title}
          </button>
          {openIndex === i && (
            <div className="p-4 bg-white">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
}
