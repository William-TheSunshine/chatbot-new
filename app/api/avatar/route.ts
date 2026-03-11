import { NextRequest, NextResponse } from "next/server";

interface AvatarRequest {
  gender: "male" | "female";
  age?: number;
}

// ── Curated & verified Korean/East-Asian portraits from Unsplash ──
// Photos are organised by gender × age-range so the avatar feels realistic.

const PHOTOS = {
  male: {
    // 20 – 34 세
    young: [
      "photo-1681097561932-36d0df02b379",
      "photo-1611403119860-57c4937ef987",
      "photo-1622977318832-82321bdd509f",
      "photo-1609834265293-462cb479a028",
      "photo-1628467498293-58630fcc1341",
      "photo-1605504836193-e77d3d9ede8a",
    ],
    // 35 – 49 세
    middle: [
      "photo-1603252112050-5ee77b4b4fde",
      "photo-1738566061505-556830f8b8f5",
      "photo-1603086360919-8b8eacad64bc",
      "photo-1667127752169-74c7e4d8822f",
      "photo-1771923892906-aa8254cc9227",
      "photo-1734669578509-97882e21f3a1",
    ],
    // 50 세 이상
    senior: [
      "photo-1729559149720-2b6c5c200428",
      "photo-1729559149688-bee985e447ca",
      "photo-1592069883203-aabe051d449b",
      "photo-1532784018373-f957e234f3fd",
      "photo-1753544202892-59c8462c846e",
    ],
  },
  female: {
    // 20 – 34 세
    young: [
      "photo-1690149070858-15139cc24909",
      "photo-1650075990015-af095f1659e3",
      "photo-1676777493576-1432f14373bb",
      "photo-1726710856152-36126c85ee76",
      "photo-1676083192960-2a4873858487",
      "photo-1641956188138-7456e5b970f2",
    ],
    // 35 – 49 세
    middle: [
      "photo-1665224752136-4dbe2dfc8195",
      "photo-1665224751641-8ea911ca2267",
      "photo-1604904612715-47bf9d9bc670",
      "photo-1665224752561-85f4da9a5658",
      "photo-1765248148309-69d900a5bc17",
      "photo-1758600432277-5c76801e584a",
      "photo-1676218656869-aa052cde14bc",
      "photo-1641044159659-eb9f381ab361",
      "photo-1676219961342-a32b89d45bca",
      "photo-1735424080768-8730f9c8a0e9",
    ],
    // 50 세 이상
    senior: [
      "photo-1765248148922-b452232e1107",
      "photo-1765248149444-3d01d93f93e7",
      "photo-1581065178047-8ee15951ede6",
      "photo-1735424080701-d00f5fda5aa6",
      "photo-1581065178026-390bc4e78dad",
    ],
  },
};

/** age → bucket */
function ageBucket(age: number): "young" | "middle" | "senior" {
  if (age < 35) return "young";
  if (age < 50) return "middle";
  return "senior";
}

export async function POST(req: NextRequest) {
  try {
    const { gender, age }: AvatarRequest = await req.json();

    const bucket = ageBucket(age ?? 30);
    const photos = PHOTOS[gender]?.[bucket] ?? PHOTOS.male.young;
    const photoId = photos[Math.floor(Math.random() * photos.length)];

    // Unsplash URL — face-centred crop, 400 × 400
    const photoUrl = `https://images.unsplash.com/${photoId}?w=400&h=400&fit=crop&crop=face&auto=format&q=80`;

    // Fetch server-side → base64 (avoids CORS)
    const res = await fetch(photoUrl);
    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch avatar photo" },
        { status: 500 }
      );
    }

    const buffer = await res.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    const contentType = res.headers.get("content-type") || "image/jpeg";
    const dataUrl = `data:${contentType};base64,${base64}`;

    return NextResponse.json({ imageUrl: dataUrl });
  } catch (error) {
    console.error("Avatar generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate avatar" },
      { status: 500 }
    );
  }
}
