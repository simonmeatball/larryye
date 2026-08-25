export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  category: 'hardware' | 'software';
  type: 'internship' | 'leadership' | 'project';
  projectName: string;
  role?: string;
  organization?: string;
  location?: string;
  dateDisplay: string;
  startDate: string; // ISO format e.g. "2026-06" for sorting
  endDate: string;   // ISO format e.g. "2026-09" for sorting
  folder?: string;
  images: string[];
  description: string;
  detailedDescription?: string;
  bullets?: string[];
  tags?: string[];
  links?: ProjectLink[];
}

export type ProjectInput = Omit<Project, 'images'> & {
  images?: string[];
};

// Vite dynamic glob to discover all image assets in static/projects/
const projectImageModules = import.meta.glob<string>(
  '/static/projects/**/*.{png,jpg,jpeg,webp,svg,gif,PNG,JPG,JPEG,WEBP,SVG,GIF,avif,AVIF}',
  { eager: true, query: '?url', import: 'default' }
);

/**
 * Returns all images found in `static/projects/<folderOrId>/` as public web paths (e.g. `/projects/<folderOrId>/<filename>`).
 * Adding more images into `static/projects/<folderOrId>/` will automatically populate the carousel!
 */
export function getProjectImages(folderOrId: string, fallbackImages: string[] = []): string[] {
  const images: string[] = [];
  const folderTarget = `/projects/${folderOrId}/`;

  for (const rawPath in projectImageModules) {
    if (rawPath.includes(folderTarget)) {
      // Normalize to public browser URL by stripping leading '/static'
      const publicPath = rawPath.startsWith('/static/') ? rawPath.replace('/static', '') : rawPath;
      images.push(publicPath);
    }
  }

  // Sort alphabetically so image ordering is deterministic (e.g. 01.png, 02.png, photo.jpg)
  images.sort();

  return images.length > 0 ? images : fallbackImages;
}

