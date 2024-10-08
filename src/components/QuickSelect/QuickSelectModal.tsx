// @ts-nocheck
"use client";
import { useRecoilState } from "recoil";
import Image from "next/image";
import classNames from "classnames";
import { useEffect, useRef, useCallback } from "react";
import closeButton from "@/../public/components/modal/closeModal.svg";
import { quickSelectAtom } from "@/presentation/atoms/quickSelectAtom";
import { cardsData } from "@/data/quickSelectCards";
import { QuickSelectCard } from "./QuickSelectCard";

export function QuickSelectModal() {
  const [modalState, setModalState] = useRecoilState(quickSelectAtom);
  const modalRef = useRef(null);

  const onClose = useCallback(() => {
    setModalState({ open: false });
  }, [setModalState]);


  useEffect(() => {
    function handleClickOutside(event: { target: any; }) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, onClose]);

  return (
    <div
      className={classNames(
        "fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 transition-opacity z-50",
        { hidden: !modalState.open }
      )}
    >
      <div ref={modalRef} className="rounded-lg w-full max-w-5xl max-h-full overflow-y-auto">
        <header className="flex justify-end pb-5">
          <button type="button" onClick={onClose} aria-label="Close modal">
            <Image width={30} src={closeButton} alt="Close modal button" />
          </button>
        </header>
        <main className="grid sm:grid-cols-2 gap-2 justify-items-center justify-center lg:gap-9 lg:grid-cols-3">
          {cardsData.map((item) => (
            <QuickSelectCard
              key={item.alt}
              direction={item.direction}
              alt={item.alt}
              buttonImg={item.buttonImg}
              text={item.text}
              locationImage={item.locationImage}
              onClick={onClose}
            />
          ))}
        </main>
      </div>
    </div>
  );
}
