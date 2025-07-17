import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import * as cheerio from "cheerio";

type Data = {
  summary: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ summary: "No URL provided." });
  }

  try {
    const response = await axios.get(url);
    const html = response.data;

    const $ = cheerio.load(html);
    const text = $("p")
      .map((i, el) => $(el).text())
      .get()
      .join(" ");

    const sentences = text.split(". ").slice(0, 5).join(". ") + ".";

    res.status(200).json({ summary: sentences });
  } catch (err) {
    res.status(500).json({ summary: "Failed to fetch or summarise." });
  }
}
