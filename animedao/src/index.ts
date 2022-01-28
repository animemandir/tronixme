import cheerio from "cheerio";
import axios from "redaxios";
import { URL } from "url";

import { BASE_URL } from "./constants";
import { gogoParser } from "./parsers";
import { AxiosEpisode } from "./types";
import { AxiosAnime, AxiosRecent, AxiosSearch, AxiosUpcoming, Episodes } from "./types";
import { between, http } from "./utils";

const getSearch = async (key: string) => {
    const { data: res } = await http(`${BASE_URL}/search/?search=${encodeURIComponent(key)}`);

    const $ = cheerio.load(res);
    const anime = $("div.col-xs-12.col-sm-6.col-md-6.col-lg-4");

    const data = [] as AxiosSearch[];

    anime.each((i, el) => {
        data.push({
            title: $(el).find(".ongoingtitle").find("b").text(),
            slug: $(el).find("a").attr("href")?.replace(/\//g, "").replace(/anime/, "") || "",
            year: $(el).find("span b").text(),
            img: BASE_URL + $(el).find("img").attr("data-src") || "",
            alternative: $(el).find("small").text(),
        });
    });

    return data;
};

const getAnime = async (slug: string) => {
    const { data: res } = await http(`${BASE_URL}/anime/${slug}`);

    const $ = cheerio.load(res);
    const episodes = [] as Episodes[];

    $("a.episode_well_link").each((_, el) => {
        episodes.push({
            date: $(el).find(".front_time").text().trim(),
            id: $(el).attr("href")?.replace(/\D+/g, "") || "",
            name: $(el).find("div.anime-title").text().trim(),
            description: $(el).find("span.latestanime-subtitle").text().trim(),
        });
    });

    const card = $(".col-lg-8");

    const prequelEl = card.find("div.row").children().first();
    const sequelEl = card.find("div.row").children().eq(1);

    const anime: AxiosAnime = {
        episodes,
        img: BASE_URL + $(".col-lg-4 > center:nth-child(1) > img:nth-child(1)").attr("src"),
        title: $(".col-lg-8 > h2:nth-child(1) > b:nth-child(1)").text().trim(),
        score: $(".col-lg-8 > h4:nth-child(2) > b:nth-child(1)").text().trim(),
        alternative: between("Alternative:", "Rating:", card.text()).trim(),
        rating: between("Rating:", "Year:", card.text()).trim(),
        year: between("Year:", "Status:", card.text()).trim(),
        status: between("Status:", "Genres:", card.text()).trim(),
        genres: $("a.animeinfo_label")
            .map((i, el) => $(el).text().trim())
            .toArray(),
        description: $(".visible-md")
            .text()
            .replace(/Description/, "")
            .trim(),
        next: $(".anime-countdown > center:nth-child(1) > b:nth-child(2)").text().trim(),
        relations: {
            prequel: {
                title: prequelEl.find("h5").text().trim(),
                img: BASE_URL + prequelEl.find("img").attr("src"),
                slug:
                    prequelEl
                        .find("a")
                        .attr("href")
                        ?.replace(/\/anime\//, "")
                        .slice(0, -1) || "",
            },
            sequel: {
                title: sequelEl.find("h5").text().trim(),
                img: BASE_URL + sequelEl.find("img").attr("src"),
                slug:
                    sequelEl
                        .find("a")
                        .attr("href")
                        ?.replace(/\/anime\//, "")
                        .slice(0, -1) || "",
            },
        },
    };

    if (!anime.relations.prequel?.title) {
        anime.relations.prequel = null;
    }
    if (!anime.relations.sequel?.title) {
        anime.relations.sequel = null;
    }

    return anime;
};

const getEpisode = async (id: string | number) => {
    const { data } = await http(`${BASE_URL}/view/${id}/`);
    const $ = cheerio.load(data);

    const epText = $(
        ".episode_title_table > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > h2:nth-child(1)"
    )
        .text()
        .toLowerCase();

    const ep = Number(epText.slice(epText.indexOf("episode")).replace(/[^0-9.]/g, ""));

    const gogo = between('vidstream").innerHTML = \'<iframe src="', '" scrolling="no"', data);

    if (gogo.length < 1000) {
        const { data: iframe } = await http(`${BASE_URL}${gogo}`);
        const url = new URL("https:" + between('<iframe src="', '" scrolling="no"', iframe));

        const { data: html } = await axios.get(url.href);

        return {
            videos: await gogoParser(html, url),
            ep,
        } as AxiosEpisode;
    }

    throw {
        status: 500,
        data: "Episode not found for this anime",
    };
};

const getRecent = async () => {
    const { data } = await http(BASE_URL);
    const $ = cheerio.load(data);

    const episodes: AxiosRecent[] = [];

    $("#new > div").each((_, el) => {
        const episode = between("( Episode", ")", $(el).find("a:nth-child(1)").text()).trim();

        episodes.push({
            anime: $(el).find("a.latest-parent").text().trim(),
            date: $(el).find("span.front_time.animedao-color").text().trim(),
            description: $(el).find("span.latestanime-subtitle").text().trim(),
            episode,
            hot: $(el).text().includes("HOT"),
            img: BASE_URL + $(el).find("img").attr("data-src"),
            id: $(el).find("a").attr("href")?.replace(/\D+/g, "") || "",
            slug:
                $(el)
                    .find("a.latest-parent")
                    .attr("href")
                    ?.replace(/\/anime\//, "")
                    .slice(0, -1) || "",
        });
    });

    return episodes;
};

const getUpcoming = async () => {
    const { data } = await http(BASE_URL);
    const $ = cheerio.load(data);

    const upcoming: AxiosUpcoming["upcoming"] = [];
    const ongoing: AxiosUpcoming["ongoing"] = [];

    $("#ongoing > div:nth-child(1)")
        .find(".well.ongoingtab")
        .each((_, el) => {
            upcoming.push({
                alternative: $(el).find("small").text().trim(),
                img: BASE_URL + $(el).find("img").attr("data-src"),
                title: $(el).find("b").text().trim(),
                when: $(el).find(".front_time").text().trim(),
                slug:
                    $(el)
                        .parent()
                        .attr("href")
                        ?.replace(/anime/, "")
                        .replace(/\//g, "")
                        .trim() || "",
            });
        });

    $("#ongoing > div:nth-child(2)")
        .find(".well.ongoingtab")
        .each((_, el) => {
            ongoing.push({
                alternative: $(el).find("small").text().trim(),
                img: BASE_URL + $(el).find("img").attr("data-src"),
                title: $(el).find("b").text().trim(),
                when: $(el).find(".front_time").text().trim(),
                slug:
                    $(el)
                        .parent()
                        .attr("href")
                        ?.replace(/anime/, "")
                        .replace(/\//g, "")
                        .trim() || "",
            });
        });

    return {
        upcoming,
        ongoing,
    };
};

export { getSearch, getAnime, getEpisode, getRecent, getUpcoming };
export * from "./types";
