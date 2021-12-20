import { useMemo } from 'react';

import { isEmpty } from '@foundation/next';

import { urlFor } from '@app/hooks/image';

import { PortableText } from '@shop/components/Sanity';

import { Region } from '@shop/components/Page/Regions';

const Image = ({ image }) => {
  const imageUrl = useMemo(
    () => (image ? urlFor(image).width(800).auto('format').url() : null),
    [image]
  );

  return image ? (
    <div
      className="
          tw-element
          uk-text-center
          uk-margin-top
          uk-padding-remove-vertical
          uk-margin-bottom
        "
    >
      <img src={imageUrl} alt={image.title} />
    </div>
  ) : null;
};

const IntroSection = ({
  page,
  showTitle = false,
  sectionClassName = 'uk-section uk-section-large uk-padding-remove-top uk-margin-large-top uk-padding-remove-vertical uk-margin-bottom tm-section-intro',
  className = 'tw-element tw-heading uk-text-center',
}) => {
  const { title, subtitle, content } = page;

  if (isEmpty(subtitle) && isEmpty(content?.body) && !showTitle) return null;

  return (
    <section className={sectionClassName}>
      <div className="uk-container">
        <div className={className}>
          {showTitle && <h2 className="uk-text-uppercase">{title}</h2>}
          {subtitle && <h4 className="uk-margin-bottom">{subtitle}</h4>}
          <PortableText blocks={content?.body} />
        </div>
        <Region region={page.regions?.image} Component={Image} />
      </div>
    </section>
  );
};

export default IntroSection;
