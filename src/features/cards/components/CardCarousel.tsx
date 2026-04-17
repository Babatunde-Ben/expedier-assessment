"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { cn } from "@/lib/utils";
import MastercardLogo from "@/assets/icons/mastercard-logo.svg";
import Chip from "@/assets/icons/chip.svg";
import type { CardData, CardGradientVariant } from "../types";

/**
 * The world-map background lives in `public/images/` (not imported through
 * SVGR) so Babel doesn't deoptimise styling on the 700KB source file.
 */
const MAP_BG_SRC = "/images/map.svg";

/** Tailwind v4: `bg-linear-to-*` + stop utilities (see tailwindcss.com/docs/gradient-color-stops). */
const CARD_GRADIENT_CLASSES: Record<CardGradientVariant, string> = {
  "purple-blue": "bg-linear-to-br from-[#6B3FD8] to-[#4535C8]",
  blue: "bg-linear-to-br from-[#1A60F5] to-[#0047D6]",
  dark: "bg-linear-to-br from-[#011831] to-[#0a3060]",
};

const formatBalance = (n: number, currency = "$") =>
  `${currency}${n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

function CreditCard({ card, isActive }: { card: CardData; isActive: boolean }) {
  const gradientClass =
    CARD_GRADIENT_CLASSES[card.gradient] ?? CARD_GRADIENT_CLASSES.blue;
  const [hidden, setHidden] = useState(false);
  const displayBalance = hidden
    ? "****"
    : formatBalance(card.balance, card.currency);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[18px] text-white select-none shadow-xl w-full aspect-[360/230]",
      )}
      aria-label={`${card.label} ending in ${card.number.slice(-4)}`}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[18px] z-0",
          gradientClass,
        )}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0 z-1 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${MAP_BG_SRC})` }}
        aria-hidden="true"
      />

      {/* Content */}
      <div
        className={cn("relative z-2 flex h-full flex-col justify-between p-6")}
      >
        {/* Top row: chip + label + mastercard */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Chip
              className={cn(isActive ? "size-10" : "size-7")}
              aria-hidden="true"
            />
            <span
              className={cn(
                "font-semibold",
                isActive ? "text-base" : "text-sm",
              )}
            >
              {card.label}
            </span>
          </div>
          <MastercardLogo
            className={cn(isActive ? "size-12" : "size-8")}
            aria-hidden="true"
          />
        </div>

        {/* Middle: balance */}
        <div className="flex items-center justify-between">
          <p
            className={cn(
              "font-bold leading-none tabular-nums",
              isActive ? "text-4xl" : "text-2xl",
            )}
          >
            {displayBalance}
          </p>
          {isActive && (
            <button
              type="button"
              onClick={() => setHidden((v) => !v)}
              aria-label={hidden ? "Show card balance" : "Hide card balance"}
              aria-pressed={hidden}
              className="flex size-8 shrink-0 items-center justify-center rounded-full text-white/90 hover:bg-white/10 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              {hidden ? (
                <Eye className="size-5" aria-hidden="true" />
              ) : (
                <EyeOff className="size-5" aria-hidden="true" />
              )}
            </button>
          )}
        </div>

        {/* Bottom: card number + expiry */}
        <div
          className={cn(
            "flex items-end justify-between gap-4",
            isActive ? "text-sm" : "text-xs",
          )}
        >
          <div className="min-w-0">
            <p className="mb-1 text-white text-xs">Card Number</p>
            <p className="font-bold text-base tracking-[0.15em] truncate">
              {card.number}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="mb-1 text-white text-xs">Exp. Date</p>

            <p className="font-bold text-base">{card.expiry}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CardCarouselProps {
  cards: CardData[];
}

export function CardCarousel({ cards }: CardCarouselProps) {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(cards.length <= 1);

  return (
    <div className="w-full min-w-0 max-w-full overflow-x-clip">
      <Swiper
        modules={[EffectCoverflow]}
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView="auto"
        spaceBetween={7}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 160,
          modifier: 1.6,
          scale: 0.85,
          slideShadows: false,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setActiveIndex(swiper.activeIndex);
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        className="min-w-0 w-full max-w-full"
        aria-label="Credit cards carousel"
      >
        {cards.map((card, idx) => (
          <SwiperSlide
            key={card.id}
            style={{ width: 360, maxWidth: "100%" }}
            className="!h-auto"
            aria-roledescription="slide"
            aria-label={`Card ${idx + 1} of ${cards.length}`}
          >
            <CreditCard card={card} isActive={idx === activeIndex} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation arrows */}
      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          disabled={isBeginning}
          aria-label="Previous card"
          className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          disabled={isEnd}
          aria-label="Next card"
          className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowRight className="size-5" />
        </button>
      </div>

      <p className="sr-only" aria-live="polite">
        Card {activeIndex + 1} of {cards.length}
      </p>
    </div>
  );
}
