import { useMemo } from 'react';

import { Link } from '@foundation/next';

import { buildLink } from '@shop/hooks/navigation';

import { urlFor } from '@app/hooks/image';

const generateLink = item => {
  if (item._type === 'recipe') {
    return { ...item, href: `/account/recipes/${item.alias}` };
  } else if (item._type === 'recipe.bundle') {
    return { ...item, href: `/account/bundles/${item.alias}` };
  } else {
    return buildLink(item);
  }
};

const SiteAccountOverviewItem = item => {
  const { name, image } = item;
  const link = buildLink(item, generateLink);

  const imageUrl = useMemo(
    () =>
      image ? urlFor(image).width(360).height(270).auto('format').url() : null,
    [image]
  );

  return (
    <div className="shop-item">
      <div className="shop-content">
        <div className="shop-image-container">
          <Link
            href={link.href}
            className="tw-image-hover uk-cover-container"
            title={name}
            uk-ratio="3/2"
          >
            {imageUrl && <img src={imageUrl} uk-cover="true" />}
          </Link>
        </div>
        <h4 className="uk-text-truncate">
          <Link href={link.href} className="shop-title">
            {name}
          </Link>
        </h4>
      </div>
    </div>
  );
};

export default SiteAccountOverviewItem;