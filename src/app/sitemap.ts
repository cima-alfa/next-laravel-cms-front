import { fetchSitemap } from "@/lib/data/pages";
import { permalink } from "@/lib/router/router";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const pages = await fetchSitemap();

    const sitemap: MetadataRoute.Sitemap = [];

    pages?.data.map((page) => {
        sitemap.push({
            url: permalink(page, {}, true),
            lastModified: new Date(page.meta.timestamps.updated_at),
            changeFrequency: page.meta
                .sitemap_change_freq as MetadataRoute.Sitemap[0]["changeFrequency"],
            priority: parseFloat(page.meta.sitemap_prio),
        });
    });

    return sitemap;
}