export const rawProjectsData: ProjectInput[] = [
  // --- Professional Experiences ---
  {
    id: 'arista-networks',
    category: 'hardware',
    type: 'internship',
    projectName: 'Arista Networks',
    role: 'Hardware Design Engineer Intern',
    organization: 'Arista Networks',
    location: 'Santa Clara, CA',
    dateDisplay: 'June 2026 – September 2026',
    startDate: '2026-06',
    endDate: '2026-09',
    description: 'Owned the hardware development of a high-power 3kW+ 48V XPO power board, executing 10-layer Allegro design, HyperLynx PI analysis, and TDR SerDes validation.',
    detailedDescription: `
      <p>As a Hardware Design Engineer Intern at <strong>Arista Networks</strong>, I drove the design and validation lifecycle of high-complexity power and interposer boards:</p>
      <ul class="list-disc list-inside space-y-2 mt-2">
        <li><strong>3kW+ 48V XPO Power Board:</strong> Owned hardware development from initial stackup definition and OrCAD schematic capture to facilitating layout teams in executing a high-complexity 10-layer Allegro design.</li>
        <li><strong>Power Integrity (PI) Analysis:</strong> Executed DC drop simulations via HyperLynx to analyze power shapes and ensure safe, uniform current delivery across flexible PCB sections.</li>
        <li><strong>High-Speed Signal Validation:</strong> Performed SerDes channel impedance validation using Time-Domain Reflectometry (TDR) to isolate channel degradation and conduct root cause analysis on signal anomalies.</li>
        <li><strong>EEPROM Interposer Board:</strong> Led end-to-end hardware definition, schematic capture, and layout with castellated holes; coordinated manufacturing and mechanical teams to fab out the board in under 10 weeks.</li>
      </ul>
    `,
    tags: ['OrCAD', 'Allegro', 'HyperLynx', 'Power Integrity (PI)', 'TDR', 'High-Speed Design', 'Flex PCB'],
    links: []
  },
  {
    id: 'tesla',
    category: 'software',
    type: 'internship',
    projectName: 'Tesla',
    role: 'Vehicle Firmware Intern',
    organization: 'Tesla',
    location: 'Palo Alto, CA',
    dateDisplay: 'September 2025 – December 2025',
    startDate: '2025-09',
    endDate: '2025-12',
    description: 'Developed embedded C software for low-voltage power management, built Python SIL simulation test suites, and analyzed fleet telemetry data with SQL.',
    detailedDescription: `
      <p>As a Vehicle Firmware Intern at <strong>Tesla</strong>, I contributed to mission-critical low-voltage vehicle power management firmware and test pipelines:</p>
      <ul class="list-disc list-inside space-y-2 mt-2">
        <li><strong>Low-Voltage Power Management:</strong> Developed embedded C firmware for vehicle power state control and fault handling.</li>
        <li><strong>Software-in-the-Loop (SIL):</strong> Built automated Python simulation test frameworks to stress-test physical firmware behavior and validate edge cases before release.</li>
        <li><strong>Vehicle Diagnostics & Flashing:</strong> Diagnosed firmware bugs on test fleet vehicles using CANape trace analysis and UDS protocols to flash ICs.</li>
        <li><strong>Fleet Telemetry Analysis:</strong> Queried and analyzed millions of fleet data points using SQL, modeling and benchmarking three alternative algorithms to reduce user disruptions by 50%.</li>
      </ul>
    `,
    tags: ['Embedded C', 'Python', 'SIL Testing', 'CANape', 'UDS Flashing', 'SQL', 'Vehicle Firmware'],
    links: []
  },
  {
    id: 'rivian-vw',
    category: 'hardware',
    type: 'internship',
    projectName: 'Rivian and Volkswagen Group Technologies',
    role: 'Hardware Systems Integration Intern',
    organization: 'Rivian & VW Group Technologies',
    location: 'Irvine, CA',
    dateDisplay: 'June 2025 – September 2025',
    startDate: '2025-06',
    endDate: '2025-09',
    description: 'Built fast fault-injection Altium PCBs, executed comprehensive e-fuse test validation plans, and developed AI-powered automated test scripting.',
    detailedDescription: `
      <p>As a Hardware Systems Integration Intern at <strong>Rivian and Volkswagen Group Technologies</strong>, I worked on hardware-in-the-loop validation and automated test instrumentation:</p>
      <ul class="list-disc list-inside space-y-2 mt-2">
        <li><strong>High-Speed Fault Injection PCB:</strong> Designed an Altium PCB utilizing high-speed comparators and D flip-flops to capture 100ns transient pulses and synchronize fault injection with solid-state relays.</li>
        <li><strong>E-Fuse Electrical Characterization:</strong> Designed and executed validation test plans for electronic fuses using programmable electronic loads, precision power supplies, and oscilloscopes prior to high-voltage power-on.</li>
        <li><strong>AI Test Automation Agent:</strong> Developed an AI-powered agent that parses technical schematics to surface relevant software commands based on device IDs and nets, coupled with a Python automation script configuring test equipment dynamically.</li>
      </ul>
    `,
    tags: ['Altium', 'PCB Design', 'Fault Injection', 'Hardware Testing', 'Electronic Load', 'Oscilloscopes', 'Python', 'AI'],
    links: []
  },
  {
    id: 'bfr-electrical-lead',
    category: 'hardware',
    type: 'leadership',
    projectName: 'Bruin Formula Racing — Electrical Lead',
    role: 'Electrical Distribution Lead',
    organization: 'Bruin Formula Racing (UCLA FSAE)',
    location: 'Los Angeles, CA',
    dateDisplay: 'May 2025 – June 2026',
    startDate: '2025-05',
    endDate: '2026-06',
    description: 'Led a 10-engineer team architecting the 12V low-voltage power distribution network for UCLA\'s electric FSAE race vehicle and integrated DAQ firmware & GUI.',
    detailedDescription: `
      <p>As the Electrical Distribution Lead for UCLA's <strong>Bruin Formula Racing (FSAE Electric)</strong> team, I directed the low-voltage electronics subteam:</p>
      <ul class="list-disc list-inside space-y-2 mt-2">
        <li><strong>Team Leadership:</strong> Managed a 10-engineer team through the design, manufacturing, and trackside integration of a complete 12V LV power distribution network.</li>
        <li><strong>Project Management:</strong> Established engineering milestones, sprint deliverables, and weekly design reviews to eliminate cross-subteam bottlenecks.</li>
        <li><strong>DAQ & Telemetry GUI:</strong> Spearheaded software integration for vehicle data acquisition, debugging microcontroller board issues, writing firmware drivers, and developing a telemetry visualization GUI.</li>
      </ul>
    `,
    tags: ['FSAE Electric', 'Team Leadership', 'Power Distribution', 'Firmware', 'DAQ', 'Telemetry GUI'],
    links: [
      { label: 'Bruin Formula Racing', url: 'https://bruinformularacing.notion.site/' }
    ]
  },
  {
    id: 'custom-bms',
    category: 'hardware',
    type: 'project',
    projectName: 'Custom Battery Management System (BMS)',
    role: 'Accumulator Systems Responsible Engineer',
    organization: 'Bruin Formula Racing (UCLA FSAE)',
    location: 'Los Angeles, CA',
    dateDisplay: 'May 2024 – June 2025',
    startDate: '2024-05',
    endDate: '2025-06',
    description: 'Designed a distributed BMS for BFR\'s Mk. 10 electric vehicle with 1 motherboard and 5 daughterboards, reducing harness wiring by over 100 wires and 50% weight.',
    detailedDescription: `
      <p>As the Accumulator Systems Responsible Engineer for <strong>Bruin Formula Racing</strong>, I architected a custom distributed Battery Management System (BMS) for the Mk. 10 electric racecar:</p>
      <ul class="list-disc list-inside space-y-2 mt-2">
        <li><strong>Distributed Topology:</strong> Implemented a modular system comprising 5 daughterboards (monitoring 20 Li-ion cells each via ADBMS6830 ICs) and 1 centralized motherboard.</li>
        <li><strong>Weight & Harness Reduction:</strong> Eliminated over 100 high-voltage harness wires from the service section into the accumulator container, saving 50% harness weight and significantly improving assembly ergonomics.</li>
        <li><strong>Firmware & Communications:</strong> Programmed an STM32 Nucleo-G474RE board over isoSPI and CAN bus to log voltage/temperature faults, ensuring full backwards compatibility with Orion BMS 2.</li>
      </ul>
    `,
    tags: ['KiCAD', 'PCB Design', 'Embedded C', 'isoSPI', 'CAN Bus', '18650 Cells', 'STM32'],
    links: [
      { label: 'BFR Notion Page', url: 'https://bruinformularacing.notion.site/Custom-BMS-a13a167a22fc4f7280358c83af6a4524' }
    ]
  },
  {
    id: 'ideahacks-2025',
    category: 'software',
    type: 'project',
    projectName: 'Idea Hacks 2025 Website',
    role: 'Frontend Developer',
    organization: 'UCLA IEEE',
    location: 'Los Angeles, CA',
    dateDisplay: 'November 2024 – January 2025',
    startDate: '2024-11',
    endDate: '2025-01',
    description: 'Frontend event portal for Idea Hacks 2025, the largest student-run hardware hackathon on the West Coast, hosting hundreds of collegiate builders.',
    detailedDescription: `
      <p><strong>Idea Hacks</strong> is the largest hardware hackathon on the West Coast, hosted annually by UCLA IEEE. I developed responsive UI components for the official 2025 portal:</p>
      <ul class="list-disc list-inside space-y-2 mt-2">
        <li>Built dynamic schedule timelines, interactive FAQ accordions, and sponsor showcase components.</li>
        <li>Optimized layout breakpoints and asset compression for smooth mobile performance during high-traffic hackathon registrations.</li>
      </ul>
    `,
    tags: ['Web Development', 'UI Design', 'IdeaHacks', 'UCLA IEEE', 'Responsive Web'],
    links: [
      { label: 'Official Website', url: 'https://ideahacks.la/' }
    ]
  },
  {
    id: 'stock-site',
    category: 'software',
    type: 'project',
    projectName: 'Stock Site',
    role: 'Creator & Developer',
    dateDisplay: 'June 2024 – August 2024',
    startDate: '2024-06',
    endDate: '2024-08',
    description: 'An interactive financial tracking dashboard with live quote feeds from Finnhub, technical charts via TradingView, and custom portfolio management.',
    detailedDescription: `
      <p><strong>Stock Site</strong> is an interactive real-time financial tracking dashboard built to monitor equities, analyze technical indicators, and manage simulated portfolios:</p>
      <ul class="list-disc list-inside space-y-2 mt-2">
        <li>Integrates <strong>Finnhub REST API</strong> for live quote prices, earnings news, and market fundamentals.</li>
        <li>Embedded <strong>TradingView API</strong> widgets for dynamic candlestick charts with multi-timeframe toggles.</li>
        <li>Built client-side portfolio tracker supporting custom watchlists and search autocomplete.</li>
      </ul>
    `,
    tags: ['Svelte', 'REST APIs', 'Finnhub API', 'TradingView', 'Vercel', 'Finance'],
    links: [
      { label: 'Live App', url: 'https://stock-site-three.vercel.app/' },
      { label: 'GitHub Code', url: 'https://github.com/simonmeatball/Stock-Site' }
    ]
  },
  {
    id: 'cell-heat-generation',
    category: 'hardware',
    type: 'project',
    projectName: 'Cell Heat Generation Test Bench',
    role: 'FSAE Research Project Lead',
    organization: 'Bruin Formula Racing (UCLA FSAE)',
    location: 'Los Angeles, CA',
    dateDisplay: 'September 2023 – June 2024',
    startDate: '2023-09',
    endDate: '2024-06',
    description: 'Led experimental thermodynamic testing of FSAE Li-ion battery cells under 180A discharge, analyzing heat dissipation to maintain pack temperature below 60°C.',
    detailedDescription: `
      <p>As a freshman engineering project for <strong>Bruin Formula Racing</strong>, I led empirical thermodynamic testing of high-discharge cylindrical lithium-ion cells:</p>
      <ul class="list-disc list-inside space-y-2 mt-2">
        <li><strong>180A Discharge Circuit:</strong> Devised high-current load testing bench drawing 180A to measure internal battery heating through fluid calorimeter temperature rises.</li>
        <li><strong>Thermal Modeling:</strong> Processed voltage and thermocouple sensor time-series data using <strong>NumPy</strong> and <strong>Matplotlib</strong> to model peak heat generation rates.</li>
        <li><strong>Cooling Optimization:</strong> Determined optimal fan CFM curves to ensure the vehicle accumulator remains safely below 60°C during track endurance runs.</li>
      </ul>
    `,
    tags: ['Thermal Analysis', 'Thermodynamics', 'NumPy', 'Matplotlib', 'Instrumentation', '18650 Cells'],
    links: []
  },
  {
    id: 'prospectus',
    category: 'software',
    type: 'project',
    projectName: 'Prospectus',
    role: 'Full-Stack Developer',
    dateDisplay: 'January 2024 – June 2024',
    startDate: '2024-01',
    endDate: '2024-06',
    description: 'A collaborative resume-sharing and peer review web platform with user authentication, candidate tag searching, and real-time feedback commenting.',
    detailedDescription: `
      <p><strong>Prospectus</strong> is a collaborative web platform built to help students and job seekers share resumes, receive peer feedback, and organize portfolio profiles efficiently:</p>
      <ul class="list-disc list-inside space-y-2 mt-2">
        <li>Full-stack web architecture with user authentication, secure resume document storage, and peer annotation.</li>
        <li>Responsive frontend interface crafted for rapid resume upload and tag-based candidate searching.</li>
      </ul>
    `,
    tags: ['Full Stack', 'Web Development', 'UI/UX Design', 'User Auth', 'Resume Review'],
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/aroy23/Prospectus' },
      { label: 'Video Demo', url: 'https://www.youtube.com/watch?v=dHh1mvhMxEE' }
    ]
  },
  {
    id: 'tetris-uino',
    category: 'hardware',
    type: 'project',
    projectName: 'Tetris-uino Handheld Game Console',
    role: 'Hardware & Embedded Developer',
    organization: 'IEEE GameBruino (1st Place Award)',
    location: 'Los Angeles, CA',
    dateDisplay: 'February 2024 – March 2024',
    startDate: '2024-02',
    endDate: '2024-03',
    description: 'Award-winning handheld game console built with Arduino, OLED display, and joystick over I2C, featuring a custom C++ Tetris engine.',
    detailedDescription: `
      <p><strong>Tetris-uino</strong> is a custom mini handheld game console that won <strong>1st Place at the IEEE GameBruino Competition</strong> and was featured at the annual project showcase:</p>
      <ul class="list-disc list-inside space-y-2 mt-2">
        <li><strong>Hardware Architecture:</strong> Designed a standalone embedded console utilizing an Arduino microcontroller, 128x64 OLED display, analog joystick, RGB indicator LEDs, and tactile buttons communicating via I2C.</li>
        <li><strong>C++ Game Engine:</strong> Recreated complete Tetris mechanics from scratch using Adafruit GFX, with custom block rotation collision physics, hold queue, dynamic level speed scaling, and high-score saving.</li>
      </ul>
    `,
    tags: ['Arduino', 'C++', 'I2C', 'Adafruit GFX', 'OLED Display', 'Embedded Systems', 'Game Dev'],
    links: []
  }
];

// Helper to parse dates into timestamp for deterministic sorting (newest endDate first)
function parseSortDate(dateStr: string): number {
  if (!dateStr) return 0;
  const [year, month] = dateStr.split('-').map(Number);
  return new Date(year, (month || 1) - 1, 28).getTime();
}

// Automatically populate each project's images array and sort by end date descending
export const projectsData: Project[] = rawProjectsData
  .map(p => {
    const folder = p.folder || p.id;
    const discoveredImages = getProjectImages(folder, p.images || []);
    return {
      ...p,
      folder,
      images: discoveredImages.length > 0 ? discoveredImages : ['https://placehold.co/600x400/1e293b/94a3b8?text=' + encodeURIComponent(p.projectName)]
    };
  })
  .sort((a, b) => {
    const endA = parseSortDate(a.endDate);
    const endB = parseSortDate(b.endDate);
    if (endB !== endA) {
      return endB - endA; // Latest end date first
    }
    // Secondary sort: Latest start date first
    const startA = parseSortDate(a.startDate);
    const startB = parseSortDate(b.startDate);
    return startB - startA;
  });
