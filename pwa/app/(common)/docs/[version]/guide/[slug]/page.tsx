import GuidePage from "./GuidePage";
import { refVersions } from "consts";
import { getAllDocLinks, getGuideContent } from "api/doc/guides";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const allParams: { version: string; slug: string }[] = [];
  await Promise.all(
    refVersions.map(async (version) => {
      const guideLinks = await getAllDocLinks(`guides/v${version}`);
      guideLinks.map((guideLink) => {
        allParams.push({
          version: `v${version}`,
          slug: guideLink.slug,
        });
      });
    })
  );
  return allParams;
}

export const dynamicParams = false;

export default async function Page({
  params: { slug, version },
}: {
  params: {
    slug: string;
    version: string;
  };
}) {
  try {
    const mdxContent = await getGuideContent(slug, version);
    return (
      <GuidePage
        Mdx={mdxContent.default}
        title={mdxContent.name}
        slug={slug}
        tags={mdxContent.tags?.split(",")}
      />
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
}
