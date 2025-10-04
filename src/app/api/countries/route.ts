import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch country data.");
    }
    let countries = await response.json();
    countries.sort((a: { name: string }, b: { name: string }) =>
      a.name.localeCompare(b.name)
    );
    return NextResponse.json(countries);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
