export const amenitiesOptions = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

export const demoRooms = [
  {
    _id: "quiet-pod-a1",
    roomName: "Quiet Pod A1",
    description:
      "A compact private study pod designed for focused solo work, reading, and online classes.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
    floor: "3rd Floor",
    capacity: 2,
    hourlyRate: 5,
    amenities: ["Wi-Fi", "Power Outlets", "Quiet Zone"],
    bookingCount: 12,
  },
  {
    _id: "focus-room-b2",
    roomName: "Focus Room B2",
    description:
      "A calm group study room with a whiteboard, bright lighting, and comfortable seating.",
    image:
      "https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=1200&auto=format&fit=crop",
    floor: "2nd Floor",
    capacity: 4,
    hourlyRate: 8,
    amenities: ["Whiteboard", "Wi-Fi", "Air Conditioning", "Power Outlets"],
    bookingCount: 21,
  },
  {
    _id: "research-hub-c3",
    roomName: "Research Hub C3",
    description:
      "A larger room for research groups, presentation preparation, and collaborative sessions.",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop",
    floor: "4th Floor",
    capacity: 6,
    hourlyRate: 12,
    amenities: ["Projector", "Whiteboard", "Wi-Fi", "Power Outlets"],
    bookingCount: 18,
  },
  {
    _id: "silent-corner-d4",
    roomName: "Silent Corner D4",
    description:
      "A peaceful corner room for exam preparation, deep reading, and distraction-free study.",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop",
    floor: "1st Floor",
    capacity: 3,
    hourlyRate: 6,
    amenities: ["Quiet Zone", "Wi-Fi", "Air Conditioning"],
    bookingCount: 9,
  },
  {
    _id: "library-lab-e5",
    roomName: "Library Lab E5",
    description:
      "A modern study room with presentation tools for project meetings and academic discussions.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
    floor: "5th Floor",
    capacity: 8,
    hourlyRate: 15,
    amenities: ["Projector", "Whiteboard", "Wi-Fi", "Power Outlets"],
    bookingCount: 30,
  },
  {
    _id: "study-suite-f6",
    roomName: "Study Suite F6",
    description:
      "A premium quiet suite for small teams, thesis work, and long focused study sessions.",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop",
    floor: "6th Floor",
    capacity: 5,
    hourlyRate: 10,
    amenities: ["Quiet Zone", "Air Conditioning", "Wi-Fi", "Power Outlets"],
    bookingCount: 15,
  },
];