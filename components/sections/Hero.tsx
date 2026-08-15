"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  FaReact, FaAws, FaDocker, FaNodeJs, FaGithub,
  FaTwitter, FaLinkedin, FaInstagram, FaGoogle, FaApple
} from "react-icons/fa";
import {
  SiNextdotjs, SiVercel, SiRedux, SiTypescript, SiFacebook
} from "react-icons/si";

const fallbackUrls = [
  "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
  "https://upload.wikimedia.org/wikipedia/commons/9/96/Among_Us_icon.png"
];

const iconConfigs = [
  { Icon: FaReact, color: "#61DAFB" },
  { Icon: FaAws, color: "#FF9900" },
  { Icon: FaDocker, color: "#2496ED" },
  { Icon: FaNodeJs, color: "#339933" },
  { Icon: SiNextdotjs, color: "#000000" },
  { Icon: SiVercel, color: "#000000" },
  { Icon: SiRedux, color: "#764ABC" },
  { Icon: SiTypescript, color: "#3178C6" },
  { Icon: FaGithub, color: "#181717" },
  { Icon: FaTwitter, color: "#1DA1F2" },
  { Icon: FaLinkedin, color: "#0077B5" },
  { Icon: FaInstagram, color: "#E1306C" },
  { Icon: FaGoogle, color: "#DB4437" },
  { Icon: FaApple, color: "#000000" },
  { Icon: SiFacebook, color: "#1877F2" },
  { Icon: null, img: fallbackUrls[0] },
  { Icon: null, img: fallbackUrls[1] },
];

export function Hero() {
  const orbitCount = 3;
  const orbitGap = 12; // rem between orbits
  const iconsPerOrbit = Math.ceil(iconConfigs.length / orbitCount);

  return (
    <section className="relative w-full overflow-hidden bg-background text-foreground pt-20 lg:pt-32 pb-10 min-h-[800px]">
      <div className="container px-4 md:px-6 mx-auto flex flex-col lg:flex-row justify-between relative z-10">

        {/* Left side: Heading and Text */}
        <div className="w-full lg:w-1/2 flex flex-col space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
              Website + Automation Agency
            </span>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-7xl/none text-foreground">
              We build the systems that let your business <span className="text-primary">run itself.</span>
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl leading-relaxed">
              Outcome-focused automation and high-performance design for small teams ready to scale without expanding headcount.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="#contact" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto">
                Contact Us
              </Button>
            </Link>
            <Link href="#projects" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                See Our Work
              </Button>
            </Link>
          </div>

          <div className="pt-6 pb-6 px-6 bento-card border border-[#29292d]">
            <p className="text-sm font-bold text-primary mb-1 tracking-wider uppercase">
              BUILT FOR SERVICE PROFESSIONALS
            </p>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Dental clinics, real estate agencies, architects, interior designers & law firms.
            </p>
          </div>
        </div>
      </div>

      {/* Right side: Orbit animation (Absolute to right edge of page) */}
      <div className="absolute right-0 top-0 lg:-top-16 w-full lg:w-[65rem] h-[500px] lg:h-[900px] flex items-center justify-end overflow-hidden opacity-50 lg:opacity-100 z-0 pointer-events-none">
        {/* translate-x to crop exactly at the edge */}
        <div className="relative w-[50rem] h-[50rem] lg:w-[65rem] lg:h-[65rem] translate-x-[25%] lg:translate-x-[50%] flex items-center justify-center">

          {/* Center Circle */}
          <div className="relative z-10 flex h-36 w-36 flex-col items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl">
            <span className="font-heading font-bold text-2xl text-center leading-tight">Zenlio<br />OS</span>
          </div>

          {/* Generate Orbits */}
          {[...Array(orbitCount)].map((_, orbitIdx) => {
            const size = `${20 + orbitGap * (orbitIdx + 1)}rem`; // equal spacing
            const angleStep = (2 * Math.PI) / iconsPerOrbit;

            return (
              <div
                key={orbitIdx}
                className="absolute rounded-full border border-dashed border-border/60"
                style={{
                  width: size,
                  height: size,
                  animation: `spin ${20 + orbitIdx * 10}s linear infinite`,
                }}
              >
                {iconConfigs
                  .slice(orbitIdx * iconsPerOrbit, orbitIdx * iconsPerOrbit + iconsPerOrbit)
                  .map((cfg, iconIdx) => {
                    const angle = iconIdx * angleStep;
                    const x = (50 + 50 * Math.cos(angle)).toFixed(4);
                    const y = (50 + 50 * Math.sin(angle)).toFixed(4);

                    return (
                      <div
                        key={iconIdx}
                        className="absolute bg-background border border-border rounded-full p-3 shadow-sm flex items-center justify-center"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: "translate(-50%, -50%)",
                          animation: `spinReverse ${20 + orbitIdx * 10}s linear infinite`,
                        }}
                      >
                        {cfg.Icon ? (
                          <cfg.Icon className="w-8 h-8" style={{ color: cfg.color === "#000000" ? "var(--foreground)" : cfg.color }} />
                        ) : (
                          <img
                            src={cfg.img}
                            alt="icon"
                            className="w-8 h-8 object-contain"
                          />
                        )}
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
