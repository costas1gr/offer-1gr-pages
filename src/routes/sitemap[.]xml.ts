import { createFileRoute } from "@tanstack/react-router";
import { getRouterInstance } from "@tanstack/react-start";
import { sitemapPathForLocation, sitemapStaticPaths, sitemapXML, type SitemapEntry } from "@/lib/sitemap";
import { isSitemapRouteIncluded } from "@/lib/sitemap";
import { demos } from "@/lib/demos";

const BASE_URL = "https://offer-1gr-pages.lovable.app";

export const Route = createFileRoute("/sitemap.xml")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async () => {
        const router = await getRouterInstance();
        const entries: SitemapEntry[] = sitemapStaticPaths(router).map((path) => ({ path }));
        const routeId = "/demo/$slug";
        if (isSitemapRouteIncluded(router.routesById[routeId])) {
          for (const d of demos) {
            const location = router.buildLocation({
              to: "/demo/$slug", params: { slug: d.slug }, search: () => ({}), hash: "",
            });
            const path = sitemapPathForLocation(router, location, routeId);
            if (path) entries.push({ path });
          }
        }
        if (entries.length === 0) {
          return new Response("No pages are included in this sitemap.", {
            status: 404, headers: { "Cache-Control": "no-store" },
          });
        }
        return new Response(sitemapXML(BASE_URL, entries), {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
