import cheerio from "cheerio";
import axios from "redaxios";
import { URL } from "url";

import { BASE_URL, USER_AGENT } from "./constants";
import { AxiosVideos } from "./types";
import { Anime, Episodes, RecentEpisodes, SearchAnime, Upcoming } from "./types";
import { between, bypassGogo, http } from "./utils";

const search = async (key: string) => {
    const { data: res } = await http(`${BASE_URL}/search/?search=${encodeURIComponent(key)}`);

    const $ = cheerio.load(res);
    const anime = $("div.col-xs-12.col-sm-6.col-md-6.col-lg-4");

    const data = [] as SearchAnime[];

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
        });
    });

    const card = $(".col-lg-8");

    const prequelEl = card.find("div.row").children().first();
    const sequelEl = card.find("div.row").children().eq(1);

    const anime: Anime = {
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
        anime.relations.prequel = undefined;
    }
    if (!anime.relations.sequel?.title) {
        anime.relations.sequel = undefined;
    }

    return anime;
};

const getVideo = async (id: string | number) => {
    const { data } = await http(`${BASE_URL}/view/${id}/`);
    const raw = between('vidstream").innerHTML = \'<iframe src="', '" scrolling="no"', data);

    const { data: iframe } = await http(`${BASE_URL}${raw}`);
    const url = new URL("https:" + between('<iframe src="', '" scrolling="no"', iframe));

    const { data: html } = await http(url.href);

    const $ = cheerio.load(html);
    const params = bypassGogo($, url.searchParams.get("id") || "");

    const { data: videos } = await axios.get<AxiosVideos>(
        `${url.protocol}//${url.hostname}/encrypt-ajax.php?${params}`,
        {
            headers: {
                "User-Agent": USER_AGENT,
                Referrer: url.href,
                "X-Requested-With": "XMLHttpRequest",
            },
        }
    );

    return videos;
};

const recent = async () => {
    const { data } = await http(BASE_URL);
    const $ = cheerio.load(data);

    const episodes: RecentEpisodes[] = [];

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

const upcoming = async () => {
    const { data } = await http("https://animedao.to/");
    const $ = cheerio.load(data);

    const episodes: Upcoming[] = [];

    $("#ongoing > div:nth-child(1)")
        .find(".well.ongoingtab")
        .each((_, el) => {
            episodes.push({
                alternative: $(el).find("small").text().trim(),
                img: BASE_URL + $(el).find("img").attr("data-src"),
                title: $(el).find("b").text().trim(),
                when: $(el).find(".front_time").text().trim(),
            });
        });

    return episodes;
};

export { search, getAnime, getVideo, recent, upcoming };
export * from "./types";
