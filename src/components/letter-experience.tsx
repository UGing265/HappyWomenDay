"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { GreetingContent } from "@/content/greeting";

export type LetterPhase = "closed" | "opening" | "open" | "closing";

interface LetterExperienceProps {
  greeting: GreetingContent;
}

export function LetterExperience({ greeting }: LetterExperienceProps) {
  const [phase, setPhase] = useState<LetterPhase>("closed");
  const phaseRef = useRef<LetterPhase>("closed");
  const actionIdRef = useRef<number>(0);
  const activeAnimationsRef = useRef<Animation[]>([]);

  const sceneRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const paperRef = useRef<HTMLElement>(null);
  const letterHeadingRef = useRef<HTMLHeadingElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Synchronize phaseRef with state
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // Clean up active animations
  const cancelAllAnimations = useCallback(() => {
    activeAnimationsRef.current.forEach((anim) => {
      try {
        anim.cancel();
      } catch {
        // Ignored
      }
    });
    activeAnimationsRef.current = [];
  }, []);

  // Check reduced motion preference
  const isReducedMotion = useCallback(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Open Letter Action (Forward FLIP)
  // Unmount lifecycle cleanup to invalidate in-flight async actions
  useEffect(() => {
    const tokenRef = actionIdRef;
    return () => {
      tokenRef.current++;
      cancelAllAnimations();
    };
  }, [cancelAllAnimations]);

  const handleOpen = useCallback(async () => {
    if (phaseRef.current !== "closed") return;

    const actionId = ++actionIdRef.current;
    cancelAllAnimations();

    if (isReducedMotion()) {
      phaseRef.current = "open";
      setPhase("open");
      if (paperRef.current) {
        paperRef.current.removeAttribute("inert");
        paperRef.current.setAttribute("aria-hidden", "false");
      }
      setTimeout(() => {
        letterHeadingRef.current?.focus({ preventScroll: true });
      }, 0);
      return;
    }

    phaseRef.current = "opening";
    setPhase("opening");

    const seal = sealRef.current;
    const flap = flapRef.current;
    const paper = paperRef.current;

    if (!seal || !flap || !paper) {
      phaseRef.current = "open";
      setPhase("open");
      return;
    }

    try {
      // Step 1: Seal fades and shrinks slightly
      const sealAnim = seal.animate(
        [
          { transform: "scale(1)", opacity: "1" },
          { transform: "scale(1.15) translateY(-6px)", opacity: "0.95", offset: 0.3 },
          { transform: "scale(0.5) translateY(12px)", opacity: "0" },
        ],
        {
          duration: 200,
          easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
          fill: "forwards",
        }
      );
      activeAnimationsRef.current.push(sealAnim);
      await sealAnim.finished;
      if (actionIdRef.current !== actionId) return;

      // Step 2: Flap rotates backwards 180deg
      const flapAnim = flap.animate(
        [
          { transform: "rotateX(0deg)" },
          { transform: "rotateX(180deg)" },
        ],
        {
          duration: 380,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          fill: "forwards",
        }
      );
      activeAnimationsRef.current.push(flapAnim);
      await flapAnim.finished;
      if (actionIdRef.current !== actionId) return;

      // Step 3: Paper slides out of envelope pocket
      const paperSlideAnim = paper.animate(
        [
          { transform: "translate(-50%, -50%)", opacity: "0.95" },
          { transform: "translate(-50%, calc(-50% - 150px))", opacity: "1" },
        ],
        {
          duration: 480,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          fill: "forwards",
        }
      );
      activeAnimationsRef.current.push(paperSlideAnim);
      await paperSlideAnim.finished;
      if (actionIdRef.current !== actionId) return;

      // Measure rect before layout change
      const firstRect = paper.getBoundingClientRect();

      phaseRef.current = "open";
      setPhase("open");
      if (paper) {
        paper.removeAttribute("inert");
        paper.setAttribute("aria-hidden", "false");
      }

      // Wait for next frame so reading layout is committed in DOM
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      if (actionIdRef.current !== actionId || !paper) return;

      const lastRect = paper.getBoundingClientRect();
      const deltaX = firstRect.left - lastRect.left;
      const deltaY = firstRect.top - lastRect.top;
      const scaleX = firstRect.width / Math.max(lastRect.width, 1);
      const scaleY = Math.min(firstRect.height / Math.max(lastRect.height, 1), 1);

      cancelAllAnimations();

      // Step 4: FLIP animation to full paper reading size
      const flipAnim = paper.animate(
        [
          {
            transform: `translate(${deltaX}px, ${deltaY}px) scale(${scaleX}, ${scaleY})`,
            transformOrigin: "top center",
          },
          {
            transform: "none",
            transformOrigin: "top center",
          },
        ],
        {
          duration: 360,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          fill: "forwards",
        }
      );
      activeAnimationsRef.current.push(flipAnim);

      // Staggered reveal for reading paragraphs
      const textElements = paper.querySelectorAll<HTMLElement>(
        ".letter-p, .letter-closing-box, .letter-footer"
      );
      const textPromises: Promise<Animation>[] = [];
      textElements.forEach((el, index) => {
        const textAnim = el.animate(
          [
            { opacity: 0, transform: "translateY(14px)" },
            { opacity: 1, transform: "none" },
          ],
          {
            duration: 300,
            delay: 120 + index * 60,
            easing: "ease-out",
            fill: "both",
          }
        );
        activeAnimationsRef.current.push(textAnim);
        textPromises.push(textAnim.finished);
      });
      await flipAnim.finished;
      if (actionIdRef.current !== actionId) return;

      setTimeout(() => {
        letterHeadingRef.current?.focus({ preventScroll: true });
      }, 0);

      await Promise.all(textPromises);
      if (actionIdRef.current !== actionId) return;

      cancelAllAnimations();
    } catch {
      // Animation was canceled, handled by actionIdRef check
    }
  }, [cancelAllAnimations, isReducedMotion]);

  // Close Letter Action (Measured Reverse FLIP & WAAPI Lifecycle)
  const handleClose = useCallback(async () => {
    if (phaseRef.current !== "open") return;

    const actionId = ++actionIdRef.current;
    cancelAllAnimations();

    if (isReducedMotion()) {
      if (typeof window !== "undefined") {
        window.scrollTo({ top: sceneRef.current?.offsetTop || 0, behavior: "auto" });
      }
      phaseRef.current = "closed";
      setPhase("closed");
      if (paperRef.current) {
        paperRef.current.setAttribute("inert", "");
        paperRef.current.setAttribute("aria-hidden", "true");
      }
      setTimeout(() => {
        openButtonRef.current?.focus({ preventScroll: true });
      }, 0);
      return;
    }

    const seal = sealRef.current;
    const flap = flapRef.current;
    const paper = paperRef.current;

    if (!paper || !flap || !seal) {
      phaseRef.current = "closed";
      setPhase("closed");
      return;
    }

    try {
      // Step 1: Smooth scroll back to scene top if reader scrolled down
      if (typeof window !== "undefined") {
        window.scrollTo({
          top: sceneRef.current?.offsetTop || 0,
          behavior: "smooth",
        });
      }

      // Step 2: Fade out reading text content
      const content = paper.querySelector<HTMLElement>(
        ".letter-content-inner"
      );
      if (content) {
        const contentFade = content.animate(
          [
            { opacity: 1, transform: "scale(1)" },
            { opacity: 0, transform: "scale(0.96)" },
          ],
          {
            duration: 180,
            easing: "ease-in",
            fill: "forwards",
          }
        );
        activeAnimationsRef.current.push(contentFade);
        await contentFade.finished;
      }
      if (actionIdRef.current !== actionId) return;

      // Step 3: Measure source rect before leaving reading layout
      const openRect = paper.getBoundingClientRect();

      // Switch to closing phase to restore envelope pocket layout
      phaseRef.current = "closing";
      setPhase("closing");

      // Wait for layout update to get destination pocket rect
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      if (actionIdRef.current !== actionId || !paper) return;

      // Step 4: Measure destination rect in envelope pocket
      const targetRect = paper.getBoundingClientRect();
      const deltaX = openRect.left - targetRect.left;
      const deltaY = openRect.top - targetRect.top;
      const scaleX = openRect.width / Math.max(targetRect.width, 1);
      const scaleY = openRect.height / Math.max(targetRect.height, 1);

      // Step 5: Reverse FLIP animation from open rect to raised pocket position
      const reverseFlipAnim = paper.animate(
        [
          {
            transform: `translate(${deltaX}px, ${deltaY}px) scale(${scaleX}, ${scaleY})`,
            transformOrigin: "top center",
            opacity: 1,
          },
          {
            transform: "translate(-50%, calc(-50% - 150px)) scale(1, 1)",
            transformOrigin: "top center",
            opacity: 1,
          },
        ],
        {
          duration: 380,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          fill: "forwards",
        }
      );
      activeAnimationsRef.current.push(reverseFlipAnim);
      await reverseFlipAnim.finished;
      if (actionIdRef.current !== actionId) return;

      // Step 6: Paper slides down into envelope pocket
      const paperReturnAnim = paper.animate(
        [
          { transform: "translate(-50%, calc(-50% - 150px))", opacity: "1" },
          { transform: "translate(-50%, -50%)", opacity: "0.95" },
        ],
        {
          duration: 420,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          fill: "forwards",
        }
      );
      activeAnimationsRef.current.push(paperReturnAnim);
      await paperReturnAnim.finished;
      if (actionIdRef.current !== actionId) return;

      // Step 7: Flap folds closed over pocket
      const flapCloseAnim = flap.animate(
        [
          { transform: "rotateX(180deg)" },
          { transform: "rotateX(0deg)" },
        ],
        {
          duration: 360,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          fill: "forwards",
        }
      );
      activeAnimationsRef.current.push(flapCloseAnim);
      await flapCloseAnim.finished;
      if (actionIdRef.current !== actionId) return;

      // Step 8: Seal returns
      const sealReturnAnim = seal.animate(
        [
          { transform: "scale(0.5) translateY(12px)", opacity: "0" },
          { transform: "scale(1)", opacity: "1" },
        ],
        {
          duration: 200,
          easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
          fill: "forwards",
        }
      );
      activeAnimationsRef.current.push(sealReturnAnim);
      await sealReturnAnim.finished;
      if (actionIdRef.current !== actionId) return;

      // Step 9: Settle clean closed state
      cancelAllAnimations();
      phaseRef.current = "closed";
      setPhase("closed");
      if (paperRef.current) {
        paperRef.current.setAttribute("inert", "");
        paperRef.current.setAttribute("aria-hidden", "true");
      }
      setTimeout(() => {
        openButtonRef.current?.focus({ preventScroll: true });
      }, 0);
    } catch {
      // Canceled intentionally
    }
  }, [cancelAllAnimations, isReducedMotion]);

  // Listen for prefers-reduced-motion changes mid-sequence and settle immediately
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleMotionChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        if (phaseRef.current === "opening") {
          actionIdRef.current++;
          cancelAllAnimations();
          phaseRef.current = "open";
          setPhase("open");
          if (paperRef.current) {
            paperRef.current.removeAttribute("inert");
            paperRef.current.setAttribute("aria-hidden", "false");
          }
          setTimeout(() => {
            letterHeadingRef.current?.focus({ preventScroll: true });
          }, 0);
        } else if (phaseRef.current === "closing") {
          actionIdRef.current++;
          cancelAllAnimations();
          phaseRef.current = "closed";
          setPhase("closed");
          if (paperRef.current) {
            paperRef.current.setAttribute("inert", "");
            paperRef.current.setAttribute("aria-hidden", "true");
          }
          setTimeout(() => {
            openButtonRef.current?.focus({ preventScroll: true });
          }, 0);
        }
      }
    };

    try {
      mediaQuery.addEventListener("change", handleMotionChange);
    } catch {
      mediaQuery.addListener(handleMotionChange);
    }

    return () => {
      try {
        mediaQuery.removeEventListener("change", handleMotionChange);
      } catch {
        mediaQuery.removeListener(handleMotionChange);
      }
    };
  }, [cancelAllAnimations]);

  // Resize & Orientation Change handling
  useEffect(() => {
    const handleResize = () => {
      if (phaseRef.current === "opening") {
        actionIdRef.current++;
        cancelAllAnimations();
        phaseRef.current = "open";
        setPhase("open");
        if (paperRef.current) {
          paperRef.current.removeAttribute("inert");
          paperRef.current.setAttribute("aria-hidden", "false");
        }
        setTimeout(() => {
          letterHeadingRef.current?.focus({ preventScroll: true });
        }, 0);
      } else if (phaseRef.current === "closing") {
        actionIdRef.current++;
        cancelAllAnimations();
        phaseRef.current = "closed";
        setPhase("closed");
        if (paperRef.current) {
          paperRef.current.setAttribute("inert", "");
          paperRef.current.setAttribute("aria-hidden", "true");
        }
        setTimeout(() => {
          openButtonRef.current?.focus({ preventScroll: true });
        }, 0);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      cancelAllAnimations();
    };
  }, [cancelAllAnimations]);

  const isOpen = phase === "open";
  const isClosed = phase === "closed";

  return (
    <div
      ref={sceneRef}
      className="scene-wrapper"
      data-phase={phase}
    >
      {/* Occasion Header Tag */}
      <div className="occasion-badge" aria-label={greeting.occasion}>
        <span className="sparkle-icon" aria-hidden="true">✦</span>
        <span className="occasion-text">{greeting.occasion}</span>
        <span className="sparkle-icon" aria-hidden="true">✦</span>
      </div>

      {/* Main Stage */}
      <div className="stage-container">
        {/* Botanical Rose Illustration */}
        <div className="rose-figure" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/artwork/rose.svg"
            alt=""
            width={320}
            height={460}
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        {/* Envelope Structure */}
        <div className="envelope-hover-wrapper">
          <div ref={envelopeRef} className="envelope" aria-hidden={isOpen}>
            {/* Back panel */}
            <div className="envelope-back" />

            {/* Front Pocket Folds */}
            <div className="envelope-pocket">
              <div className="pocket-fold-left" />
              <div className="pocket-fold-right" />
              <div className="pocket-fold-bottom" />
            </div>

            {/* Recipient Label on Front */}
            <div className="recipient-plate">
              <span className="recipient-label">{greeting.recipientLabel}</span>
            </div>

            {/* Top Folding Flap */}
            <div ref={flapRef} className="envelope-flap">
              <div className="flap-front" />
              <div className="flap-back" />
            </div>

            {/* Wax Seal Button (Opening trigger) */}
            <div ref={sealRef} className="seal-wrapper">
              <button
                type="button"
                ref={openButtonRef}
                className="seal-btn"
                onClick={handleOpen}
                aria-expanded={isOpen}
                aria-controls="letter-content"
                aria-label={`${greeting.openButton} — ${greeting.recipientLabel}`}
                tabIndex={isOpen ? -1 : 0}
              >
                {/* Embossed Rose Seal Emblem */}
                <svg
                  className="seal-inner-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 3a4 4 0 0 0-4 4c0 1.5.8 2.8 2 3.5C8 11.5 6 13.5 6 16c0 2.8 2.7 5 6 5s6-2.2 6-5c0-2.5-2-4.5-4-5.5 1.2-.7 2-2 2-3.5a4 4 0 0 0-4-4z" />
                  <path d="M12 7a1.5 1.5 0 0 0-1.5 1.5c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5A1.5 1.5 0 0 0 12 7z" />
                  <path d="M9 16c0 1.7 1.3 3 3 3s3-1.3 3-3" />
                </svg>
                <span className="seal-text">{greeting.openButton}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Single Letter Paper Article */}
        <article
          id="letter-content"
          ref={paperRef}
          className="letter-paper"
          aria-hidden={!isOpen}
          inert={!isOpen ? true : undefined}
        >
          {/* Subtle Rose Watermark */}
          <div className="paper-watermark" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/artwork/rose.svg" alt="" width={320} height={320} />
          </div>

          <div className="letter-content-inner">
            <header className="letter-header">
              <h1
                ref={letterHeadingRef}
                className="letter-title"
                tabIndex={-1}
              >
                {greeting.title}
              </h1>
              <div className="letter-ornament" aria-hidden="true">
                <span className="ornament-line" />
                <span>❀</span>
                <span className="ornament-line" />
              </div>
            </header>

            <div className="letter-body">
              {greeting.paragraphs.map((para, i) => (
                <p key={i} className="letter-p">
                  {para}
                </p>
              ))}
            </div>

            <div className="letter-closing-box">
              <p className="letter-closing-text">{greeting.closing}</p>
            </div>

            <footer className="letter-footer">
              <button
                type="button"
                ref={closeButtonRef}
                className="close-btn"
                onClick={handleClose}
                tabIndex={isOpen ? 0 : -1}
                aria-label={greeting.closeButton}
              >
                <span aria-hidden="true">✉</span>
                <span>{greeting.closeButton}</span>
              </button>
            </footer>
          </div>
        </article>
      </div>

      {/* Helpful Hint (Visible when closed) */}
      <div
        className="envelope-hint-wrapper"
        aria-hidden={!isClosed}
        style={{ display: isClosed ? "block" : "none" }}
      >
        <p className="envelope-hint">{greeting.hint}</p>
      </div>
    </div>
  );
}
