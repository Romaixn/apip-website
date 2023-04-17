import { Metadata } from "next";
import ClientLayout from "./ClientLayout";

type Props = {
  params: { locale: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const locale = params.locale;
  const dictionary = await import(`i18n/meta/${locale}.json`);

  // fetch data
  const { URL, OG_IMAGE } = await import(`data/con/meta`);

  return {
    title: {
      default: dictionary.title,
      template: "%s - API Platform Conference",
    },
    description: dictionary.description,
    openGraph: {
      url: URL,
      title: dictionary.title,
      description: dictionary.description,
      type: "website",
      siteName: "API Platform Conference",
      images: OG_IMAGE,
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.title,
      description: dictionary.description,
      images: OG_IMAGE,
      creator: "@coopTilleuls",
    },
  };
}

const websiteData = {
  "@context": "https://schema.org",
  "@type": "Website",
  name: "API Platform Conference",
  url: "https://api-platform.com/con/",
};

export default function ConLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      {children}
    </ClientLayout>
  );
}