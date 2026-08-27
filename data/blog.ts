export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  coverImage: string;
  excerpt: string;
  content: string;
  isSample?: boolean;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "iftex-clean-system-23",
    slug: "iftex-clean-system-23-fuel-guide",
    title: "IFTEX Clean System 23: The Real Science of Fuel Injector Health & Ethanol Blends",
    date: "Aug 27, 2026",
    readTime: "7 min read",
    category: "Maintenance",
    coverImage: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1200&auto=format&fit=crop",
    author: {
      name: "Moe",
      role: "Creator & Builder",
    },
    excerpt:
      "Every modern motorcycle engine eventually suffers from rough idle, sluggish throttle pickup, and dropped mileage. Here is what actually happens inside your combustion chambers with ethanol fuels, and why dedicated detergent additives matter.",
    content: `
## Introduction: The Invisible Enemy Inside Your Fuel Rail

If you ride a modern high-compression motorcycle in India or anywhere ethanol-blended fuel is standard, you have likely noticed subtle changes in your bike's temperament over time. A morning cold start that takes an extra crank, a momentary stutter when opening the throttle off idle, or an exhaust note that sounds slightly hollower than usual.

Most riders blame spark plugs, throttle position sensors, or bad tuning. In reality, over 80% of these progressive drivability issues trace directly back to one root cause: **microscopic carbon buildup and varnish fouling inside fuel injector pintles and intake valve backsides**.

In this guide, we break down the chemistry of fuel additives, what makes IFTEX Clean System 23 distinct, and how to maintain pristine fuel delivery over tens of thousands of kilometers.

---

## The Reality of Ethanol-Blended Fuels (E10 & E20)

Fuel sold across pumps today contains anywhere from 10% to 20% ethanol. While ethanol provides an octane boost, it carries two significant drawbacks for high-performance motorcycle engines:

1. **Hygroscopic Moisture Absorption**: Ethanol naturally attracts atmospheric moisture. Over time in a motorcycle tank—especially during seasonal weather changes—water accumulates at the bottom of the fuel cell in a process known as phase separation.
2. **Thermal Oxidation and Gum Formation**: Modern multi-cylinder engines run high fuel rail pressures (often exceeding 40–50 PSI) and operate in dense stop-and-go heat. Heat soaking into the fuel rail bakes unstable fuel fractions into sticky varnish deposits.

When fuel injectors fire at 8,000 to 12,000 RPM, the injection pulse duration is measured in milliseconds. Any varnish on the pintle tip disrupts the atomized conical spray pattern into irregular droplets. Big droplets do not vaporize quickly; they burn incompletely, depositing heavy soot on the piston crown and intake tract.

---

## What Is IFTEX Clean System 23?

IFTEX Clean System 23 is a specialized multi-functional fuel additive engineered specifically for modern port fuel-injected and carbureted gasoline engines. Unlike generic kerosene-based booster bottles that only act as light solvents, Clean System 23 relies on concentrated **Polyetheramine (PEA) and Polyisobutylene (PIB) detergent chemistry**.

### The Mechanism of Action

- **Detergency & Varnish Dissolution**: PEA molecules survive the high temperatures of the intake tract and combustion chamber. They chemically bond with carbon matrices and dissolve lacquer bonds without abrasive action.
- **Corrosion Inhibition**: It deposits a sub-micron protective film across metal fuel lines, injector tips, and tank seams, counteracting the corrosive acidity of ethanol moisture.
- **Combustion Chamber De-Coking**: Over a full tank cycle, hard carbon deposits on the piston crowns are progressively softened and carried out through the exhaust as harmless microscopic particles.

---

## Fuel Injector Spray Pattern Comparison

| Condition | Atomization Quality | Combustion Efficiency | Observable Symptoms |
| :--- | :--- | :--- | :--- |
| **Pristine Injector** | 50-micron uniform mist | 98%+ complete burn | Crisp throttle pickup, linear power, clean plugs |
| **Varnished Injector** | Asymmetric stream & drips | Incomplete localized burn | Low-RPM stumble, surging at steady cruise |
| **Severe Carbon Fouling** | Restricted flow rate (-15%) | Lean cylinder condition | High exhaust gas temps, knock, hard cold starts |

---

## Practical Application: Dosage, Ratios & Step-by-Step Usage

The key to getting real results from Clean System 23 is accurate measurement. Over-dosing does not clean faster and can temporarily alter flame speed, while under-dosing will fail to reach the critical cleaning concentration.

### Dosage Guidelines

- **Therapeutic / Shock Dose (For rough running bikes)**: 1 ml per 1 Liter of petrol (e.g., 15 ml for a 15-liter tank).
- **Preventive Maintenance Dose (Every 2,000 to 3,000 KM)**: 0.5 ml per 1 Liter of petrol.

### How to Add It Properly

1. **Always add Clean System 23 at the petrol station BEFORE pumping fuel**: Pouring the measured dosage into an empty or near-empty tank ensures that the incoming high-pressure pump fuel thoroughly agitates and mixes the additive uniformly.
2. **Fill with fresh high-octane or standard fuel**: Fill the tank completely to achieve the exact target concentration.
3. **Take the bike on a sustained highway ride**: Chemical detergents require thermal cycles to work effectively. A 30 to 45-minute ride with variable engine speeds under load allows the fuel flow to wash across the intake valves at peak operating temperatures.

---

## Real-World Observations: What You Can Actually Feel

After running a treated tank through a 900cc inline-four with 18,000 km on the clock:

- **Idle Stability**: Cold start hunting dropped from +/- 120 RPM variations to a dead-steady idle within 30 seconds.
- **Low-RPM Part-Throttle Transition**: The jerkiness experienced when cracking the throttle open in 1st and 2nd gear in city traffic smoothed out noticeably.
- **Spark Plug Inspection**: Plugs pulled after 600 km revealed a clean, light-tan ceramic insulator without the black crusty carbon rings previously present around the base threads.

---

## Summary & Best Practices

Keeping your fuel system clean is the cheapest performance insurance you can give your motorcycle. You do not need snake oil octane boosters or expensive ultrasonic injector teardowns every year. 

Run a single measured bottle of IFTEX Clean System 23 every 3,000 km, keep your fuel tank topped up during monsoons to avoid condensation, and let the engine breathe freely.
    `.trim(),
  },
  {
    id: "diy-hydro-dip-masterclass",
    slug: "diy-hydro-dip-masterclass",
    title: "The Complete DIY Hydro Dip Masterclass: Achieving Factory-Quality Carbon Finishes",
    date: "Aug 27, 2026",
    readTime: "9 min read",
    category: "DIY & Custom",
    coverImage: "https://images.unsplash.com/photo-1558981001-5864b3250a69?q=80&w=1200&auto=format&fit=crop",
    author: {
      name: "Moe",
      role: "Creator & Builder",
    },
    excerpt:
      "Hydrographic water transfer printing allows you to transform raw ABS fairings, mirror caps, and custom panels into flawless carbon fiber or geometric patterns. Here is the complete end-to-end technical process from sanding prep to 2K high-gloss polish.",
    content: `
## Introduction: Why Hydro Dipping Beats Vinyl Wrapping for Complex Motorcycle Parts

Anyone who has tried wrapping complex motorcycle panels—such as multi-curved air intake scoops, tank cowls, or aggressive mirror housings—knows the pain of vinyl. Heat guns, stretching, tension wrinkles, and inevitable peeling around sharp recessed edges within three months of sun exposure.

**Hydrographics (Water Transfer Printing)** solves this by utilizing liquid physics. By floating a water-soluble Polyvinyl Alcohol (PVA) film on a temperature-controlled bath and liquefying it with an aerosol activator, the pattern wraps seamlessly around three-dimensional geometry with zero tension and microscopic precision.

In this masterclass, I document every parameter of the process so you can achieve mirror-grade finishes at home without professional dipping tanks.

---

## The Chemical & Physical Principles

Hydro dipping relies on a delicate balance between water surface tension, chemical solvent flash times, and plastic surface energy:

1. **The PVA Base**: The pattern is printed with specialty inks onto a water-soluble carrier film. Floating it on water allows the PVA to absorb hydration and relax into a liquid skin.
2. **The Activator Solvent**: The activator is a blend of aromatic hydrocarbons, glycol ethers, and esters. When atomized onto the floating film, it dissolves the PVA carrier instantly while liquefying the ink layer without breaking its pattern cohesion.
3. **Hydraulic Adhesion**: When an object is submerged slowly at a precise angle, the hydraulic pressure of the water pushes the liquefied ink uniformly against every surface contour.

---

## Complete Equipment Checklist

Before touching a single part, prepare the following workstation:

- **Dipping Container**: A clean plastic tub large enough to submerge your part with at least 15 cm clearance on all sides.
- **Water Source**: Clean tap water maintained strictly between **28°C and 32°C (82°F–90°F)**.
- **Aerosol Activator & Premium Film**: High-definition twill or forged carbon hydrographic film.
- **Painter's Masking Tape**: Blue masking tape to frame the film perimeter and control expansion.
- **Safety Gear**: N95 or organic vapor respirator mask, nitrile gloves, and safety goggles.
- **Finishing Chemicals**: Plastic adhesion promoter, basecoat paint, and automotive-grade 2K Polyurethane Clear Coat.

---

## Phase 1: Surface Preparation (80% of the Result)

You cannot achieve a flawless dip over an imperfect base. Any scratch, fingerprint oil, or release agent will cause ink repulsion.

### Step 1: Sanding & De-glazing
- Sand the OEM panel with **P600 wet/dry sandpaper** until all factory gloss is completely eliminated.
- Wash thoroughly with grease-cutting dish soap and warm water, then wipe down with **99% Isopropyl Alcohol (IPA)**.

### Step 2: Basecoat Strategy
The color of your basecoat dictates the final depth of the pattern:
- For realistic **Twill Carbon Fiber**: Use a rich satin black or dark charcoal gray base.
- For **Silver / Kevlar Style Carbon**: Use a metallic silver or gunmetal basecoat.
- Allow the basecoat to cure fully for at least 2 to 3 hours before dipping.

---

## Phase 2: The Dipping Process (The Critical 90 Seconds)

| Stage | Parameter / Action | Why It Matters |
| :--- | :--- | :--- |
| **Film Placement** | Shiny side DOWN on water | Shiny side contains the water-soluble barrier; placing it wrong prevents hydration |
| **Hydration Time** | Exactly 60 Seconds | Under-hydration causes rigid wrinkles; over-hydration dissolves the ink prematurely |
| **Activator Application** | 1 to 2 light, uniform passes | Too little leaves dry film; too much melts the ink into liquid soup |
| **Flash Time** | 15–20 Seconds after spray | Allows solvents to reach optimal tackiness before immersion |
| **Entry Angle** | 30° to 45° smooth entry | Prevents trapping air bubbles beneath flat horizontal surfaces |

---

## Step-by-Step Dipping Execution

1. **Tape the Film Borders**: Cut your film with 5 cm extra margin on all sides. Apply masking tape around the perimeter and make 1 cm relief slits along the edges. This prevents the film from expanding uncontrollably across the water bath.
2. **Lay the Film**: Gently lay the film onto the water from center outward, ensuring no air bubbles are trapped underneath.
3. **Timer: 60 Seconds**: Let the film hydrate undisturbed. You will see it wrinkle slightly and then lay dead flat like glass.
4. **Apply Activator**: Hold the aerosol can 25 cm away at a 45-degree sweep. Apply a steady, wet pass. The pattern will instantly transform from matte to a glossy, glass-like sheet.
5. **The Dip**: Grip the masked rear of the part firmly. Enter the water smoothly at a **35-degree angle**, driving the part through the ink pattern with a consistent, continuous motion without stopping.
6. **Agitate Under Water**: Once fully submerged, swirl the part under the water to disperse any excess floating ink away before pulling it out.

---

## Phase 3: Post-Dip Rinsing & 2K Clear Coating

When you pull the part out, it will feel coated in a slimy, gelatinous PVA residue. **Do not touch the wet ink with your fingers.**

### Rinsing
- Place the part under a gentle trickle of warm running water (not high-pressure).
- Let the water rinse away the slimy residue for 5 to 8 minutes until the surface feels clean and dry to the touch.
- Allow the part to dry naturally for at least 3 hours.

### The 2K Urethane Clear Coat
A standard single-can clear coat will yellow under UV and scratch instantly. Use a **2-part (2K) automotive polyurethane clear coat** with a built-in hardener activator button:
1. Apply 1 light dust coat for adhesion. Wait 10 minutes.
2. Apply 2 wet, glossy coats spaced 15 minutes apart.
3. Allow 24 to 48 hours for complete chemical curing.

---

## Final Polishing & Finishing

Once cured, wet sand with **P2000 and P3000 grit foam discs**, followed by a dual-action rotary polish using cutting compound and a micro-finish polish. The result is a deep, 3D optical carbon grain that looks identical to multi-thousand dollar pre-preg autoclave carbon fiber.
    `.trim(),
  },
  {
    id: "running-in-superbike-engine",
    slug: "running-in-superbike-engine-breakin",
    title: "Running-In a High-Performance Engine: The First 1,000 KM Myth vs. Mechanical Reality",
    date: "Aug 27, 2026",
    readTime: "8 min read",
    category: "Engineering",
    coverImage: "/kawasaki-hero.jpg",
    author: {
      name: "Moe",
      role: "Creator & Builder",
    },
    excerpt:
      "Should you baby a brand new motorcycle under 4,000 RPM for 1,000 km, or ride it hard from day one? We examine the metallurgy of cylinder cross-hatching, piston ring seating pressure, and how to properly break in an inline-four engine.",
    content: `
## Introduction: The Dogma of the Owner's Manual

Open almost any modern motorcycle owner's manual, and you will find a standardized break-in warning: *"Do not exceed 4,000 RPM for the first 800 km, and do not exceed 6,000 RPM up to 1,600 km."*

For decades, riders have followed this religiously, riding in high gears at crawling speeds, convinced they are extending the life of their motorcycle. 

Yet, in engine building shops, dyno rooms, and race pits across the world, brand new factory engines are subjected to immediate load cycles, oil dumps within 100 km, and aggressive engine braking.

Who is right? Is the manufacturer protecting your motor, or are they protecting themselves from liability? In this article, we look at the microscopic metallurgy of modern engines to explain what break-in actually accomplishes.

---

## The Microscopic Reality: What Actually Needs "Breaking In"?

Modern manufacturing tolerances are measured in hundredths of a millimeter. Gearboxes are CNC machined, crankshaft journals are micro-polished, and bearings are pre-sized. 

The only component inside a brand new internal combustion engine that truly requires a physical break-in process is the **seal between the compression piston rings and the cylinder bore wall**.

### Cylinder Cross-Hatching & Ring Mating

When an engine cylinder is honed at the factory, abrasive diamond stones cut a microscopic cross-hatch pattern (typically at a 45-degree angle) into the cylinder lining (often electroplated with hard Nikasil or composite ceramic).

- These microscopic peaks and valleys act as tiny oil reservoirs and file-like abrasive surfaces.
- The piston compression rings, made of ductile iron or steel, are flat-faced.
- For the engine to achieve full compression and prevent blow-by, the piston rings must physically grind against these cross-hatch peaks until the two surfaces match with gas-tight precision.

---

## The Fatal Flaw of "Babying" an Engine: Cylinder Glazing

Piston rings do not seal against the cylinder wall through their own spring tension alone. The primary force pushing the ring outward against the wall is **combustion gas pressure (BMEP)** getting behind the ring land.

> **The Physics of Ring Sealing:**
> If you ride an engine at very low RPM under minimal throttle, combustion pressure is low. The rings lightly glide over the cylinder cross-hatching without enough pressure to mate. Meanwhile, engine oil seeps past the unsealed rings and gets baked into a glass-like lacquer over the cross-hatch valleys by exhaust heat.

This condition is called **cylinder glazing**. Once a cylinder is glazed:
1. The cross-hatch pattern is permanently clogged with hardened oil.
2. The piston rings never seat properly.
3. The engine permanently suffers from **5–10% lower compression, higher oil consumption, and excess crankcase blow-by**.

---

## Break-In Strategy Comparison

| Strategy | Methodology | Long-Term Outcome |
| :--- | :--- | :--- |
| **Manual Soft Method** | Under 4,000 RPM, constant highway speed | High risk of cylinder glazing, sluggish ring seal, higher lifetime oil burn |
| **The Moe Dynamic Method** | Progressive load, short acceleration bursts, strong engine braking | Maximum ring seal, optimal dyno compression, minimal blow-by |
| **Abusive Track Method** | Constant redline from 0 km without heat cycles | Bearing thermal shock, valve-train micro-galling before initial flush |

---

## The 3-Stage Dynamic Break-In Protocol

Here is the exact method engineered to maximize cylinder seal while protecting transmission gears and rod bearings:

### Stage 1: The First 0 to 150 KM (The Window of Opportunity)
The cylinder cross-hatch is sharpest in the first 100 kilometers. This is where 80% of the ring seating occurs:
- **Warm up the engine completely** to operating temperature before riding. Never load a cold engine.
- Ride on twisty or undulating roads with frequent gear changes.
- Accelerate with **half to three-quarter throttle** from 3,000 RPM up to 6,000 RPM in 2nd, 3rd, and 4th gears.
- **Roll off the throttle completely and let the engine brake aggressively** down to 3,000 RPM. Engine braking creates a high vacuum in the cylinder that pulls oil up to lubricate the rings and wash away microscopic metal filings.
- Avoid constant steady-state highway cruising at fixed RPMs.

### Stage 2: The First Oil & Filter Flush (150 to 500 KM)
During initial ring seating, thousands of microscopic microscopic metal particles are sheared off into the oil pan. 
- Drain the factory shipping oil and swap the oil filter between **300 km and 500 km**.
- Inspect the drained oil: you will notice a distinct metallic metallic sheen (swarf). Flushing this out early prevents metallic abrasive particles from scoring journal bearings.
- Refill with high-grade mineral or semi-synthetic motorcycle oil (avoid full synthetic with high friction modifiers until after 1,500 km).

### Stage 3: Gradual Rev Escalation (500 to 1,000 KM)
- Incrementally increase your peak RPM ceiling by 1,000 RPM every 150 km.
- Perform short, clean pulls up to 8,000–9,000 RPM under load, always followed by deceleration engine braking.
- At 1,000 KM, perform your scheduled full service with a fresh oil filter and switch to premium full-synthetic oil.

---

## The Final Verdict

Engines are mechanical assemblies governed by physics and combustion dynamics, not superstitions. Break in your motorcycle with intention, load the rings progressively, change your oil early, and your engine will deliver peak horsepower, razor-sharp throttle response, and bulletproof reliability for tens of thousands of kilometers.
    `.trim(),
  },
];

export function getAllPosts(): BlogPost[] {
  return BLOG_POSTS;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getBlogCategories(): string[] {
  const categories = new Set(BLOG_POSTS.map((p) => p.category));
  return ["All", ...Array.from(categories)];
}
